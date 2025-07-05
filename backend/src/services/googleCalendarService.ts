import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import logger from '../utils/logger';
import { ICalendarEvent, ICalendarData } from '@shared/types/api';
import { AppError } from '../middleware/errorHandler';

class GoogleCalendarService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      logger.warn('Google OAuth credentials not configured');
    }
  }

  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokens(code: string): Promise<any> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      logger.error('Failed to exchange code for tokens:', error);
      throw new AppError(400, 'Invalid authorization code', 'AUTH_CODE_ERROR');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      this.oauth2Client.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials.access_token!;
    } catch (error) {
      logger.error('Failed to refresh access token:', error);
      throw new AppError(401, 'Failed to refresh token', 'TOKEN_REFRESH_ERROR');
    }
  }

  async getEvents(accessToken: string, refreshToken?: string): Promise<ICalendarData> {
    try {
      this.oauth2Client.setCredentials({ 
        access_token: accessToken,
        refresh_token: refreshToken 
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const [eventsResponse, calendarListResponse] = await Promise.all([
        calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 5,
          singleEvents: true,
          orderBy: 'startTime'
        }),
        calendar.calendarList.list({
          maxResults: 10
        })
      ]);

      const events: ICalendarEvent[] = (eventsResponse.data.items || []).map(event => ({
        id: event.id!,
        summary: event.summary || 'No title',
        start: {
          dateTime: event.start?.dateTime || undefined,
          date: event.start?.date || undefined
        },
        end: {
          dateTime: event.end?.dateTime || undefined,
          date: event.end?.date || undefined
        },
        location: event.location || undefined,
        description: event.description || undefined,
        htmlLink: event.htmlLink!
      }));

      const calendars = (calendarListResponse.data.items || []).map(cal => ({
        id: cal.id!,
        summary: cal.summary!,
        primary: cal.primary || false
      }));

      logger.info('Successfully fetched calendar events');

      return {
        events,
        isAuthenticated: true,
        calendars
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        if (refreshToken) {
          logger.info('Access token expired, attempting to refresh');
          const newAccessToken = await this.refreshAccessToken(refreshToken);
          return this.getEvents(newAccessToken, refreshToken);
        }
        throw new AppError(401, 'Authentication required', 'AUTH_REQUIRED');
      }

      logger.error('Failed to fetch calendar events:', error);
      throw new AppError(500, 'Failed to fetch calendar events', 'CALENDAR_ERROR');
    }
  }

  async getUserInfo(accessToken: string): Promise<{ email: string; name: string }> {
    try {
      this.oauth2Client.setCredentials({ access_token: accessToken });
      
      const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
      const { data } = await oauth2.userinfo.get();

      return {
        email: data.email!,
        name: data.name || data.email!
      };
    } catch (error) {
      logger.error('Failed to fetch user info:', error);
      throw new AppError(500, 'Failed to fetch user info', 'USER_INFO_ERROR');
    }
  }
}

export default new GoogleCalendarService();
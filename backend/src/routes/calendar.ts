import { Router } from 'express';
import googleCalendarService from '../services/googleCalendarService';
import { asyncHandler } from '../middleware/errorHandler';
import { IApiResponse, ICalendarData } from '@shared/types/api';
import { AuthRequest } from '../types';

const router = Router();


router.get('/events', asyncHandler(async (req: AuthRequest, res) => {
  if (!req.session.tokens?.access_token) {
    const response: IApiResponse<ICalendarData> = {
      data: {
        events: [],
        isAuthenticated: false
      },
      status: 'success'
    };
    res.json(response);
    return;
  }

  const calendarData = await googleCalendarService.getEvents(
    req.session.tokens.access_token,
    req.session.tokens.refresh_token
  );
  
  const response: IApiResponse<ICalendarData> = {
    data: calendarData,
    status: 'success'
  };
  
  res.json(response);
}));

router.get('/status', asyncHandler(async (req: AuthRequest, res) => {
  const isAuthenticated = !!req.session.tokens?.access_token;
  
  res.json({
    isAuthenticated,
    user: req.session.user || null,
    status: 'success'
  });
}));

export default router;
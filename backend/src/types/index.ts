import { Request } from 'express';
import { Session } from 'express-session';

export interface SessionData extends Session {
  tokens?: {
    access_token: string;
    refresh_token?: string;
    expiry_date?: number;
  };
  user?: {
    email: string;
    name: string;
  };
}

export interface AuthRequest extends Request {
  session: SessionData;
}

export interface WeatherQueryParams {
  lat: string;
  lon: string;
}

export interface ErrorResponse {
  error: string;
  status: 'error';
  code?: string;
}
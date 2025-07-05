import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export const cryptoLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'Too many requests to crypto API, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many requests to crypto API, please try again later.',
      status: 'error',
      code: 'RATE_LIMIT_CRYPTO'
    });
  }
});

export const weatherLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 requests per 10 minutes
  message: 'Too many requests to weather API, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many requests to weather API, please try again later.',
      status: 'error',
      code: 'RATE_LIMIT_WEATHER'
    });
  }
});

export const calendarLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // 50 requests per 5 minutes
  message: 'Too many requests to calendar API, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many requests to calendar API, please try again later.',
      status: 'error',
      code: 'RATE_LIMIT_CALENDAR'
    });
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: 'Too many authentication attempts, please try again later.',
      status: 'error',
      code: 'RATE_LIMIT_AUTH'
    });
  }
});
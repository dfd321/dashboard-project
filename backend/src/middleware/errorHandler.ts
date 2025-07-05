import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ErrorResponse } from '../types';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      error: err.message,
      status: 'error',
      code: err.code
    };
    res.status(err.statusCode).json(response);
    return;
  }

  const response: ErrorResponse = {
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    status: 'error'
  };

  res.status(500).json(response);
};

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const response: ErrorResponse = {
    error: 'Route not found',
    status: 'error',
    code: 'NOT_FOUND'
  };
  res.status(404).json(response);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
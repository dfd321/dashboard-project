import { Router } from 'express';
import googleCalendarService from '../services/googleCalendarService';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../types';
import logger from '../utils/logger';

const router = Router();

router.get('/google', (_req, res) => {
  const authUrl = googleCalendarService.getAuthUrl();
  res.redirect(authUrl);
});

router.get('/google/callback', asyncHandler(async (req: AuthRequest, res) => {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    throw new AppError(400, 'Authorization code missing', 'MISSING_AUTH_CODE');
  }

  try {
    const tokens = await googleCalendarService.getTokens(code);
    
    req.session.tokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date
    };

    const userInfo = await googleCalendarService.getUserInfo(tokens.access_token);
    req.session.user = userInfo;

    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });

    logger.info(`User ${userInfo.email} authenticated successfully`);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}?auth=success`);
  } catch (error) {
    logger.error('OAuth callback error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}?auth=error`);
  }
}));

router.post('/logout', asyncHandler(async (req: AuthRequest, res) => {
  const userEmail = req.session.user?.email;
  
  req.session.destroy((err) => {
    if (err) {
      logger.error('Session destruction error:', err);
      throw new AppError(500, 'Failed to logout', 'LOGOUT_ERROR');
    }
    
    if (userEmail) {
      logger.info(`User ${userEmail} logged out`);
    }
    
    res.json({
      message: 'Logged out successfully',
      status: 'success'
    });
  });
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
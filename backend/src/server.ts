import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { mkdirSync } from 'fs';

dotenv.config();

import cryptoRoutes from './routes/crypto';
import weatherRoutes from './routes/weather';
import calendarRoutes from './routes/calendar';
import authRoutes from './routes/auth';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { cryptoLimiter, weatherLimiter, calendarLimiter, authLimiter } from './middleware/rateLimiter';
import logger from './utils/logger';

try {
  mkdirSync(path.join(__dirname, '../logs'), { recursive: true });
} catch (error) {
  console.error('Failed to create logs directory:', error);
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  }
}));

app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/crypto', cryptoLimiter, cryptoRoutes);
app.use('/api/weather', weatherLimiter, weatherRoutes);
app.use('/api/calendar', calendarLimiter, calendarRoutes);
app.use('/api/auth', authLimiter, authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
# Backend API Work Plan

## Overview
Implement Express API gateway that handles all external API calls and manages authentication for the dashboard widgets.

## Scope
- Express server with TypeScript
- API routes for crypto, weather, and calendar
- Google OAuth2 implementation
- Rate limiting and caching
- Error handling and logging
- CORS configuration

## Technical Implementation

### 1. Project Structure
```
backend/src/
├── server.ts              # Express app setup and middleware
├── routes/
│   ├── crypto.ts         # Crypto price endpoints
│   ├── weather.ts        # Weather data endpoints
│   ├── calendar.ts       # Google Calendar endpoints
│   └── auth.ts           # OAuth endpoints
├── services/
│   ├── coinGeckoService.ts    # CoinGecko API integration
│   ├── weatherService.ts      # OpenWeatherMap integration
│   ├── googleCalendarService.ts # Google Calendar API
│   └── cacheService.ts        # Redis caching (optional)
├── middleware/
│   ├── auth.ts           # Auth verification
│   ├── rateLimiter.ts    # API rate limiting
│   └── errorHandler.ts   # Global error handling
├── utils/
│   ├── logger.ts         # Winston logger setup
│   └── validators.ts     # Request validators
└── types/
    └── index.ts          # Backend-specific types
```

### 2. API Endpoints

#### Crypto Endpoints
```typescript
// GET /api/crypto/prices
// Returns current BTC and ETH prices
// Cache: 60 seconds
{
  bitcoin: { current_price, price_change_24h, sparkline_in_7d },
  ethereum: { current_price, price_change_24h, sparkline_in_7d },
  lastUpdated: "ISO-8601"
}
```

#### Weather Endpoints
```typescript
// GET /api/weather?lat={latitude}&lon={longitude}
// Returns current weather and 5-day forecast
// Cache: 10 minutes
{
  current: { temp, feels_like, humidity, wind_speed, weather },
  daily: [{ dt, temp, weather }],
  location: { name, country }
}
```

#### Calendar Endpoints
```typescript
// GET /api/calendar/events
// Requires auth token in session
// Returns next 5 events from primary calendar
{
  events: [{ id, summary, start, end, location }],
  isAuthenticated: boolean,
  calendars: [{ id, summary, primary }]
}

// GET /api/auth/google
// Initiates OAuth flow

// GET /api/auth/google/callback
// Handles OAuth callback

// POST /api/auth/logout
// Clears session
```

### 3. Environment Variables
```env
PORT=3001
NODE_ENV=development

# API Keys
OPENWEATHER_API_KEY=
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

# Session
SESSION_SECRET=

# Redis (optional)
REDIS_URL=redis://localhost:6379

# CORS
FRONTEND_URL=http://localhost:5173
```

### 4. Core Services Implementation

#### CoinGecko Service
```typescript
class CoinGeckoService {
  async getPrices(): Promise<ICryptoData> {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency: 'usd',
      ids: 'bitcoin,ethereum',
      sparkline: true,
      price_change_percentage: '24h'
    };
    // Implementation with error handling
  }
}
```

#### Weather Service
```typescript
class WeatherService {
  async getWeather(lat: number, lon: number): Promise<IWeatherData> {
    // Current weather API call
    // 5-day forecast API call
    // Combine and format response
  }
}
```

#### Google Calendar Service
```typescript
class GoogleCalendarService {
  async getEvents(accessToken: string): Promise<ICalendarEvent[]> {
    // Use Google Calendar API
    // Handle token refresh
    // Format events
  }
}
```

### 5. Middleware Setup

#### Rate Limiting
```typescript
const cryptoLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 // 60 requests per minute
});

const weatherLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100
});
```

#### Session Management
```typescript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### 6. Dependencies to Install
```bash
cd backend
npm install express cors helmet compression express-session
npm install axios redis ioredis express-rate-limit
npm install googleapis google-auth-library
npm install winston morgan
npm install --save-dev @types/express @types/cors @types/compression
npm install --save-dev @types/express-session @types/morgan
npm install --save-dev nodemon ts-node typescript
```

### 7. Testing Checklist
- [ ] All endpoints return correct data format
- [ ] Rate limiting works per endpoint
- [ ] CORS allows frontend requests
- [ ] OAuth flow completes successfully
- [ ] Session persistence works
- [ ] Error responses are consistent
- [ ] Caching reduces API calls
- [ ] Environment variables load correctly
- [ ] Graceful handling of API failures

### 8. Security Considerations
- API keys stored in environment variables
- Session secrets are strong and unique
- OAuth tokens never exposed to frontend
- Rate limiting prevents abuse
- Input validation on all endpoints
- SQL injection prevention (if using DB)
- XSS protection headers

### 9. Development Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  }
}
```
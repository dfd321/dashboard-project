# Dashboard Backend API

Express.js backend providing API endpoints for the dashboard's crypto, weather, and calendar widgets.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

The server will start on http://localhost:3001

## API Endpoints

- `GET /api/crypto/prices` - Current BTC/ETH prices
- `GET /api/weather?lat=X&lon=Y` - Weather data for coordinates  
- `GET /api/calendar/events` - Calendar events (requires OAuth)
- `GET /api/auth/google` - Start Google OAuth flow
- `GET /health` - Health check

## Environment Variables

Required:
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

Optional:
- `PORT` - Server port (default: 3001)
- `SESSION_SECRET` - Session encryption key
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Development

- `npm run dev` - Start with hot reload
- `npm run build` - Build TypeScript
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type checking

## Architecture

- **Services**: External API integrations (CoinGecko, OpenWeatherMap, Google Calendar)
- **Routes**: Express route handlers with validation
- **Middleware**: Rate limiting, error handling, authentication
- **Types**: Shared TypeScript interfaces with frontend
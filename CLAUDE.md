# Dashboard Project Memory

## Project Overview
Multi-widget dashboard displaying cryptocurrency prices (BTC/ETH), weather data, and Google Calendar events.

## Architecture
- **Frontend**: React + TypeScript + Vite + TanStack Query + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Monorepo**: Yarn workspaces with concurrent development

## API Keys & Environment
- **CoinGecko**: No API key required for basic usage (rate limited)
- **OpenWeatherMap**: Requires API key in backend/.env (OPENWEATHER_API_KEY)
- **Google Calendar**: OAuth2 setup required (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

## Key Conventions
- **Component files**: PascalCase (e.g., CryptoWidget.tsx)
- **Hook files**: camelCase with 'use' prefix (e.g., useCryptoData.ts)
- **API endpoints**: /api/{resource} (e.g., /api/crypto/prices)
- **TypeScript interfaces**: Prefix with 'I' (e.g., ICryptoData)
- **Shared types**: Located in shared/types/api.ts

## Widget Responsibilities
1. **CryptoWidget**: BTC/ETH prices, 24h change, price charts
2. **WeatherWidget**: Current conditions, 5-day forecast, location-based
3. **CalendarWidget**: Next 5 events, OAuth integration, time until next event

## Parallel Development Guidelines
- Each widget is self-contained in its component folder
- Widgets communicate with backend via hooks (useCryptoData, useWeatherData, useCalendarData)
- Mock data available in services for offline development
- API contracts defined in shared/types/api.ts before implementation

## Worktree Branches
- `main`: Base branch with scaffolding
- `feature/crypto-widget`: Cryptocurrency display implementation
- `feature/weather-widget`: Weather display implementation ✅ COMPLETED
- `feature/calendar-widget`: Google Calendar integration
- `feature/backend-api`: API gateway implementation

## Testing Commands
```bash
# Frontend
cd frontend && npm run test
cd frontend && npm run lint
cd frontend && npm run typecheck

# Backend
cd backend && npm run test
cd backend && npm run lint
cd backend && npm run typecheck
```

## Development Workflow
1. Check out feature branch via worktree
2. Implement module following work plan in docs/workplans/
3. Ensure types match shared/types/api.ts
4. Test with mock data first
5. Integration test with other modules
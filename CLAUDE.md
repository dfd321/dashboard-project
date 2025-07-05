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
1. **CryptoWidget**: BTC/ETH prices, 24h change, price charts ✅ IMPLEMENTED
2. **WeatherWidget**: Current conditions, 5-day forecast, location-based
3. **CalendarWidget**: ✅ Next 5 events, OAuth integration, time until next event (IMPLEMENTED)

## Implementation Status

### CryptoWidget (✅ COMPLETED)
- **Components**: CryptoWidget, PriceDisplay, CryptoChart
- **Hook**: useCryptoData with TanStack Query
- **Mock Data**: Available in services/mockData.ts
- **Features**: 
  - Real-time BTC/ETH prices
  - 24h change indicators with color coding
  - 7-day trend charts using Recharts
  - Auto-refresh every 60 seconds
  - Loading states and error handling
  - Responsive design with Tailwind CSS

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

## Calendar Widget Implementation Status ✅

### Completed Components
- **CalendarWidget.tsx**: Main container with auth flow and event display
- **AuthButton.tsx**: Google OAuth authentication button
- **EventList.tsx**: List component for displaying upcoming events
- **EventItem.tsx**: Individual event card with time, location, and link
- **TimeUntilNext.tsx**: Countdown display for next upcoming event
- **useCalendarData.ts**: Hook for calendar data management and auth state
- **mockCalendarData.ts**: Mock data for development and testing

### Features Implemented
- ✅ OAuth2 authentication flow (placeholder for backend integration)
- ✅ Display of next 5 upcoming events
- ✅ Time until next event countdown
- ✅ Event details (title, time, location, Google Calendar link)
- ✅ Refresh functionality
- ✅ Empty state handling
- ✅ Loading states
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript type safety
- ✅ Comprehensive test coverage

### Testing
- ✅ Unit tests with React Testing Library and Vitest
- ✅ Mock authentication states
- ✅ Event rendering scenarios
- ✅ Empty state handling
- ✅ TypeScript compilation
- ✅ ESLint code quality checks

### Integration Points
- Types defined in `shared/types/api.ts` (ICalendarData, ICalendarEvent)
- Ready for backend API integration at `/api/calendar/events`
- OAuth flow placeholder ready for `/api/auth/google` endpoints
- Mock data allows for immediate development and testing
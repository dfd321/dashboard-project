# Calendar Widget Work Plan

## Overview
Implement Google Calendar integration widget showing upcoming events with OAuth2 authentication.

## Scope
- OAuth2 flow for Google Calendar access
- Display next 5 upcoming events
- Show time until next event
- Event details (title, time, location)
- Calendar selection (if multiple calendars)
- Refresh button for manual updates

## Technical Implementation

### 1. Component Structure
```
components/CalendarWidget/
├── CalendarWidget.tsx       # Main container
├── EventList.tsx           # List of upcoming events
├── EventItem.tsx           # Individual event display
├── AuthButton.tsx          # Google OAuth button
├── TimeUntilNext.tsx       # Countdown to next event
├── CalendarWidget.test.tsx # Component tests
└── index.ts               # Re-exports
```

### 2. OAuth Flow
1. User clicks "Connect Google Calendar"
2. Redirect to backend OAuth endpoint: /api/auth/google
3. Backend redirects to Google consent screen
4. Google redirects back to /api/auth/google/callback
5. Backend stores tokens, redirects to frontend
6. Frontend receives auth status and fetches events

### 3. Data Flow
- Use `useCalendarData` hook from hooks/useCalendarData.ts
- Hook manages auth state and event fetching
- Calls backend endpoint: GET /api/calendar/events
- Returns data matching ICalendarData interface

### 4. Required Types (shared/types/api.ts)
```typescript
interface ICalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
  description?: string;
  htmlLink: string;
}

interface ICalendarData {
  events: ICalendarEvent[];
  isAuthenticated: boolean;
  calendars?: Array<{
    id: string;
    summary: string;
    primary: boolean;
  }>;
}
```

### 5. UI Requirements
- Google brand guidelines for OAuth button
- Event cards with hover effects
- Time formatting (relative and absolute)
- Calendar color coding
- Smooth auth flow transitions
- Empty state for no events

### 6. Auth State Management
```typescript
// In useCalendarData hook
const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

// Check auth on mount
useEffect(() => {
  checkAuthStatus();
}, []);

// Handle OAuth callback
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('auth') === 'success') {
    setAuthState('authenticated');
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  }
}, []);
```

### 7. Mock Data
```typescript
export const mockCalendarData: ICalendarData = {
  isAuthenticated: true,
  events: [
    {
      id: "1",
      summary: "Team Standup",
      start: { dateTime: "2024-11-07T09:00:00-08:00" },
      end: { dateTime: "2024-11-07T09:30:00-08:00" },
      location: "Zoom",
      htmlLink: "https://calendar.google.com/event?id=1"
    },
    {
      id: "2",
      summary: "Project Review",
      start: { dateTime: "2024-11-07T14:00:00-08:00" },
      end: { dateTime: "2024-11-07T15:00:00-08:00" },
      description: "Q4 project review meeting",
      htmlLink: "https://calendar.google.com/event?id=2"
    }
    // ... 3 more events
  ],
  calendars: [
    {
      id: "primary",
      summary: "Personal",
      primary: true
    }
  ]
};
```

### 8. Dependencies to Install
```bash
cd frontend
npm install date-fns
```

### 9. Testing Checklist
- [ ] OAuth flow completes successfully
- [ ] Events display correctly
- [ ] Time until next event updates
- [ ] All-day events handled properly
- [ ] Multiple calendars can be selected
- [ ] Refresh manually fetches new events
- [ ] Auth errors handled gracefully
- [ ] Empty state shows when no events

### 10. Security Considerations
- Never expose tokens to frontend
- All Google API calls through backend
- Implement token refresh logic
- Secure storage of refresh tokens
- CORS properly configured

### 11. Integration Points
- Coordinate OAuth setup with backend team
- Ensure redirect URIs are configured
- Test with multiple Google accounts
- Handle calendar permissions properly
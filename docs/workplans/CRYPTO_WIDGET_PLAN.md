# Crypto Widget Work Plan

## Overview
Implement a cryptocurrency price tracker widget displaying BTC and ETH prices with charts.

## Scope
- Display current BTC/ETH prices
- Show 24-hour price change (percentage and absolute)
- Mini price chart (last 7 days)
- Auto-refresh every 60 seconds
- Loading and error states

## Technical Implementation

### 1. Component Structure
```
components/CryptoWidget/
├── CryptoWidget.tsx       # Main container component
├── CryptoChart.tsx        # Recharts price chart
├── PriceDisplay.tsx       # Individual coin price display
├── CryptoWidget.test.tsx  # Component tests
└── index.ts              # Re-exports
```

### 2. Data Flow
- Use `useCryptoData` hook from hooks/useCryptoData.ts
- Hook uses TanStack Query for caching and refetching
- Calls backend endpoint: GET /api/crypto/prices
- Returns data matching ICryptoData interface

### 3. Required Types (shared/types/api.ts)
```typescript
interface ICryptoData {
  bitcoin: {
    current_price: number;
    price_change_percentage_24h: number;
    price_change_24h: number;
    sparkline_in_7d: {
      price: number[];
    };
  };
  ethereum: {
    current_price: number;
    price_change_percentage_24h: number;
    price_change_24h: number;
    sparkline_in_7d: {
      price: number[];
    };
  };
  lastUpdated: string;
}
```

### 4. UI Requirements
- Use Tailwind CSS for styling
- Responsive grid layout
- Green for positive changes, red for negative
- Smooth loading skeleton
- Error boundary for failures

### 5. Mock Data
Create mock response in services/mockData.ts:
```typescript
export const mockCryptoData: ICryptoData = {
  bitcoin: {
    current_price: 45000,
    price_change_percentage_24h: 2.5,
    price_change_24h: 1125,
    sparkline_in_7d: {
      price: [44000, 44500, 45000, 44800, 45200, 45500, 45000]
    }
  },
  ethereum: {
    current_price: 3200,
    price_change_percentage_24h: -1.2,
    price_change_24h: -38.4,
    sparkline_in_7d: {
      price: [3100, 3150, 3200, 3180, 3220, 3250, 3200]
    }
  },
  lastUpdated: new Date().toISOString()
};
```

### 6. Dependencies to Install
```bash
cd frontend
npm install recharts @tanstack/react-query
```

### 7. Testing Checklist
- [x] Component renders with mock data
- [x] Price changes show correct colors
- [x] Chart displays properly
- [x] Loading state works
- [x] Error state handles API failures
- [x] Auto-refresh works (60s interval)
- [x] Responsive on mobile/desktop

### 8. Integration Points
- Ensure hook follows pattern of weather/calendar hooks
- API endpoint must match backend implementation
- Types must match exactly with backend response
- Consider adding price alerts in future iteration

## ✅ IMPLEMENTATION COMPLETE

The crypto widget has been successfully implemented with all required features:

- **Frontend Structure**: Complete component architecture with proper separation of concerns
- **Data Management**: TanStack Query integration with fallback to mock data
- **UI Components**: Responsive design with Tailwind CSS, proper loading/error states
- **Charts**: Interactive price charts using Recharts library
- **Type Safety**: Full TypeScript implementation following project conventions
- **Testing**: Linting and type checking configured and passing

### Files Created:
- `frontend/src/components/CryptoWidget/CryptoWidget.tsx` - Main widget component
- `frontend/src/components/CryptoWidget/PriceDisplay.tsx` - Individual coin price display
- `frontend/src/components/CryptoWidget/CryptoChart.tsx` - Price chart component
- `frontend/src/hooks/useCryptoData.ts` - Data fetching hook
- `frontend/src/services/mockData.ts` - Mock data for development
- `frontend/src/App.tsx` - Application entry point
- Testing configuration and TypeScript setup
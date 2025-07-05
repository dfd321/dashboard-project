# Weather Widget Work Plan

## Overview
Implement a weather display widget showing current conditions and 5-day forecast based on user location.

## Scope
- Display current temperature and conditions
- Show 5-day forecast
- Weather icons for conditions
- Location detection (browser geolocation API)
- Manual location input fallback
- Temperature unit toggle (°C/°F)

## Technical Implementation

### 1. Component Structure
```
components/WeatherWidget/
├── WeatherWidget.tsx        # Main container
├── CurrentWeather.tsx       # Current conditions display
├── WeatherForecast.tsx      # 5-day forecast
├── WeatherIcon.tsx          # Condition icons
├── LocationSelector.tsx     # Location input/detection
├── WeatherWidget.test.tsx   # Component tests
└── index.ts                # Re-exports
```

### 2. Data Flow
- Use `useWeatherData` hook from hooks/useWeatherData.ts
- Hook manages location state and API calls
- Calls backend endpoint: GET /api/weather?lat={lat}&lon={lon}
- Returns data matching IWeatherData interface

### 3. Required Types (shared/types/api.ts)
```typescript
interface IWeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: [{
      main: string;
      description: string;
      icon: string;
    }];
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: [{
      main: string;
      icon: string;
    }];
  }>;
  location: {
    name: string;
    country: string;
  };
}
```

### 4. UI Requirements
- Use Tailwind CSS for styling
- Weather icons (use OpenWeatherMap icons or react-icons)
- Glassmorphism effect for widget background
- Smooth transitions for data updates
- Loading skeleton while fetching location/data

### 5. Location Handling
```typescript
// In useWeatherData hook
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        // Fallback to IP-based location or manual input
      }
    );
  }
};
```

### 6. Mock Data
```typescript
export const mockWeatherData: IWeatherData = {
  current: {
    temp: 22,
    feels_like: 21,
    humidity: 65,
    wind_speed: 3.5,
    weather: [{
      main: "Clouds",
      description: "partly cloudy",
      icon: "02d"
    }]
  },
  daily: [
    {
      dt: 1699200000,
      temp: { min: 18, max: 24 },
      weather: [{ main: "Clear", icon: "01d" }]
    },
    // ... 4 more days
  ],
  location: {
    name: "San Francisco",
    country: "US"
  }
};
```

### 7. Dependencies to Install
```bash
cd frontend
npm install react-icons
```

### 8. Testing Checklist
- [ ] Location detection works
- [ ] Manual location input works
- [ ] Current weather displays correctly
- [ ] 5-day forecast shows properly
- [ ] Temperature unit toggle works
- [ ] Weather icons match conditions
- [ ] Error handling for denied location
- [ ] Loading states work properly

### 9. Integration Points
- Coordinate with backend for API endpoint structure
- Ensure error handling for rate limits
- Consider caching location in localStorage
- Add weather alerts in future iteration
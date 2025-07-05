import { IWeatherData } from '../../../shared/types/api'

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
    {
      dt: 1699286400,
      temp: { min: 16, max: 22 },
      weather: [{ main: "Rain", icon: "10d" }]
    },
    {
      dt: 1699372800,
      temp: { min: 19, max: 25 },
      weather: [{ main: "Clouds", icon: "03d" }]
    },
    {
      dt: 1699459200,
      temp: { min: 20, max: 26 },
      weather: [{ main: "Clear", icon: "01d" }]
    },
    {
      dt: 1699545600,
      temp: { min: 17, max: 23 },
      weather: [{ main: "Rain", icon: "09d" }]
    }
  ],
  location: {
    name: "San Francisco",
    country: "US"
  }
}
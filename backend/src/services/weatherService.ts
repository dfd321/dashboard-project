import axios from 'axios';
import logger from '../utils/logger';
import { IWeatherData } from '@shared/types/api';
import { AppError } from '../middleware/errorHandler';

class WeatherService {
  private baseUrl = process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';
  private apiKey = process.env.OPENWEATHER_API_KEY;
  private cache: Map<string, { data: IWeatherData; timestamp: number }> = new Map();
  private cacheTimeout = 10 * 60 * 1000; // 10 minutes

  constructor() {
    if (!this.apiKey) {
      logger.warn('OpenWeatherMap API key not configured');
    }
  }

  async getWeather(lat: number, lon: number): Promise<IWeatherData> {
    if (!this.apiKey) {
      throw new AppError(500, 'Weather service not configured', 'WEATHER_CONFIG_ERROR');
    }

    const cacheKey = `weather-${lat}-${lon}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      logger.debug('Returning cached weather data');
      return cached.data;
    }

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/weather`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
          }
        }),
        axios.get(`${this.baseUrl}/forecast`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
            cnt: 40 // 5 days of 3-hour forecasts
          }
        })
      ]);

      const dailyForecasts = this.aggregateDailyForecasts(forecastResponse.data.list);

      const weatherData: IWeatherData = {
        current: {
          temp: currentResponse.data.main.temp,
          feels_like: currentResponse.data.main.feels_like,
          humidity: currentResponse.data.main.humidity,
          wind_speed: currentResponse.data.wind.speed,
          weather: currentResponse.data.weather.map((w: any) => ({
            main: w.main,
            description: w.description,
            icon: w.icon
          }))
        },
        daily: dailyForecasts.slice(0, 5), // Next 5 days
        location: {
          name: currentResponse.data.name,
          country: currentResponse.data.sys.country
        }
      };

      this.cache.set(cacheKey, { data: weatherData, timestamp: Date.now() });
      logger.info(`Successfully fetched weather data for ${weatherData.location.name}`);
      
      return weatherData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('OpenWeatherMap API error:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          throw new AppError(401, 'Invalid API key', 'WEATHER_AUTH_ERROR');
        }
        
        if (error.response?.status === 429) {
          throw new AppError(429, 'Rate limit exceeded. Please try again later.', 'RATE_LIMIT');
        }
        
        throw new AppError(
          error.response?.status || 500,
          'Failed to fetch weather data',
          'WEATHER_API_ERROR'
        );
      }
      
      throw error;
    }
  }

  private aggregateDailyForecasts(forecasts: any[]): IWeatherData['daily'] {
    const dailyMap = new Map<string, any[]>();

    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      dailyMap.get(date)!.push(forecast);
    });

    const dailyForecasts: IWeatherData['daily'] = [];

    dailyMap.forEach((dayForecasts, _date) => {
      const temps = dayForecasts.map(f => f.main.temp);
      const weatherCounts = new Map<string, number>();
      
      dayForecasts.forEach(f => {
        const main = f.weather[0].main;
        weatherCounts.set(main, (weatherCounts.get(main) || 0) + 1);
      });

      const mostCommonWeather = Array.from(weatherCounts.entries())
        .sort((a, b) => b[1] - a[1])[0][0];

      const weatherIcon = dayForecasts.find(f => f.weather[0].main === mostCommonWeather)?.weather[0].icon || '01d';

      dailyForecasts.push({
        dt: dayForecasts[0].dt,
        temp: {
          min: Math.min(...temps),
          max: Math.max(...temps)
        },
        weather: [{
          main: mostCommonWeather,
          icon: weatherIcon
        }]
      });
    });

    return dailyForecasts.sort((a, b) => a.dt - b.dt);
  }

  clearCache(): void {
    this.cache.clear();
    logger.debug('Weather cache cleared');
  }
}

export default new WeatherService();
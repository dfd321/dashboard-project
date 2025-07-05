import { Router } from 'express';
import weatherService from '../services/weatherService';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { IApiResponse, IWeatherData } from '@shared/types/api';
import { WeatherQueryParams } from '../types';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const { lat, lon } = req.query as unknown as WeatherQueryParams;
  
  if (!lat || !lon) {
    throw new AppError(400, 'Latitude and longitude are required', 'MISSING_PARAMS');
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new AppError(400, 'Invalid latitude or longitude', 'INVALID_PARAMS');
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    throw new AppError(400, 'Latitude or longitude out of range', 'PARAMS_OUT_OF_RANGE');
  }

  const weatherData = await weatherService.getWeather(latitude, longitude);
  
  const response: IApiResponse<IWeatherData> = {
    data: weatherData,
    status: 'success'
  };
  
  res.json(response);
}));

router.post('/clear-cache', asyncHandler(async (_req, res) => {
  weatherService.clearCache();
  
  res.json({
    message: 'Weather cache cleared',
    status: 'success'
  });
}));

export default router;
import { Router } from 'express';
import coinGeckoService from '../services/coinGeckoService';
import { asyncHandler } from '../middleware/errorHandler';
import { IApiResponse, ICryptoData } from '@shared/types/api';

const router = Router();

router.get('/prices', asyncHandler(async (_req, res) => {
  const cryptoData = await coinGeckoService.getPrices();
  
  const response: IApiResponse<ICryptoData> = {
    data: cryptoData,
    status: 'success'
  };
  
  res.json(response);
}));

router.post('/clear-cache', asyncHandler(async (_req, res) => {
  coinGeckoService.clearCache();
  
  res.json({
    message: 'Crypto cache cleared',
    status: 'success'
  });
}));

export default router;
import axios from 'axios';
import logger from '../utils/logger';
import { ICryptoData } from '@shared/types/api';
import { AppError } from '../middleware/errorHandler';

class CoinGeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';
  private cache: Map<string, { data: ICryptoData; timestamp: number }> = new Map();
  private cacheTimeout = 60 * 1000; // 60 seconds

  async getPrices(): Promise<ICryptoData> {
    const cacheKey = 'crypto-prices';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      logger.debug('Returning cached crypto prices');
      return cached.data;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum',
          order: 'market_cap_desc',
          per_page: 2,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h'
        }
      });

      const bitcoinData = response.data.find((coin: any) => coin.id === 'bitcoin');
      const ethereumData = response.data.find((coin: any) => coin.id === 'ethereum');

      if (!bitcoinData || !ethereumData) {
        throw new AppError(500, 'Failed to fetch crypto data', 'CRYPTO_DATA_ERROR');
      }

      const cryptoData: ICryptoData = {
        bitcoin: {
          current_price: bitcoinData.current_price,
          price_change_percentage_24h: bitcoinData.price_change_percentage_24h,
          price_change_24h: bitcoinData.price_change_24h,
          sparkline_in_7d: {
            price: bitcoinData.sparkline_in_7d.price
          }
        },
        ethereum: {
          current_price: ethereumData.current_price,
          price_change_percentage_24h: ethereumData.price_change_percentage_24h,
          price_change_24h: ethereumData.price_change_24h,
          sparkline_in_7d: {
            price: ethereumData.sparkline_in_7d.price
          }
        },
        lastUpdated: new Date().toISOString()
      };

      this.cache.set(cacheKey, { data: cryptoData, timestamp: Date.now() });
      logger.info('Successfully fetched crypto prices from CoinGecko');
      
      return cryptoData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error('CoinGecko API error:', error.response?.data || error.message);
        
        if (error.response?.status === 429) {
          throw new AppError(429, 'Rate limit exceeded. Please try again later.', 'RATE_LIMIT');
        }
        
        throw new AppError(
          error.response?.status || 500,
          'Failed to fetch crypto prices',
          'COINGECKO_ERROR'
        );
      }
      
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
    logger.debug('Crypto cache cleared');
  }
}

export default new CoinGeckoService();
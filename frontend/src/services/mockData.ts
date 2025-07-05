import { ICryptoData } from '../../../shared/types/api';

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
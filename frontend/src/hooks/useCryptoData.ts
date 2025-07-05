import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ICryptoData } from '../../../shared/types/api';
import { mockCryptoData } from '../services/mockData';

const fetchCryptoData = async (): Promise<ICryptoData> => {
  try {
    const response = await axios.get('/api/crypto/prices');
    return response.data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return mockCryptoData;
  }
};

export const useCryptoData = () => {
  return useQuery({
    queryKey: ['crypto-data'],
    queryFn: fetchCryptoData,
    refetchInterval: 60000, // 60 seconds
    staleTime: 30000, // 30 seconds
    retry: 2,
  });
};
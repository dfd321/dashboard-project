import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ICalendarData } from '../../../shared/types/api';
import { mockCalendarData } from '../services/mockCalendarData';

export const useCalendarData = () => {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['calendar-data'],
    queryFn: async (): Promise<ICalendarData> => {
      // For now, return mock data
      // In production, this would call the backend API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCalendarData);
        }, 500);
      });
    },
    enabled: authState === 'authenticated',
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Check auth status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In production, this would check backend auth status
        // For now, simulate authenticated state
        setAuthState('authenticated');
      } catch (error) {
        setAuthState('unauthenticated');
      }
    };
    
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

  const handleAuth = () => {
    // In production, this would redirect to backend OAuth endpoint
    window.location.href = '/api/auth/google';
  };

  return {
    data,
    error,
    isLoading: isLoading || authState === 'loading',
    isAuthenticated: authState === 'authenticated',
    refetch,
    handleAuth
  };
};
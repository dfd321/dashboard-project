import React from 'react';
import { useCryptoData } from '../../hooks/useCryptoData';
import { PriceDisplay } from './PriceDisplay';
import { CryptoChart } from './CryptoChart';

export const CryptoWidget: React.FC = () => {
  const { data, isLoading, error } = useCryptoData();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load crypto data</h3>
          <p className="text-sm text-gray-500">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Cryptocurrency Prices</h2>
        <span className="text-sm text-gray-500">
          Updated {new Date(data.lastUpdated).toLocaleTimeString()}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PriceDisplay
          symbol="BTC"
          name="Bitcoin"
          price={data.bitcoin.current_price}
          change24h={data.bitcoin.price_change_24h}
          changePercent24h={data.bitcoin.price_change_percentage_24h}
        />
        <PriceDisplay
          symbol="ETH"
          name="Ethereum"
          price={data.ethereum.current_price}
          change24h={data.ethereum.price_change_24h}
          changePercent24h={data.ethereum.price_change_percentage_24h}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">BTC 7-Day Trend</h4>
          <CryptoChart 
            data={data.bitcoin.sparkline_in_7d.price}
            isPositive={data.bitcoin.price_change_24h >= 0}
          />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">ETH 7-Day Trend</h4>
          <CryptoChart 
            data={data.ethereum.sparkline_in_7d.price}
            isPositive={data.ethereum.price_change_24h >= 0}
          />
        </div>
      </div>
    </div>
  );
};
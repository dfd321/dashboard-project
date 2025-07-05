import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface PriceDisplayProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  symbol,
  name,
  price,
  change24h,
  changePercent24h,
}) => {
  const isPositive = change24h >= 0;
  const textColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const TrendIcon = isPositive ? FiTrendingUp : FiTrendingDown;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 uppercase">{symbol}</p>
        </div>
        <div className={`p-2 rounded-full ${bgColor}`}>
          <TrendIcon className={`h-5 w-5 ${textColor}`} />
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-2xl font-bold text-gray-900">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${textColor}`}>
          {isPositive ? '+' : ''}${change24h.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <span className={`text-sm font-medium ${textColor}`}>
          ({isPositive ? '+' : ''}{changePercent24h.toFixed(2)}%)
        </span>
      </div>
      
      <p className="text-xs text-gray-400 mt-1">24h change</p>
    </div>
  );
};
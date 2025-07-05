import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface CryptoChartProps {
  data: number[];
  isPositive: boolean;
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ data, isPositive }) => {
  const chartData = data.map((price, index) => ({
    index,
    price,
  }));

  const lineColor = isPositive ? '#10b981' : '#ef4444';

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, stroke: lineColor, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
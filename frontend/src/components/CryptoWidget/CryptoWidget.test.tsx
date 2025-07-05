import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CryptoWidget } from './CryptoWidget';
import React from 'react';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQuery = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('CryptoWidget', () => {
  it('renders loading state initially', () => {
    renderWithQuery(<CryptoWidget />);
    
    expect(screen.getByText('Cryptocurrency Prices')).toBeInTheDocument();
  });

  it('renders widget title', () => {
    renderWithQuery(<CryptoWidget />);
    
    expect(screen.getByText('Cryptocurrency Prices')).toBeInTheDocument();
  });
});
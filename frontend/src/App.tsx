import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CryptoWidget } from './components/CryptoWidget';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Real-time cryptocurrency prices and market data
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <CryptoWidget />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
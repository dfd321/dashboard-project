import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CryptoWidget } from './components/CryptoWidget';
import WeatherWidget from './components/WeatherWidget';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CryptoWidget />
            <WeatherWidget />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;

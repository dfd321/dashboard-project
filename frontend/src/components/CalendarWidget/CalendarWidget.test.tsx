import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CalendarWidget } from './CalendarWidget';
import * as useCalendarDataModule from '../../hooks/useCalendarData';

// Mock the useCalendarData hook
vi.mock('../../hooks/useCalendarData', () => ({
  useCalendarData: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('CalendarWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders auth button when not authenticated', () => {
    vi.mocked(useCalendarDataModule.useCalendarData).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      handleAuth: vi.fn(),
      data: undefined,
      error: null,
      refetch: vi.fn(),
    });

    render(<CalendarWidget />, { wrapper: createWrapper() });

    expect(screen.getByText('Connect Google Calendar')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    vi.mocked(useCalendarDataModule.useCalendarData).mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      data: undefined,
      error: null,
      refetch: vi.fn(),
      handleAuth: vi.fn(),
    });

    render(<CalendarWidget />, { wrapper: createWrapper() });

    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('renders events when authenticated and loaded', () => {
    vi.mocked(useCalendarDataModule.useCalendarData).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      data: {
        events: [
          {
            id: '1',
            summary: 'Test Event',
            start: { dateTime: '2024-11-07T09:00:00-08:00' },
            end: { dateTime: '2024-11-07T10:00:00-08:00' },
            htmlLink: 'https://calendar.google.com/event?id=1',
          },
        ],
        isAuthenticated: true,
      },
      error: null,
      refetch: vi.fn(),
      handleAuth: vi.fn(),
    });

    render(<CalendarWidget />, { wrapper: createWrapper() });

    expect(screen.getAllByText('Test Event')).toHaveLength(2); // Should appear in both next event and event list
  });

  it('renders empty state when no events', () => {
    vi.mocked(useCalendarDataModule.useCalendarData).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      data: {
        events: [],
        isAuthenticated: true,
      },
      error: null,
      refetch: vi.fn(),
      handleAuth: vi.fn(),
    });

    render(<CalendarWidget />, { wrapper: createWrapper() });

    expect(screen.getByText('No upcoming events')).toBeInTheDocument();
  });
});
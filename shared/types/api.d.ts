export interface ICryptoData {
    bitcoin: {
        current_price: number;
        price_change_percentage_24h: number;
        price_change_24h: number;
        sparkline_in_7d: {
            price: number[];
        };
    };
    ethereum: {
        current_price: number;
        price_change_percentage_24h: number;
        price_change_24h: number;
        sparkline_in_7d: {
            price: number[];
        };
    };
    lastUpdated: string;
}
export interface IWeatherData {
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        weather: Array<{
            main: string;
            description: string;
            icon: string;
        }>;
    };
    daily: Array<{
        dt: number;
        temp: {
            min: number;
            max: number;
        };
        weather: Array<{
            main: string;
            icon: string;
        }>;
    }>;
    location: {
        name: string;
        country: string;
    };
}
export interface ICalendarEvent {
    id: string;
    summary: string;
    start: {
        dateTime?: string;
        date?: string;
    };
    end: {
        dateTime?: string;
        date?: string;
    };
    location?: string;
    description?: string;
    htmlLink: string;
}
export interface ICalendarData {
    events: ICalendarEvent[];
    isAuthenticated: boolean;
    calendars?: Array<{
        id: string;
        summary: string;
        primary: boolean;
    }>;
}
export interface IApiResponse<T> {
    data?: T;
    error?: string;
    status: 'success' | 'error';
}
export interface IAuthStatus {
    isAuthenticated: boolean;
    user?: {
        email: string;
        name: string;
    };
}
//# sourceMappingURL=api.d.ts.map
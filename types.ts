
export interface WeatherData {
  current: {
    temp: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    locationName: string;
    icon?: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
    description: string;
  }>;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface AppLocation {
  city?: string;
  coords?: {
    latitude: number;
    longitude: number;
  };
}

export type Unit = 'metric' | 'imperial';

export interface WeatherContextType {
  location: AppLocation;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  setLocation: (loc: AppLocation) => void;
  refreshWeather: () => Promise<void>;
}

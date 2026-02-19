
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { WeatherData, AppLocation, Unit, WeatherContextType } from '../types';
import { fetchWeatherFromGemini } from '../services/geminiWeather';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<AppLocation>(() => {
    const saved = localStorage.getItem('skycast_location');
    return saved ? JSON.parse(saved) : { city: 'Istanbul' };
  });
  
  const [unit, setUnit] = useState<Unit>(() => {
    const saved = localStorage.getItem('skycast_unit');
    return (saved as Unit) || 'metric';
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLocation = (loc: AppLocation) => {
    setLocationState(loc);
    localStorage.setItem('skycast_location', JSON.stringify(loc));
  };

  const updateUnit = (u: Unit) => {
    setUnit(u);
    localStorage.setItem('skycast_unit', u);
  };

  const refreshWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherFromGemini(location, unit);
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, [location, unit]);

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

  return (
    <WeatherContext.Provider value={{ 
      location, 
      weather, 
      loading, 
      error, 
      unit, 
      setUnit: updateUnit, 
      setLocation, 
      refreshWeather 
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};

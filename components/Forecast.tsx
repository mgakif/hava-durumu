
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { WeatherIcon } from './Icons';

export const Forecast: React.FC = () => {
  const { weather, loading, unit } = useWeather();

  if (!weather || loading) return null;

  const tempSymbol = unit === 'metric' ? '°C' : '°F';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-[2px] bg-blue-500"></span>
        5-Day Forecast
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {weather.forecast.map((day, idx) => (
          <div 
            key={idx} 
            className="glass min-w-[140px] flex-1 snap-start rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/10 transition-colors border border-white/5"
          >
            <span className="text-sm font-medium text-gray-400 mb-4">{formatDate(day.date)}</span>
            <WeatherIcon condition={day.condition} size={40} className="mb-4" />
            <span className="text-2xl font-bold mb-1">{Math.round(day.temp)}{tempSymbol}</span>
            <span className="text-xs text-gray-400 capitalize">{day.condition}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { WeatherIcon, Thermometer, Droplets, Wind, MapPin } from './Icons';

export const WeatherCard: React.FC = () => {
  const { weather, loading, unit } = useWeather();

  if (!weather || loading) return null;

  const { current } = weather;
  const tempSymbol = unit === 'metric' ? '°C' : '°F';
  const speedSymbol = unit === 'metric' ? 'km/h' : 'mph';

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <MapPin size={18} />
              <span className="font-semibold tracking-wide uppercase text-sm">Current Weather</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-1">{current.locationName}</h1>
            <p className="text-gray-400 text-lg capitalize">{current.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <WeatherIcon condition={current.condition} size={80} className="drop-shadow-lg" />
            <div className="text-6xl md:text-8xl font-black tracking-tighter">
              {Math.round(current.temp)}
              <span className="text-3xl md:text-4xl font-light text-blue-400 ml-1">{tempSymbol}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Thermometer className="text-orange-400 mb-2" size={20} />
            <span className="text-xs text-gray-400 uppercase font-medium">Feels Like</span>
            <span className="text-lg font-bold">{Math.round(current.feelsLike)}{tempSymbol}</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Droplets className="text-blue-400 mb-2" size={20} />
            <span className="text-xs text-gray-400 uppercase font-medium">Humidity</span>
            <span className="text-lg font-bold">{current.humidity}%</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Wind className="text-emerald-400 mb-2" size={20} />
            <span className="text-xs text-gray-400 uppercase font-medium">Wind</span>
            <span className="text-lg font-bold">{current.windSpeed} {speedSymbol}</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <WeatherIcon condition={current.condition} className="mb-2" size={20} />
            <span className="text-xs text-gray-400 uppercase font-medium">Condition</span>
            <span className="text-lg font-bold">{current.condition}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

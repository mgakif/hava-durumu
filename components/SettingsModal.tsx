
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { X, MapPin, ChevronRight } from './Icons';

const TR_CITIES = [
  'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Mersin', 'Kayseri'
];

export const SettingsModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const { unit, setUnit, setLocation, location } = useWeather();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass rounded-3xl w-full max-w-md p-8 relative z-10 border border-white/20 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
        </div>

        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Temperature Unit</h3>
          <div className="flex bg-white/5 rounded-2xl p-1">
            <button 
              onClick={() => setUnit('metric')}
              className={`flex-1 py-3 rounded-xl transition-all font-bold ${unit === 'metric' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Metric (°C)
            </button>
            <button 
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-3 rounded-xl transition-all font-bold ${unit === 'imperial' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Imperial (°F)
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Popular Cities</h3>
          <div className="grid grid-cols-2 gap-2">
            {TR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setLocation({ city });
                  onClose();
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  location.city === city 
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                    : 'border-white/5 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} className={location.city === city ? 'text-blue-400' : 'text-gray-500'} />
                  <span className="font-medium text-sm">{city}</span>
                </div>
                <ChevronRight size={14} className="text-gray-600" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { Settings, RefreshCw, Navigation, Search, X } from './Icons';

export const Navbar: React.FC<{ onOpenSettings: () => void }> = ({ onOpenSettings }) => {
  const { weather, refreshWeather, loading, setLocation } = useWeather();
  const { requestGPS, geoLoading } = useGeolocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation({ city: searchQuery.trim() });
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <RefreshCw className={`${loading ? 'animate-spin' : ''} text-white`} size={20} />
        </div>
        <div>
          <span className="text-xl font-black tracking-tight uppercase">Sky<span className="text-blue-500">Cast</span></span>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Powered by Gemini</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-1.5 animate-in slide-in-from-right-4 duration-300">
            <input 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search City..."
              className="bg-transparent border-none outline-none text-sm w-32 md:w-64"
            />
            <button type="submit" className="text-gray-400 hover:text-white"><Search size={16} /></button>
            <button type="button" onClick={() => setShowSearch(false)} className="ml-2 text-gray-400 hover:text-white"><X size={16} /></button>
          </form>
        ) : (
          <>
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              title="Search City"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={requestGPS} 
              disabled={geoLoading}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              title="My Location"
            >
              <Navigation size={20} className={geoLoading ? 'animate-pulse text-blue-400' : ''} />
            </button>
            <button 
              onClick={refreshWeather}
              disabled={loading}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              title="Refresh"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={onOpenSettings}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

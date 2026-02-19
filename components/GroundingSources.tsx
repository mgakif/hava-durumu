
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { ExternalLink } from './Icons';

export const GroundingSources: React.FC = () => {
  const { weather, loading } = useWeather();

  if (!weather || loading || !weather.sources.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 pb-12">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        Data Verification Sources
      </h3>
      <div className="flex flex-wrap gap-3">
        {weather.sources.map((source, idx) => (
          <a 
            key={idx}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 glass rounded-full text-[10px] text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all border border-white/5"
          >
            <span>{source.title}</span>
            <ExternalLink size={10} />
          </a>
        ))}
      </div>
    </div>
  );
};

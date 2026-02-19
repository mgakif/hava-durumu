
import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 animate-pulse">
      <div className="max-w-2xl mx-auto glass rounded-3xl p-8 h-80 mb-8">
        <div className="w-1/3 h-8 bg-white/10 rounded-lg mb-4"></div>
        <div className="w-1/2 h-12 bg-white/10 rounded-lg mb-8"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-20 bg-white/10 rounded-2xl"></div>
          <div className="h-20 bg-white/10 rounded-2xl"></div>
          <div className="h-20 bg-white/10 rounded-2xl"></div>
          <div className="h-20 bg-white/10 rounded-2xl"></div>
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="glass min-w-[140px] h-40 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
};

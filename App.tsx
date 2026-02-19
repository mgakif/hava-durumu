
import React, { useState, useEffect } from 'react';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import { Navbar } from './components/Navbar';
import { WeatherCard } from './components/WeatherCard';
import { Forecast } from './components/Forecast';
import { SettingsModal } from './components/SettingsModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { GroundingSources } from './components/GroundingSources';
import { Toast } from './components/Toast';
import { CloudRain, RefreshCw } from './components/Icons';

const WeatherContent: React.FC = () => {
  const { loading, error, refreshWeather } = useWeather();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: number, message: string, type: 'error' | 'info' }>>([]);

  const addToast = (message: string, type: 'error' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    if (error) {
      addToast(error, 'error');
    }
  }, [error]);

  return (
    <div className="min-h-screen pb-12">
      <Navbar onOpenSettings={() => setSettingsOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {error && !loading && !refreshWeather ? (
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl glass">
              <CloudRain size={64} className="text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Hava Durumu Alınamadı</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button 
                onClick={() => refreshWeather()}
                className="flex items-center justify-center gap-2 w-full py-4 bg-red-500 hover:bg-red-600 transition-colors rounded-2xl font-bold"
              >
                <RefreshCw size={20} />
                Tekrar Dene
              </button>
            </div>
          </div>
        ) : loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <WeatherCard />
            <Forecast />
            <GroundingSources />
          </div>
        )}
      </main>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      
      {/* Toast Notifications Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherContent />
    </WeatherProvider>
  );
};

export default App;

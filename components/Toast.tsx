
import React, { useEffect } from 'react';
import { X, AlertCircle, Info } from './Icons';

interface ToastProps {
  message: string;
  type: 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? 'bg-red-500/20 border-red-500/50' : 'bg-blue-500/20 border-blue-500/50';
  const iconColor = type === 'error' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className={`glass border rounded-2xl p-4 flex items-center gap-3 min-w-[300px] shadow-2xl animate-in slide-in-from-right-10 duration-300 ${bgColor}`}>
      {type === 'error' ? <AlertCircle className={iconColor} /> : <Info className={iconColor} />}
      <p className="text-sm flex-1">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
        <X size={16} className="text-gray-400" />
      </button>
    </div>
  );
};

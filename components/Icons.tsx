
import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  Wind, 
  Droplets,
  Thermometer,
  MapPin,
  Settings,
  RefreshCw,
  Search,
  Navigation,
  X,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Info
} from 'lucide-react';

export const WeatherIcon = ({ condition, size = 24, className = "" }: { condition: string, size?: number, className?: string }) => {
  const cond = condition.toLowerCase();
  if (cond.includes('sun') || cond.includes('clear')) return <Sun size={size} className={`text-yellow-400 ${className}`} />;
  if (cond.includes('rain')) return <CloudRain size={size} className={`text-blue-400 ${className}`} />;
  if (cond.includes('storm') || cond.includes('lightning')) return <CloudLightning size={size} className={`text-purple-400 ${className}`} />;
  if (cond.includes('snow')) return <Snowflake size={size} className={`text-white ${className}`} />;
  if (cond.includes('wind')) return <Wind size={size} className={`text-gray-300 ${className}`} />;
  return <Cloud size={size} className={`text-gray-400 ${className}`} />;
};

export { 
  Cloud, Sun, CloudRain, CloudLightning, Snowflake, Wind, Droplets, 
  Thermometer, MapPin, Settings, RefreshCw, Search, Navigation, X, ExternalLink, ChevronRight,
  AlertCircle, Info
};

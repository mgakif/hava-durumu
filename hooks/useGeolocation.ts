
import { useState, useCallback } from 'react';
import { useWeather } from '../context/WeatherContext';

export const useGeolocation = () => {
  const { setLocation } = useWeather();
  const [geoLoading, setGeoLoading] = useState(false);

  const requestGPS = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Browser does not support geolocation");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        setGeoLoading(false);
      },
      (error) => {
        setGeoLoading(false);
        // Hata yönetimi WeatherContext veya App.tsx üzerinden Toast ile de yakalanabilir
        console.error("GPS Error:", error.message);
      }
    );
  }, [setLocation]);

  return { requestGPS, geoLoading };
};

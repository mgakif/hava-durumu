
import { useState, useCallback } from 'react';
import { useWeather } from '../context/WeatherContext';

export const useGeolocation = () => {
  const { setLocation } = useWeather();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const requestGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

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
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setGeoError("The request to get user location timed out.");
            break;
          default:
            setGeoError("An unknown error occurred.");
            break;
        }
      }
    );
  }, [setLocation]);

  return { requestGPS, geoLoading, geoError };
};

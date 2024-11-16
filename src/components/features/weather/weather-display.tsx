'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Wind,
  Droplets,
  Loader,
  ThermometerSun,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Umbrella,
  Thermometer
} from 'lucide-react';
import { WeatherData, weatherService } from '@/lib/weather/weather-service';

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-yellow-500" />;
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-300" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await weatherService.getCurrentLocationWeather();
      setWeather(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to load weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Card className="p-4 bg-gray-800 border-gray-700">
        <div className="flex flex-col items-center justify-center gap-2 text-red-400">
          <AlertTriangle className="w-8 h-8" />
          <p>{error}</p>
          <button 
            onClick={fetchWeather}
            className="px-4 py-2 text-sm text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gray-800 border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Weather</h2>
        <button 
          onClick={fetchWeather}
          className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-700"
          title="Refresh weather"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : weather && (
        <div className="space-y-6">
          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.condition)}
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-white">{weather.temperature}°C</p>
                  <ThermometerSun className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <p>{weather.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-gray-700/50">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Humidity</p>
                  <p className="font-medium text-white">{weather.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gray-700/50">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Wind</p>
                  <p className="font-medium text-white">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-3 rounded-lg bg-gray-700/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Feels like</p>
                  <p className="font-medium text-white">{weather.feelsLike}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Umbrella className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Rain</p>
                  <p className="font-medium text-white">{weather.precipitation}%</p>
                </div>
              </div>
            </div>
            <div className="pt-2 mt-2 text-center border-t border-gray-600/50">
              <p className="text-xs text-gray-400">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WeatherDisplay;
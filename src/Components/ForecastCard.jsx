import React from 'react';
import { formatTemperature, formatDate, capitalizeWords } from '../utils/weatherHelpers';
import { CloudRain, Cloud, Sun, SunSnow as Snow, Zap } from 'lucide-react';

const getWeatherIcon = (condition) => {
  const condition_lower = condition.toLowerCase();
  
  if (condition_lower.includes('clear')) {
    return <Sun className="w-8 h-8 text-yellow-300" />;
  } else if (condition_lower.includes('cloud')) {
    return <Cloud className="w-8 h-8 text-gray-300" />;
  } else if (condition_lower.includes('rain') || condition_lower.includes('drizzle')) {
    return <CloudRain className="w-8 h-8 text-blue-300" />;
  } else if (condition_lower.includes('snow')) {
    return <Snow className="w-8 h-8 text-white" />;
  } else if (condition_lower.includes('thunderstorm')) {
    return <Zap className="w-8 h-8 text-purple-300" />;
  }
  
  return <Cloud className="w-8 h-8 text-gray-300" />;
};

export const ForecastCard = ({ forecast, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 
                    hover:bg-white/25 transition-all duration-200 text-center group">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg mb-1">
          {formatDate(forecast.dt)}
        </h3>
        <p className="text-white/70 text-sm">
          {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
        </p>
      </div>
      
      <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-200">
        {getWeatherIcon(forecast.weather[0].main)}
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-1">
          {formatTemperature(forecast.main.temp_max, unit)}{tempUnit}
        </div>
        <div className="text-white/70">
          {formatTemperature(forecast.main.temp_min, unit)}{tempUnit}
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-white/80 text-sm capitalize">
          {capitalizeWords(forecast.weather[0].description)}
        </p>
        <div className="flex justify-between text-xs text-white/70">
          <span>💧 {forecast.main.humidity}%</span>
          <span>💨 {forecast.wind.speed.toFixed(1)} {unit === 'metric' ? 'm/s' : 'mph'}</span>
        </div>
        {forecast.pop > 0 && (
          <div className="text-xs text-blue-200">
            🌧️ {Math.round(forecast.pop * 100)}% chance
          </div>
        )}
      </div>
    </div>
  );
};
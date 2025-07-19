import React from 'react';
import { formatTemperature, capitalizeWords, formatTime, getWindDirection } from '../utils/weatherHelpers';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  MapPin,
  Calendar
} from 'lucide-react';

export const WeatherCard = ({ weather, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
  
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Weather Info */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <MapPin className="w-6 h-6 text-white/80" />
            <h2 className="text-2xl font-bold text-white">
              {weather.name}, {weather.sys.country}
            </h2>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <Calendar className="w-5 h-5 text-white/80" />
            <span className="text-white/80">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="mb-6">
            <div className="text-6xl lg:text-7xl font-bold text-white mb-2">
              {formatTemperature(weather.main.temp, unit)}{tempUnit}
            </div>
            <div className="text-xl text-white/80 mb-2">
              Feels like {formatTemperature(weather.main.feels_like, unit)}{tempUnit}
            </div>
            <div className="text-2xl text-white/90 capitalize">
              {capitalizeWords(weather.weather[0].description)}
            </div>
          </div>

          <div className="flex justify-center lg:justify-start gap-6 text-white/80">
            <div className="text-center">
              <div className="text-sm">High</div>
              <div className="text-lg font-semibold">
                {formatTemperature(weather.main.temp_max, unit)}{tempUnit}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm">Low</div>
              <div className="text-lg font-semibold">
                {formatTemperature(weather.main.temp_min, unit)}{tempUnit}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Weather Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Thermometer className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm">Pressure</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {weather.main.pressure} hPa
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm">Humidity</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {weather.main.humidity}%
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Wind className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm">Wind</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {weather.wind.speed.toFixed(1)} {speedUnit}
              </div>
              <div className="text-white/70 text-sm">
                {getWindDirection(weather.wind.deg)}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm">Visibility</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {(weather.visibility / 1000).toFixed(1)} km
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Sunrise className="w-5 h-5 text-yellow-300" />
                <span className="text-white/80 text-sm">Sunrise</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {formatTime(weather.sys.sunrise, weather.timezone)}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Sunset className="w-5 h-5 text-orange-300" />
                <span className="text-white/80 text-sm">Sunset</span>
              </div>
              <div className="text-white text-lg font-semibold">
                {formatTime(weather.sys.sunset, weather.timezone)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
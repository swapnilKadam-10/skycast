import React, { useState, useEffect } from 'react';
import { ForecastCard } from './Components/ForecastCard';
import { SearchBar } from './Components/SearchBar';
import { WeatherCard } from './Components/WeatherCard';
import { Footer } from './Components/Footer';
import { getWeatherByCity, getForecastByCity } from './utils/weatherApi';
import { Loader2, MapPin } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        getWeatherByCity(city, unit),
        getForecastByCity(city, unit)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  }, [unit]);

  useEffect(() => {
    // Load default city on mount
    handleSearch('Mumbai');
  }, []);

  const getBackgroundClass = (weatherCondition) => {
    if (!weatherCondition) return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    
    const condition = weatherCondition.toLowerCase();
    if (condition.includes('clear')) return 'bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500';
    if (condition.includes('cloud')) return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700';
    if (condition.includes('thunderstorm')) return 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800';
    if (condition.includes('snow')) return 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400';
    if (condition.includes('mist') || condition.includes('fog')) return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
    return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass(weatherData?.weather[0]?.main)}`}>
      <div className="min-h-screen bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
              SkyCast
            </h1>
            <p className="text-white/80 text-lg">
              Get accurate weather forecasts for any city
            </p>
          </div>

          {/* Search and Unit Toggle */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
            <SearchBar onSearch={handleSearch} loading={loading} />
            
            <div className="flex justify-center">
              <button
                onClick={toggleUnit}
                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg 
                         hover:bg-white/30 transition-all duration-200 border border-white/20"
              >
                °{unit === 'metric' ? 'C' : 'F'} | Switch to °{unit === 'metric' ? 'F' : 'C'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 text-center">
                <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                <p className="text-white text-lg">Loading weather data...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl p-6 text-center">
                <p className="text-white text-lg font-medium mb-2">Oops! Something went wrong</p>
                <p className="text-white/80">{error}</p>
              </div>
            </div>
          )}

          {/* Weather Content */}
          {weatherData && !loading && (
            <div className="space-y-8">
              {/* Current Weather */}
              <div className="max-w-4xl mx-auto">
                <WeatherCard weather={weatherData} unit={unit} />
              </div>

              {/* 5-Day Forecast */}
              {forecastData && (
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                    <MapPin className="w-6 h-6" />
                    5-Day Forecast
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {forecastData.list
                      .filter((_, index) => index % 8 === 0)
                      .slice(0, 5)
                      .map((forecast, index) => (
                        <ForecastCard
                          key={index}
                          forecast={forecast}
                          unit={unit}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city, units = 'metric') => {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    throw new Error('Please add your OpenWeather API key to src/utils/weatherApi.js');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeather API key.');
    } else {
      throw new Error('Failed to fetch weather data. Please try again.');
    }
  }

  return response.json();
};

export const getForecastByCity = async (city, units = 'metric') => {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    throw new Error('Please add your OpenWeather API key to src/utils/weatherApi.js');
  }

  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found. Please check the spelling and try again.');
    } else if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeather API key.');
    } else {
      throw new Error('Failed to fetch forecast data. Please try again.');
    }
  }

  return response.json();
};

export const getWeatherByCoords = async (lat, lon, units = 'metric') => {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY') {
    throw new Error('Please add your OpenWeather API key to src/utils/weatherApi.js');
  }

  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data for your location.');
  }

  return response.json();
};
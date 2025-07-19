import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
    e.target.value = ""
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          disabled={loading}
          className="w-full px-6 py-4 pl-14 pr-20 text-lg bg-white/20 backdrop-blur-md 
                   border border-white/20 rounded-2xl text-white placeholder-white/70
                   focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70" />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed
                   px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <span className="text-white font-medium">Search</span>
          )}
        </button>
      </div>
    </form>
  );
};
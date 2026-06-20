"use client";
import {useState} from "react";
import { Search } from "lucide-react";

interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
}

/* export default function Home() {
    const backend = async () => {
        const response = await fetch("http://localhost:5001/weather/delhi");
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <h1>Weather App</h1>
            <button onClick={backend}>Backend</button>
        </div>
    );
}
*/

export default function Home() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    const getWeatherIcon = (code: number) => {
        if (code === 0) return "☀️";
        if ([1, 2].includes(code)) return "⛅";
        if (code === 3) return "☁️";
        if ([61, 63, 65].includes(code)) return "🌧️";
        if ([71, 73, 75].includes(code)) return "❄️";
        if (code >= 95) return "⛈️";
        return "🌤️";
    };

    const backend = async () => {
        if (!city.trim()) return;

        try {
            setLoading(true);
            setError("");
            setWeather(null);

            const response = await fetch(
              `https://weather-backend-3y11.onrender.com/weather/${city}`
            );

            console.log("status:", response.status);

            const data = await response.json();
            console.log("data:", data);

            if (!response.ok) {
              setWeather(null);
              setError(data.error);
              return;
            }

            setWeather(data);
            setLastUpdated(new Date().toLocaleTimeString([],
              { hour: "2-digit", minute: "2-digit"}
            ));

        } catch (err) {
            console.error(err);
            setError("Request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          SkyCast
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Get real-time temperature updates for cities around the world.
        </p>

      <div className="flex gap-2 mb-6">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            backend();
            }
          }}

          placeholder="Enter city..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={backend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      {weather && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-center shadow-lg border border-blue-100">
          <div className="text-5xl mb-3">
            {getWeatherIcon(weather.weatherCode)}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {weather.city.charAt(0).toUpperCase() + weather.city.slice(1)}
          </h2>
          <p className="text-5xl font-bold text-blue-600">
            {weather.temperature}°C
          </p>
          <p className="text-gray-500 mt-2">
            Current Temperature
          </p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>🌬️ Wind Speed: {weather.windSpeed} km/h</p>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Updated at {lastUpdated}
          </p>
        </div>
      )}

      {/* {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
      )} (loading word appears here)*/} 

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mt-4">
          {error}
        </p>
      )}

      </div>
    </main>
  );
}
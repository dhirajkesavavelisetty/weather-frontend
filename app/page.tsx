"use client";
import {useState} from "react";

interface WeatherData {
    city: string;
    temperature: number;
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
    const backend = async () => {
        if (!city.trim()) return;
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://weather-backend-3y1l.onrender.com/weather/${city}`
        );
        const data = await response.json();
        if (!response.ok) {
          setWeather(null);
          setError(data.error);
          setLoading(false);
          return;
        }
        setWeather(data);
        setLoading(false);
    };

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather App
        </h1>

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
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {weather.city}
          </h2>
          <p className="text-5xl font-bold text-blue-600">
            {weather.temperature}°
          </p>
          <p className="text-gray-500 mt-2">
            Current Temperature
          </p>
        </div>
      )}

      {loading && (
        <p className="text-center text-gray-500">
          Loading...
        </p>
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
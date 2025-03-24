import React, { useState } from "react";
import axios from "axios";
import './Weather.css'

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const API_KEY = "74bfbba0157dc1959622f523b9e1327e"; // Substitua pela sua chave

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Cidade não encontrada!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Previsão do Tempo</h2>
      <input
        className="weather-input"
        type="text"
        placeholder="Digite a cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="weather-button" onClick={fetchWeather}>
        Buscar
      </button>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>💨 Vento: {weather.wind.speed} m/s</p>
          <p>💧 Umidade: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Ícone do clima"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
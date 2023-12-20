import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureHigh, faWind, faTint, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './WeatherCard.css'; // Import your CSS file

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const fetchWeather = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'X-RapidAPI-Key': '1ef47337d7msh89c104089ba955cp1b272djsn59bf3d530a98',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCitySubmit = () => {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}`;
    fetchWeather(url);
  };

  const handleLocationPermission = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://open-weather13.p.rapidapi.com/city/latlon/${position.coords.latitude}/${position.coords.longitude}`;
        fetchWeather(url);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="weather-widget">
      <button className="cloud-button" onClick={() => setShowCard(!showCard)}>
        <FontAwesomeIcon className="fa-icon" icon={faCloud} />
      </button>
      <CSSTransition in={showCard} timeout={300} classNames="card" unmountOnExit>
        <div className="weather-card">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
          <button onClick={handleCitySubmit}>Submit</button>
          <button onClick={handleLocationPermission}>Use my location</button>
          {weatherData && 
            <div className="weather-data">
              <h2><FontAwesomeIcon className="fa-icon" icon={faCloud} /> Weather in {weatherData.name}, {weatherData.sys.country}</h2>
              <p><FontAwesomeIcon className="fa-icon" icon={faTemperatureHigh} /> Temperature: {weatherData.main.temp}K</p>
              <p><FontAwesomeIcon className="fa-icon" icon={faCloud} /> Weather: {weatherData.weather[0].description}</p>
              <p><FontAwesomeIcon className="fa-icon" icon={faWind} /> Wind Speed: {weatherData.wind.speed} m/s</p>
              <p><FontAwesomeIcon className="fa-icon" icon={faCompressArrowsAlt} /> Pressure: {weatherData.main.pressure} hPa</p>
              <p><FontAwesomeIcon className="fa-icon" icon={faTint} /> Humidity: {weatherData.main.humidity}%</p>
            </div>
          }
        </div>
      </CSSTransition>
    </div>
  );
};

export default WeatherCard;

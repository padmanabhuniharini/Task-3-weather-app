import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(currentWeatherUrl).then((response) => {
        setCurrentWeather(response.data);
      });

      axios.get(forecastUrl).then((response) => {
        setForecast(response.data.list);
      });

      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{currentWeather.name}</p>
          </div>
          <div className="temp">
            {currentWeather.main ? <h1>{currentWeather.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {currentWeather.weather ? <p>{currentWeather.weather[0].main}</p> : null}
          </div>
        </div>

        {currentWeather.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {currentWeather.main ? <p className="bold">{currentWeather.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {currentWeather.main ? <p className="bold">{currentWeather.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {currentWeather.wind ? <p className="bold">{currentWeather.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="forecast">
            <div className="forecast-grid">
              {forecast.map((item, index) => {
                if (index % 8 === 0) { // Displaying one forecast per day (since each day has 8 intervals)
                  return (
                    <div key={item.dt} className="forecast-item">
                      <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                      <p>{item.main.temp.toFixed()}°F</p>
                      <p>{item.weather[0].main}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

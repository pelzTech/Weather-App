import React, { useState } from 'react';

const WeatherForm = ({ onFormSubmit }) => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const OnChange = (e) => {
    setLocation(e.target.value);
    console.log(location)
  };


  const apiKey = 'fc9748f7783db4c527ffa8585dec0210';
  const location1 = 'Germany';
  const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const weatherData1 = await response.json();
      console.log(weatherData1);
      setWeatherData(weatherData1);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  }

  return (

    <>
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label>
              <div className="city">
                <div className="enter">Enter City:</div>
                <input
                  className='Input'
                  type="text"
                  value={location}
                  onChange={OnChange}
                  placeholder="E.g., New York"
                  required
                />
              </div>
            </label>
            <button id='Submit' type="submit">Get Weather</button>
          </div>
        </form>
      </div>

      {weatherData && (
       <div className="display">
          <h2>Weather Information</h2>
          <div className='info'>
          <div className="weather-info">
            <p>Location: {weatherData.location.name}, {weatherData.location.country}</p>
            <p>Temperature: {weatherData.current.temperature}°C</p>
            <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
            <p>Wind: {weatherData.current.wind_speed} m/s, {weatherData.current.wind_dir}</p>
            <p>Pressure: {weatherData.current.pressure} mb</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Feels Like: {weatherData.current.feelslike}°C</p>
            {/* Add more information as needed */}
          </div>
          <div className="weather-img">
            <img src={weatherData.current.weather_icons[0]} alt="Weather Icon" />
          </div>
        </div>

        </div>

        
      )}

    </>
  );
};

export default WeatherForm;

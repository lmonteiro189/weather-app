import React, { useState, useEffect } from 'react';
import axios from 'axios';

require('dotenv').config();
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
  // States - Hooks
  const [degreeType, setDegreeType] = useState(' °C');
  const [option, setOption] = useState('Lisbon,pt');
  const [dataWeather, setDataWeather] = useState([]);
  const [icon, setIcon] = useState([]);

  //API
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${option}&appid=${API_KEY}`)
      .then((props) => {
        setDataWeather(props.data);
        setIcon(`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [option]);

  //Functions
  const handleDegreeType = () => {
    degreeType === ' °C' ? setDegreeType(' °F') : setDegreeType(' °C');
  };

  const convertDegree = (degree, weather) => {
    if (degree === ' °C') {
      return Math.ceil(weather - 273.15);
    } else if (degree === ' °F') {
      return Math.ceil((weather * 9) / 5 - 459.67);
    }
  };

  const convertTime = (time) => {
    var dt = new Date(time * 1000);
    var hr = dt.getHours();
    var m = '0' + dt.getMinutes();
    return hr + ':' + m.substr(-2);
  };

  return (
    <div className="weather">
      <div className="box-2items">
        <div>
          <form>
            <select
              className="box-select"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="Lisbon,pt">Lisbon</option>
              <option value="London,uk">London</option>
              <option value="Dublin,ie">Dublin</option>
              <option value="Edinburgh,gb">Edinburgh</option>
            </select>
          </form>
        </div>
        <div className="box-align-center">
          <span>°C </span>
          <label className="switch">
            <input type="checkbox" id="typedegree" onClick={() => handleDegreeType()} />
            <span className="slider round"></span>
          </label>
          <span> °F</span>
        </div>
      </div>
      <div className="box-single">
        <span>
          {dataWeather.main ? convertDegree(degreeType, dataWeather.main.temp) : 'Loading'}
          {degreeType === ' °C' ? ' °C' : ' °F'}
        </span>
      </div>
      <div className="box-single">
        <img src={icon} alt="icon" />
      </div>
      <div className="box-2items">
        <span>Sunrise: {dataWeather.sys ? convertTime(dataWeather.sys.sunrise) : 'Loading'}</span>
        <span>Sunset: {dataWeather.sys ? convertTime(dataWeather.sys.sunset) : 'Loading'}</span>
      </div>
    </div>
  );
};

export default Weather;

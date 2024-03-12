// asset and styling imports
import React, { useState, useEffect } from 'react';
import clear_icon from '../Assets/forecast_icons/clear.png';
import partly_cloudy_icon from '../Assets/forecast_icons/partly_cloudy.png';
import mostly_cloudy_icon from '../Assets/forecast_icons/mostly_cloudy.png';
import cloudy_icon from '../Assets/forecast_icons/cloudy.png';
import shower_rain_icon from '../Assets/forecast_icons/shower_rain.png';
import rain_icon from '../Assets/forecast_icons/rain.png';
import thunderstorm_icon from '../Assets/forecast_icons/thunderstorm.png';
import snow_icon from '../Assets/forecast_icons/snow.png';

import main_clear from '../Assets/main_icons/main_clear.png';
import main_partly_cloudy from '../Assets/main_icons/main_partly_cloudy.png';
import main_mostly_cloudy from '../Assets/main_icons/main_mostly_cloudy.png';
import main_cloudy from '../Assets/main_icons/main_cloudy.png';
import main_rain from '../Assets/main_icons/main_rain.png';
import main_shower_rain from '../Assets/main_icons/main_shower_rain.png';
import main_thunderstorm from '../Assets/main_icons/main_thunderstorm.png';
import main_snow from '../Assets/main_icons/main_snow.png';
import SearchInput from './SearchInput.jsx';
import './WeatherApp.css';

export const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [wicon, setWicon] = useState(clear_icon);
  const [currentWeather, setCurrentWeather] = useState('');
  const [temperature,setTemperature] = useState('');
  const [tempLow,setTempLow] = useState('');
  const [tempHigh,setTempHigh] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [feelsLike, setfeelsLike] = useState('');
  const [forecastTemperatures, setForecastTemperatures] = useState([]);
  const [forecastWeathers, setForecastWeathers] = useState([]);

  const [city, setCity] = useState("London");
  const [searchActive, setSearchActive] = useState(false);

  const api_key="d05c1b85bb5e3f1655de6eb4621044d7";
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=d05c1b85bb5e3f1655de6eb4621044d7`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=d05c1b85bb5e3f1655de6eb4621044d7`;  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(currentUrl);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const forecastResponse = await fetch(forecastUrl);
        const jsonForecastData = await forecastResponse.json();
        setForecastData(jsonForecastData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [city]);

useEffect(() => {
    if (data && forecastData) {
      setPrecipitation("--");
      const iconCode = data.weather[0].icon;
      switch (iconCode) {
        case "01d":
        case "01n":
          setCurrentWeather("Sunny");
          setWicon(main_clear);
          break;
        case "02d":
        case "02n":
          setCurrentWeather("Partly Cloudy");
          setWicon(main_partly_cloudy);
          break;
        case "03d":
        case "03n":          
          setCurrentWeather("Mostly Cloudy");
          setWicon(main_mostly_cloudy);
          break;
        case "04d":
        case "04n":
          setCurrentWeather("Cloudy");
          setWicon(main_cloudy);
          break;
        case "09d":
        case "09n":
          setCurrentWeather("Drizzle");
          setWicon(main_shower_rain);
          setPrecipitation('<0.5mm');
          break;
        case "10d":
        case "10n":
          setCurrentWeather("Rainy");
          setWicon(main_rain);
          setPrecipitation(data.rain['1h'] + 'mm');
          break;
        case "11d":
        case "11n":
          setCurrentWeather("Thunderstorm");
          setWicon(main_thunderstorm);
          setPrecipitation(data.rain['1h'] + 'mm');
          break;
        case "13d":
        case "13n":
          setCurrentWeather("Snowing");
          setWicon(main_snow);
          setPrecipitation(data.snow['1h'] + 'mm');
          break;
        default:
          setCurrentWeather("Partly Cloudy");
          setWicon(main_partly_cloudy);
          break;
      }
    setTemperature(Math.round(data.main.temp));
    setTempLow(Math.round(data.main.temp_min));
    setTempHigh(Math.round(data.main.temp_max));
    setHumidity(Math.round(data.main.humidity));
    setWindSpeed(Math.round(data.wind.speed));
    setfeelsLike(Math.round(data.main.feels_like));

    // iterate through the five days an index of 0 that increases by 8 until 40
    const tempForecastTemperatures = [];
    const tempForecastWeatherCodes = [];
    for (let i = 0; i < 40; i += 8){
      let dailyMax = 0;
      let dailyWeather = [];
      // only evaluate from 3am to 9pm
      for (let j = 1; j < 7; j++) {
      // for each day, iterate 8 times across each 3-hour interval and record the maximum temperature
        if (forecastData.list[i + j].main.temp_max > dailyMax){
          dailyMax = forecastData.list[i + j].main.temp_max;
        }
        // also, populate an array of the weather conditions for the day, create an iconCode for the day based off maximum in this array
        let iconCode = forecastData.list[i + j].weather[0].icon;
        dailyWeather.push(iconCode)
      }
      console.log(dailyMax)
      console.log(dailyWeather)
      console.log("-------")
      // push each maximum temperature into tempForecastTemperatures array
      tempForecastTemperatures.push(Math.round(dailyMax));

      const countMap = {};    
      dailyWeather.forEach(item => {
        countMap[item] = (countMap[item] || 0) + 1;
      });
      let majorityCount = 0;
      let majorityElement = null;
      let isTie = false;
      
      for (const item in countMap) {
          if (countMap[item] > majorityCount) {
              majorityCount = countMap[item];
              majorityElement = item;
              isTie = false;
          } else if (countMap[item] === majorityCount) {
              isTie = true;
          }
      }
      
      if (!isTie) {
        if (dailyWeather.includes("11d") || dailyWeather.includes("11n")){
          tempForecastWeatherCodes.push("11d");
        } else if (dailyWeather.includes("09d") || dailyWeather.includes("09n")){
          tempForecastWeatherCodes.push("09d");
        } else if (dailyWeather.includes("10d") || dailyWeather.includes("10n")){
          tempForecastWeatherCodes.push("10d");
        }
        else {
          tempForecastWeatherCodes.push(majorityElement);
        }
      } else {
        // if there is a tie, take the afternoon weather
        tempForecastWeatherCodes.push(forecastData.list[5].main.temp_max);
      }
      // using a switch for iconCode, populate the tempForecastWeathers array
    }
    setForecastTemperatures(tempForecastTemperatures);
    const tempForecastWeathers = [];

    for (let i = 0; i < 5; i++) {
      const iconCode = tempForecastWeatherCodes[i];
      switch (iconCode) {
        case "01d":
        case "01n":
          tempForecastWeathers.push(clear_icon);
          break;
        case "02d":
        case "02n":
          tempForecastWeathers.push(partly_cloudy_icon);
          break;
        case "03d":
        case "03n":
          tempForecastWeathers.push(mostly_cloudy_icon);
        case "04d":
        case "04n":
          tempForecastWeathers.push(cloudy_icon);
          break;
        case "09d":
        case "09n":
          tempForecastWeathers.push(shower_rain_icon);
          break;
        case "10d":
        case "10n":
          tempForecastWeathers.push(rain_icon);
          break;
        case "11d":
        case "11n":
          tempForecastWeathers.push(thunderstorm_icon);
          break;
        case "13d":
        case "13n":
          tempForecastWeathers.push(snow_icon);
          break;
        default:
          tempForecastWeathers.push(cloudy_icon);
          break;
      }
    }
    setForecastWeathers(tempForecastWeathers);
  }
  }, [data, forecastData]);

  if (!data || !forecastData) {
    return <div>Loading...</div>;
  }

  const toggleSearchActive = () => {
    console.log('Pressed');
    setSearchActive(!searchActive);
  };

  const today = new Date();
  const fullDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedToday = `${fullDaysOfWeek[today.getDay()]}, ${monthsOfYear[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const currentDayIndex = new Date().getDay();

  const fiveDayForecast = [];
  for (let i = 1; i <=5; i++) {
    const nextDayName = daysOfWeek[(currentDayIndex + i) % 7];
    fiveDayForecast.push(nextDayName);
  }

  const handleSearch = (query) => {
    setCity(query);
    setSearchActive(false);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="top-container">
          <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z" fill="#3d3b40"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z" fill="#3d3b40"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z" fill="#3d3b40"></path> </g></svg>        
          <div className="location-container">
            {searchActive ? (
            <div className={`search-input ${searchActive ? 'active' : ''}`}>
              <svg className="pin-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" fill="#3D3B40"></path> </g></svg>
              <SearchInput onSearch={handleSearch}/>
            </div>
            ) : (
              <div className="subcontainer">
                <svg className="pin-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" fill="#3D3B40"></path> </g></svg>
                <div className="title">{city}</div>
            </div>
            )}
            <div className="date">{formattedToday}</div>
          </div>
          <svg className="icon" onClick={toggleSearchActive} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#3D3B40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <div className="bottom-container">
          <div className="current-temp-container">
            <div className="current-temp">{temperature}</div>
            <div className="main-weather-icon-formatter">
              <img src={wicon} className="main-weather-icon" alt=" "></img>
            </div>
          </div>
          <div className="feels-like">Feels like {feelsLike}&deg;</div>
          <div className="current-weather">{currentWeather}</div>
          <div className="min-max-container">
            <div className="min-max">High: {tempHigh}&deg;</div>
            <div className="min-max">Low: {tempLow}&deg;</div>
          </div>
          <div className="stats-container">
            <div className="stats-element">
              <svg className="icon" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.25"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.93 15.745H6.87C4.45 15.745 2.5 13.725 2.5 11.215C2.5 8.72503 4.45 6.68503 6.87 6.68503C7.4 6.68503 7.89999 6.77503 8.35999 6.95503C8.60999 7.04503 8.87001 6.95503 9.01001 6.73503C9.74001 5.49503 11.07 4.65503 12.59 4.65503C14.61 4.65503 16.28 6.11503 16.69 8.06503C16.75 8.33503 16.97 8.47504 17.24 8.41504C17.46 8.36504 17.69 8.34503 17.93 8.34503C19.91 8.34503 21.5 10.005 21.5 12.055C21.51 14.095 19.91 15.745 17.93 15.745Z" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.51 20.345L12.01 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.51 20.345L16.01 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.51001 20.345L8.01001 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              <div className="value">{precipitation}</div>
              <div className="title">Precipitation</div>
            </div>
            <div className="stats-element">
              <svg className="icon" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.99999 14C8.99999 13.4477 8.55227 13 7.99999 13C7.4477 13 6.99999 13.4477 6.99999 14C6.99999 15.3574 7.26721 16.7375 8.08236 17.7972C8.93437 18.9048 10.2571 19.5 12 19.5C12.5523 19.5 13 19.0523 13 18.5C13 17.9477 12.5523 17.5 12 17.5C10.7429 17.5 10.0656 17.0952 9.66761 16.5778C9.23276 16.0125 8.99999 15.1426 8.99999 14Z" fill="#3D3B40"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4228 1.54267C12.6513 0.711988 11.348 0.712021 10.5766 1.54273C9.63287 2.55896 7.89116 4.5305 6.37916 6.77881C4.87045 9.02222 3.46953 11.5773 3.49416 14.3526C3.49633 14.5981 3.50939 14.9426 3.55218 15.3536C3.63717 16.17 3.84245 17.278 4.33361 18.4008C4.82693 19.5285 5.61868 20.6923 6.88173 21.5709C8.15052 22.4536 9.82552 23 11.9997 23C14.1739 23 15.8489 22.4536 17.1178 21.5709C18.3808 20.6923 19.1727 19.5286 19.6661 18.4009C20.1573 17.2781 20.3627 16.17 20.4477 15.3536C20.4905 14.9427 20.5036 14.5982 20.5058 14.3527C20.5306 11.5774 19.1293 9.02208 17.6206 6.77875C16.1084 4.53043 14.3666 2.55889 13.4228 1.54267ZM8.03877 7.89491C9.44577 5.80274 11.0797 3.94302 11.9997 2.94942C12.9198 3.94301 14.5539 5.80273 15.961 7.89491C17.2351 9.78932 18.5269 11.9805 18.5059 14.3348C18.5042 14.5268 18.4938 14.8074 18.4585 15.1464C18.3873 15.83 18.2176 16.722 17.8338 17.5992C17.4521 18.4715 16.8689 19.3078 15.9756 19.9291C15.0882 20.5465 13.8256 21 11.9997 21C10.1738 21 8.91129 20.5465 8.02387 19.9291C7.13071 19.3078 6.54754 18.4715 6.16596 17.5992C5.78221 16.722 5.61259 15.8301 5.54142 15.1465C5.50613 14.8074 5.49578 14.5269 5.49408 14.3349C5.4732 11.9806 6.76469 9.78944 8.03877 7.89491Z" fill="#3D3B40"></path> </g></svg>
              <div className="value">{humidity}%</div>
              <div className="title">Humidity</div>
            </div>
            <div className="stats-element">
              <svg className="icon" viewBox="-1.2 -1.2 26.40 26.40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 22.75C16.16 22.75 14.25 20.84 14.25 18.5V18C14.25 17.59 14.59 17.25 15 17.25C15.41 17.25 15.75 17.59 15.75 18V18.5C15.75 20.02 16.98 21.25 18.5 21.25C20.02 21.25 21.25 20.02 21.25 18.5C21.25 16.98 20.02 15.75 18.5 15.75H2C1.59 15.75 1.25 15.41 1.25 15C1.25 14.59 1.59 14.25 2 14.25H18.5C20.84 14.25 22.75 16.16 22.75 18.5C22.75 20.84 20.84 22.75 18.5 22.75Z" fill="#3D3B40"></path> <path d="M18.5 12.75H2C1.59 12.75 1.25 12.41 1.25 12C1.25 11.59 1.59 11.25 2 11.25H18.5C20.02 11.25 21.25 10.02 21.25 8.5C21.25 6.98 20.02 5.75 18.5 5.75C16.98 5.75 15.75 6.98 15.75 8.5V9C15.75 9.41 15.41 9.75 15 9.75C14.59 9.75 14.25 9.41 14.25 9V8.5C14.25 6.16 16.16 4.25 18.5 4.25C20.84 4.25 22.75 6.16 22.75 8.5C22.75 10.84 20.84 12.75 18.5 12.75Z" fill="#3D3B40"></path> <path d="M9.31 9.75109H2C1.59 9.75109 1.25 9.41109 1.25 9.00109C1.25 8.59109 1.59 8.25109 2 8.25109H9.31C10.38 8.25109 11.25 7.38109 11.25 6.31109C11.25 5.24109 10.38 4.37109 9.31 4.37109C8.24 4.37109 7.37 5.24109 7.37 6.31109V6.69109C7.37 7.10109 7.03 7.44109 6.62 7.44109C6.21 7.44109 5.87 7.11109 5.87 6.69109V6.31109C5.87 4.41109 7.41 2.87109 9.31 2.87109C11.21 2.87109 12.75 4.41109 12.75 6.31109C12.75 8.21109 11.21 9.75109 9.31 9.75109Z" fill="#3D3B40"></path> </g></svg>
              <div className="value">{windSpeed} km/h</div>
              <div className="title">Wind Speed</div>
            </div>
          </div>
          <div className="forecast-container">
            <div className="element">
              <div className="title">{fiveDayForecast[0]}</div>
              <div className="subcontainer">
                <img src={forecastWeathers[0]} className="icon" alt=" "></img>
                <div className="value">{forecastTemperatures[0]}</div>
              </div>
            </div>
            <div className="element">
              <div className="title">{fiveDayForecast[1]}</div>
              <div className="subcontainer">
                <img src={forecastWeathers[1]} className="icon" alt=" "></img>
                <div className="value">{forecastTemperatures[1]}</div>
              </div>
            </div>
            <div className="element">
              <div className="title">{fiveDayForecast[2]}</div>
              <div className="subcontainer">
                <img src={forecastWeathers[2]} className="icon" alt=" "></img>
                <div className="value">{forecastTemperatures[2]}</div>
              </div>
            </div>
            <div className="element">
              <div className="title">{fiveDayForecast[3]}</div>
              <div className="subcontainer">
                <img src={forecastWeathers[3]} className="icon" alt=" "></img>
                <div className="value">{forecastTemperatures[3]}</div>
              </div>
            </div>
            <div className="element">
              <div className="title">{fiveDayForecast[4]}</div>
              <div className="subcontainer">
                <img src={forecastWeathers[4]} className="icon" alt=" "></img>
                <div className="value">{forecastTemperatures[4]}</div>
              </div>
            </div>
          </div>
          <div className="affirmation-container">
            <div className="subcontainer">
              <div className="value">You look great today.</div>
              <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>          </div>
          </div>
        </div>
        <div className="blur-circle top"></div>
        <div className="blur-circle middle"></div>
        <div className="blur-circle bottom"></div>
      </div>
    </div>
  );
}

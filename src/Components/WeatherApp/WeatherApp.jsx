// asset and styling imports
import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.svg'
import sunny_icon from '../Assets/sunny.png'
import cloudy_icon from '../Assets/cloudy.png'
import rainy_icon from '../Assets/rainy.png'
import thunder_icon from '../Assets/thunder.png'

export const WeatherApp = () => {

  let api_key="d05c1b85bb5e3f1655de6eb4621044d7";
  const [wicon, setWicon] = useState(sunny_icon);
  const search = async () => {
    const element =document.getElementsByClassName("cityInput");
    if(element[0].value==="")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity =document.getElementsByClassName("humidity-percent");
    const wind =document.getElementsByClassName("wind-rate");
    const temperature =document.getElementsByClassName("weather-temp");
    const location =document.getElementsByClassName("weather-location");
    const temp_high =document.getElementsByClassName("weather-temp-high");
    const temp_low =document.getElementsByClassName("weather-temp-low");
    const cloudiness =document.getElementsByClassName("cloudiness");


    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.round(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.round(data.main.temp * 10) / 10 + "°C";
    location[0].innerHTML = data.name;
    temp_high[0].innerHTML = Math.round(data.main.temp_max) + "°C";
    temp_low[0].innerHTML = Math.round(data.main.temp_min) + "°C";
    cloudiness[0].innerHTML = Math.round(data.clouds.all) + "%";

    if(data.weather[0].icon == "01d" || data.weather[0].icon  == "01n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "02d" || data.weather[0].icon  == "02n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "03d" || data.weather[0].icon  == "03n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "04d" || data.weather[0].icon  == "04n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "09d" || data.weather[0].icon  == "09n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "10d" || data.weather[0].icon  == "10n")
    {
      setWicon(sunny_icon);
    }
    else if(data.weather[0].icon == "13d" || data.weather[0].icon  == "13n")
    {
      setWicon(sunny_icon);    }
    else
    {
      setWicon(sunny_icon);    }
  }
  return (
    <div className="container">
      <div className="top-container">
        <img src="Assets/cloud.png" className="icon"></img>
        <div className="location-container">
          <div className="subcontainer">
            <img src="Assets/cloud.png" className="pin"></img>
            <div className="title">Location</div>
          </div>
          <div className="date">Saturday, February 24, 2024</div>
        </div>
        <img src="Assets/cloud.png" className="icon"></img>
      </div>
      <div className="bottom-container">
        <div className="current-temp">22</div>
        <div className="feels-like">Feels like 21</div>
        <img src="Assets/cloud.png" className="main-weather-icon"></img>
        <div className="current-weather">Partly Cloudy</div>
        <div className="min-max-container">
          <div className="min-max">High: 24</div>
          <div className="min-max">Low: 19</div>
        </div>
        <div className="stats-container">
          <div className="stats-element">
            <img className="icon" src="Assets/cloud.png"></img>
            <div className="value">30%</div>
            <div className="title">Precipitation</div>
          </div>
          <div className="stats-element">
            <img className="icon" src="Assets/cloud.png"></img>
            <div className="value">20%</div>
            <div className="title">Humidity</div>
          </div>
          <div className="stats-element">
            <img className="icon" src="Assets/cloud.png"></img>
            <div className="value">10 km/h</div>
            <div className="title">Wind Speed</div>
          </div>
        </div>
        <div className="forecast-container">
          <div className="element">
            <div className="title">TOM</div>
            <div className="subcontainer">
              <img src="Assets/cloud.png" className="icon"></img>
              <div className="value">22</div>
            </div>
          </div>
          <div className="element">
            <div className="title">MON</div>
            <div className="subcontainer">
              <img src="Assets/cloud.png" className="icon"></img>
              <div className="value">14</div>
            </div>
          </div>
          <div className="element">
            <div className="title">TUE</div>
            <div className="subcontainer">
              <img src="Assets/cloud.png" className="icon"></img>
              <div className="value">19</div>
            </div>
          </div>
          <div className="element">
            <div className="title">WED</div>
            <div className="subcontainer">
              <img src="Assets/cloud.png" className="icon"></img>
              <div className="value">24</div>
            </div>
          </div>
          <div className="element">
            <div className="title">THU</div>
            <div className="subcontainer">
              <img src="Assets/cloud.png" className="icon"></img>
              <div className="value">18</div>
            </div>
          </div>
        </div>
        <div className="affirmation-container">
          <div className="subcontainer">
            <div className="value">You look great today.</div>
            <img src="Assets/cloud.png" className="icon"></img>
          </div>
         </div>
      </div>
      <div className="blur-circle top"></div>
      <div className="blur-circle bottom"></div>
    </div>
  )
}

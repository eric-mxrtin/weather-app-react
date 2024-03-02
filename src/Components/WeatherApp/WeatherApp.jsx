// asset and styling imports
import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from './search.svg'
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
        <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 7C20.75 7.41421 20.4142 7.75 20 7.75L4 7.75C3.58579 7.75 3.25 7.41421 3.25 7C3.25 6.58579 3.58579 6.25 4 6.25L20 6.25C20.4142 6.25 20.75 6.58579 20.75 7Z" fill="#3d3b40"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12Z" fill="#3d3b40"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 17C20.75 17.4142 20.4142 17.75 20 17.75L4 17.75C3.58579 17.75 3.25 17.4142 3.25 17C3.25 16.5858 3.58579 16.25 4 16.25L20 16.25C20.4142 16.25 20.75 16.5858 20.75 17Z" fill="#3d3b40"></path> </g></svg>        
        <div className="location-container">
          <div className="subcontainer">
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" fill="#3D3B40"></path> </g></svg>
            <div className="title">Location</div>
          </div>
          <div className="date">Saturday, February 24, 2024</div>
        </div>
        <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#3D3B40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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

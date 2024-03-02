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
            <svg className="icon" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.25"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.93 15.745H6.87C4.45 15.745 2.5 13.725 2.5 11.215C2.5 8.72503 4.45 6.68503 6.87 6.68503C7.4 6.68503 7.89999 6.77503 8.35999 6.95503C8.60999 7.04503 8.87001 6.95503 9.01001 6.73503C9.74001 5.49503 11.07 4.65503 12.59 4.65503C14.61 4.65503 16.28 6.11503 16.69 8.06503C16.75 8.33503 16.97 8.47504 17.24 8.41504C17.46 8.36504 17.69 8.34503 17.93 8.34503C19.91 8.34503 21.5 10.005 21.5 12.055C21.51 14.095 19.91 15.745 17.93 15.745Z" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.51 20.345L12.01 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.51 20.345L16.01 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.51001 20.345L8.01001 17.745" stroke="#3D3B40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>          </div>
         </div>
      </div>
      <div className="blur-circle top"></div>
      <div className="blur-circle bottom"></div>
    </div>
  )
}

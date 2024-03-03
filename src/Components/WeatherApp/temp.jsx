const [wicon, setWicon] = useState(sunny_icon);
const search = async () => {
  const element =document.getElementsByClassName("cityInput");
  if(element[0].value==="")
  {
    return 0;
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

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

  if(data.weather[0].icon === "01d" || data.weather[0].icon  === "01n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "02d" || data.weather[0].icon  === "02n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "03d" || data.weather[0].icon  === "03n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "04d" || data.weather[0].icon  === "04n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "09d" || data.weather[0].icon  === "09n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "10d" || data.weather[0].icon  === "10n")
  {
    setWicon(sunny_icon);
  }
  else if(data.weather[0].icon === "13d" || data.weather[0].icon  === "13n")
  {
    setWicon(sunny_icon);    }
  else
  {
    setWicon(sunny_icon);    }
}
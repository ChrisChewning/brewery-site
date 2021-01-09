import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  let [weatherData, setWeatherData] = useState("");
  let [weatherCondition, setWeatherCondition] = useState("");
  let temperature = "a";

  function getWeather() {
    axios
      .get("/apis/weather")
      .then((response) => {
        console.log(response.data);

        console.log(response.data.weather[0].description);
        console.log(response.data.weather[0].icon);
        setWeatherData(Math.round(response.data.main.temp));
      })
      .then((response) => {
        if (weatherData > 50) {
          axios.get("/api/brewery/breweries/patios").then((response) => {
            console.log(response.data);
          });
        } else if (weatherData < 50) {
          axios.get("/api/brewery/breweries/big_indoors").then((response) => {
            console.log(response.data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //if weatherData > 50 and weatherCondition.includes('cloudy', 'sunny', 'clear' etc)
    //math.random breweries with a application

    //if weatherCondition.includes('rainy', etc. )
    //random breweries with a big indoors
  }

  return (
    <div>
      <h2>Weather in Austin is {weatherData} degrees. </h2>
      <div></div>
      <button onClick={getWeather}>Get Weather</button>
    </div>
  );
};

export default Weather;

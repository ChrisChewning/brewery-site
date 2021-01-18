import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import axios from "axios";

const Weather = () => {
  let [weatherData, setWeatherData] = useState("");
  let [weatherCondition, setWeatherCondition] = useState("");
  let [advice, setAdvice] = useState("");
  let [icon, setIcon] = useState("");

  function getWeather() {
    axios
      .get("/apis/weather")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.weather[0].description); //"clear sky" //.main = "clear"
        console.log(response.data.weather[0].icon); //01n. is there a way to translate it OR icons to set locally?
        setIcon(response.data.weather[0].icon)
        setWeatherData(Math.round(response.data.main.temp));
      })
      .then((response) => {
        if (weatherData > 50) {
          axios.get("/api/brewery/breweries/patios").then((response) => {
            let patios_randomized = response.data[Math.floor(Math.random() * response.data.length)];
            setAdvice([patios_randomized, ' patio'])
          });
        } else if (weatherData < 50) {
          axios.get("/api/brewery/breweries/big_indoors").then((response) => {
            let big_indoors_randomized = response.data[Math.floor(Math.random() * response.data.length)];
            setAdvice([big_indoors_randomized.name, ' big indoors'])
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Card>
      <h2>The weather in Austin is {weatherData} degrees; {advice[0]} has a {advice[1]}</h2>
      <button onClick={getWeather}>Get Weather</button>
      </Card>
    </div>
  );
};

export default Weather;

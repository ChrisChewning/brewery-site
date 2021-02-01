import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {Button} from '@material-ui/core';
import axios from "axios";

const Weather = () => {
  let [weatherData, setWeatherData] = useState("");
  let [weatherCondition, setWeatherCondition] = useState("");
  let [advice, setAdvice] = useState(false);
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
      <Card className="weather-index">
        {advice ? (
      <p>The weather in Austin is {weatherData} degrees; {advice[0]} has a {advice[1]}</p>
    )   :(<p>Get a Brewery Rec!</p>)
   }
   <Button variant="contained" color="primary" onClick={getWeather}>Try Me</Button>
      </Card>
    </div>
  );
};

export default Weather;

import React, { useState } from 'react';
import axios from 'axios';


const Weather = () => {
  let [responseObj, setResponseObj] = useState({});

function getWeather(){
  axios.get('/apis/weather')
  .then(response => {
  console.log(response.data.weather[0].description)
  console.log(response.data.weather[0].icon)
  console.log(response.data.main.temp)
  })
  .catch(error => {
  console.log(error.response)
  })

  };


return (

  <div>

  <h2>Weather in Austin</h2>
  <div>
   {JSON.stringify(responseObj)}
   </div>
   <button onClick={getWeather}>Get Weather</button>
   </div>
)

}

export default Weather;

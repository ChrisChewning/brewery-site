const router = require("express").Router();
const fetch = require("node-fetch");
const app = require('express');
let request = require('request');


let city = 'austin';
let apiKey = process.env.WEATHER_APIKEY;


const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`;

router.route("/weather").get((req, res) => {
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send(info);
        }
    })
})

module.exports = router;

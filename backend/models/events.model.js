const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  title: String,
  year: Number,
  month: Number,
  day: Number,
  time: Number,
  event: String,
  location: String,
  url: String
})

const Events = mongoose.model('Events', brewerySchema); //arg 1 could be anything

module.exports = Events;

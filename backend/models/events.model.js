const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  title: String,
  date: Date,
  event: String, //2nd
  location: String,
  url: String
})

const Events = mongoose.model('Events', brewerySchema); //arg 1 could be anything

module.exports = Events;

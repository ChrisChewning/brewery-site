const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  name: { type: String },
  beers: { type: String },
  image: { data: Buffer, type: String },
  location: {type: String},
  location_image: {data: Buffer, type: String},
  patio: {type: Boolean},
  big_indoors: {type: Boolean},
  website: {type: String},
  from_website: {type: String},
  hours: {type: String},
  description: {type: String},

})

const Brewery = mongoose.model('Brewery', brewerySchema); //arg 1 could be anything

module.exports = Brewery;

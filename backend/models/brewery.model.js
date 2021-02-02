const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrewerySchema = new Schema({
  name: { type: String },
  beers: { type: String },
  image: { data: Buffer, type: String },
  image_map: { data: Buffer, type: String},
  address: {type: String},
  location: {
      type: {
      type: String,
      default: "Point" //geojson only works with Point
    },
      coordinates: {
        type: [Number],
      },
  },
  location_image: {data: Buffer, type: String},
  patio: {type: Boolean},
  big_indoors: {type: Boolean},
  website: {type: String},
  from_website: {type: String},
  hours: {type: String},
  description: {type: String},

})

BrewerySchema.index({ location: "2dsphere" })
const Brewery = mongoose.model('Brewery', BrewerySchema); //arg 1 could be anything

module.exports = Brewery;

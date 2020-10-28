const mongoose = require('monoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  name: { type: String },
  beers: { type: String },
  image: { type: Image },
  location: {type: String},
  website: {type: String},
  hours: {type: String},
  content: {type: String},
})

const Brewery = mongoose.model('Brewery', brewerySchema); //arg 1 could be anything

module.exports = Brewery;

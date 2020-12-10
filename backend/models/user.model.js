const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 15
  },
  email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
    bcrypt: true
  },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: 8,
    validate: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
    bcrypt: true
  },
  image: {
    data: Buffer,
    type: String,
    //required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
 modified_date: {
   type: String
 },
 beers: {
   type: Array
 },
 future_beers: {
   type: Array
 }
});


//Custom error msg for 11000
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });



const User = mongoose.model('User', userSchema); //arg 1 could be anything

module.exports = User;

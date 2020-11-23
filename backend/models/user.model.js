const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


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
      unique: true,  //duplicate key error collection is happening even when this is commented out.
      required: true,
      trim: true
    },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

//Custom error msg for 11000
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });



const User = mongoose.model('User', userSchema); //arg 1 could be anything

module.exports = User;

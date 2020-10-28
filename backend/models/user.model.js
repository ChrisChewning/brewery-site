const mongoose = require('mongoose');
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
      unique: true,
      required: [true, "can't be blank"],
      trim: true
    },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema); //arg 1 could be anything

module.exports = User;

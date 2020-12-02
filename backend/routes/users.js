const router = require('express').Router();
require('dotenv').config(); //env variables can be in the dotenv file.
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require("jsonwebtoken");

const token = process.env.JWT_SECRET;

console.log(token)

//GET ALL USERS
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error ' + err))
})

//GET A SPECIFIC USER
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: ' + err))
})



//ADD USER
router.route('/adduser').post((req, res, user) => {
  const {username, email, password, passwordConfirm} = req.body
  //JWT
  const payload = { id: user._id };
  const options = {expiresIn: 3600};
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);

  console.log(secret, ' this is secret')
  //PW MATCH VALIDATION
  if (password !== passwordConfirm){
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  //PW REGEX VALIDATION
  var pwValidate =  /^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
  if(!password.match(pwValidate))
  {
    return res.status(400).json({ msg: 'Password must be at least 8 characters, have a capital, and have a special character'})
  }

  //HASH PW
  Bcrypt.hash(password, 12)
  .then(hashedpassword =>{
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
    passwordConfirm: hashedpassword
  });
  newUser.save()
  .then(() => res.json({success: true, message: "here's your token", token: token}))
  .catch(err => res.status(400).json('Error ' + err))
});
});


//DELETE USER
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
})


//LOGIN USER
//router.route('/login').post(req, res => {

//})


module.exports = router;

const router = require('express').Router();
require('dotenv').config(); //env variables can be in the dotenv file.
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const token = process.env.JWT_SECRET;


//LOGIN USER
router.route('/').post((req, res, user) => {
  const {username, password} = req.body;
  const payload = { id: user._id };
  const options = {expiresIn: 3600};
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  console.log(token, ' login token')

  User.findOne({ username })
  //VALIDATION CHECKS
  .then(user => {
    //validate user
    if(!user) return res.status(400).json({ msg: 'User does not exist' });

    //validate pw
    Bcrypt.compare(password, user.password)   //plain txt pw vs. hashed pw
    .then(isMatch => {
     if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
     console.log(password, ' pw')
     console.log(user.password, ' user pw')
  res.json({success: true, message: "here's your token", token: token, user: user})

  console.log(password, ' pw')
  console.log(user.password, ' user pw')
})
.catch(err => {
  console.log(err)
})
  })
});



module.exports = router;

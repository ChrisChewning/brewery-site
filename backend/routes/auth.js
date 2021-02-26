const router = require('express').Router();
require('dotenv').config(); //env variables can be in the dotenv file.
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");


//LOGIN USER
router.route('/').post((req, res, user) => {
  const {username, password} = req.body;
  const payload = { id: user._id };
  const options = {expiresIn: 3600};


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
  res.json({success: true,  user: user})

  console.log(password, ' pw')
  console.log(user.password, ' user pw')
})
.catch((err) => res.status(400).json("Error " + err));
  })
});



module.exports = router;

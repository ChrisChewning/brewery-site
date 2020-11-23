const router = require('express').Router();
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");



//GET ALL USERS
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error ' + err))
})

//ADD USER
router.route('/adduser').post((req, res) => {
  const {username, email, password, passwordConfirm} = req.body

  if (password !== passwordConfirm){
    return res.status(400).json({ msg: 'Passwords do not match' });
  }


  var pwValidate =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
  if(!password.match(pwValidate))
  {
    return res.status(400).json({ msg: 'Password must be at least 8 characters, have a capital, and have a special character'})
  }



  Bcrypt.hash(password, 12)
  .then(hashedpassword =>{
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
    passwordConfirm: hashedpassword
  });

  newUser.save()
  .then(() => res.json('User added'))
  .catch(err => res.status(400).json('Error ' +err));
});

});

//DELETE USER
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router;

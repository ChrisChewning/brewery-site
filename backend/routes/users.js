const router = require('express').Router();
let User = require('../models/user.model');

//GET ALL USERS
router.route('/').get((req, res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error ' + err))
})

//ADD USER
router.route('/adduser').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  const newUser = new User({
    username,
    email,
    password,
    passwordConfirm,
  });

  newUser.save()
  .then(() => res.json('User added'))
  .catch(err => res.status(400).json('Error ' +err));
});


//DELETE USER
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(() => res.json('User deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router;

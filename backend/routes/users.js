const router = require('express').Router();
require('dotenv').config(); //env variables can be in the dotenv file.
let User = require('../models/user.model');
const Bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require("path");

const token = process.env.JWT_SECRET;

var storage = multer.diskStorage({
   destination: "public/uploads/images",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("image");


router.route("/update-image/:id").post((req, res) => {
  upload(req, res, (err) => {
  const image = req.file.filename;
  const id = req.params.id;
  console.log(req.file, ' req.file')
  console.log(image, ' image')
  User.findByIdAndUpdate({_id: req.params.id},
  {$set: { image: req.file.filename}})
  .then(user => res.send(image))
  .catch(err => res.status(400).json('Error: ' + err))
})
})



// console.log(upload, ' upload')
// router.route('/update-image/:id').post((req, res) {
//   upload(req, res, err) {
//     if (err) {
//
//     }
//   }
  //   upload(req, res, function (err) {
  //     if (err) {
  //       // This is a good practice when you want to handle your errors differently
  //
//
//   console.log(req.file, 'req file') //undefined
//   //const image = req.body
//   const id = req.params.id;
//   const image = req.file.filename;
// console.log(image, ' image')
//   User.findByIdAndUpdate(id, image)
//   .then(() => res.json('Image updated'))
//   .catch(err => res.status(400).json('Error: ' + err))
// })



//app.post('/editPhoto', (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err) {
//       // This is a good practice when you want to handle your errors differently
//
//       return
//     }
//
//     // Everything went fine
//   })
// })


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
  const {username, email, password, passwordConfirm, image} = req.body
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
    passwordConfirm: hashedpassword,
    image
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




router.route('/update-email/:id').post((req, res) => {
  const id = req.params.id;
  const email = req.body;
  User.findByIdAndUpdate(id, email)
  .then(() => res.json('User Updated.'))
  .catch(err => res.status(400).json('Error: ' + err))
})

//
// router.post('/update-image:/idd', upload.single('image'), async (req, res) => {
//   const id = req.params.id;
//   const image = req.body;
//   User.findByIdAndUpdate(id, image)
//   .then(() => res.json('User updated'))
//   .catch(err => res.status(400).json('Error' + err))
// })

//var upload = multer({ storage: storage }).single('myImage');


// router.route('/update-image/:id').post((upload.single('image'), req, res) => {
//   console.log(request.file);
//   //img: request.file.filename;
//   const id = req.params.id;
//   const image = req.body;
//   User.findByIdAndUpdate(id, image)
//   .then(user => res.json('User updated'))
//   .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router;

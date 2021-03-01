const router = require("express").Router();
require("dotenv").config(); //env variables can be in the dotenv file.
let User = require("../models/user.model");
const Bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");


var storage = multer.diskStorage({
  destination: "public/uploads/images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("image");


//UPDATE USER'S IMAGE
router.route("/update-image/:id").post((req, res) => {
  upload(req, res, (err) => {
    const image = req.file.filename;
    const id = req.params.id;
    console.log(req.file, " req.file");
    console.log(image, " image");
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { image: req.file.path } }
    )
      .then((user) => res.send(image))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//UPDATE USER'S EMAIL ADDRESS
router.route("/update-email/:id").post((req, res) => {
  const id = req.params.id;
  const email = req.body;
  User.findByIdAndUpdate(id, email)
    .then(() => res.json("User Updated."))
    .catch((err) => res.status(400).json("Error: " + err));
});



//GET ALL USERS
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET A SPECIFIC USER
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});





//DELETE USER
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;

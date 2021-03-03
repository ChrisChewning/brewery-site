const crypto = require('crypto');
require('dotenv').config(); //env variables can be in the dotenv file.
let User = require('../models/user.model');
const router = require('express').Router();
const Bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


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


//ADD USER
router.route("/adduser").post((req, res, user) => {
  const { username, email, password, passwordConfirm } = req.body;
  const payload = { id: user._id };
  const options = { expiresIn: 3600 };

  //PW MATCH VALIDATION
  if (password !== passwordConfirm) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  //PW REGEX VALIDATION
  var pwValidate = /^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
  if (!password.match(pwValidate)) {
    return res
      .status(400)
      .json({
        msg:
          "Password must be at least 8 characters, have a capital, and have a special character",
      });
  }

  //HASH PW
  Bcrypt.hash(password, 12).then((hashedpassword) => {
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
      passwordConfirm: hashedpassword,
    });
    newUser
      .save()
      .then((user => //
        res.json({ success: true, user: user })
      ))
      .catch((err) => res.status(400).json("Error " + err));
  });
});


router.route("/forgot-password").post(async (req, res) => {

  const token = crypto.randomBytes(20).toString('hex');


   const userToken = await User.findOneAndUpdate( //set the user that = email input to variable userToken
     {email: req.body.email},
     {
    $set: {
      resetPasswordToken: token, //set key in db resetPasswordToken to token here.
      resetPasswordExpires: Date.now() + 3600000 //1hr.
    },
  },
    { new: true }
  )

      const transporter = nodemailer.createTransport({ //this is the account sending the email
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        },
      })

      const mailOptions = { //mailOptions is Node's name for 'template'
          from: 'atxbrews@gmail.com',
          to: `${userToken.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/reset-password/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => { //nodeMailer's fn
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
    })



    router.get('/reset-password/:token', (req, res) => {
      User.findOne({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: {
          $gt: Date.now(),
        },
      }).then((user) => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else {
          res.status(200).send({
            username: user.username,
            message: 'password reset link is good',
          });
        }
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



router.route("/update-password/:token").post((req, res) => {
    const password = req.body.password; //can be used in regex validation.
    console.log(password, "PASSWORD")
    User.findOne({
        resetPasswordToken: req.params.token,
    }).then(user => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else if (user != null) {
      //  console.log(user, 'user exists in db');

//WORKS UP UNTIL THIS POINT...

        //PW REGEX VALIDATION
        var pwValidate = /^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
        if (!password.match(pwValidate)) {
          return res
            .status(400)
            .json({
              msg:
                "Password must be at least 8 characters, have a capital, and have a special character",
            });
        }

        //hash the password
        Bcrypt.hash(req.body.password, 12).then((hashedpassword) => {
          console.log(hashedpassword, 'HASHED')
          console.log(user, "THIS IS USER")
          user.update({
             password: hashedpassword,
             passwordConfirm: hashedpassword,
             resetPasswordToken: null,
             resetPasswordExpires: null,
           })
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          });
        })
      } else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    });
  });


module.exports = router;

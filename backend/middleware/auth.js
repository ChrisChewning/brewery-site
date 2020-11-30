const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

require('dotenv').config(); //env variables can be in the dotenv file.

//middleware fns call next to go to next middleware
//function auth(req, res, next) {
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

//Check for token
if (!token) res.status(401).json({ msg: 'Authorization denied'})  //401 means unauthorized

//Verify token
try {
  const decoded = jwt.verify(token, secret); //pass in token. take jwt secret.  .get

  req.username = decoded; //Add user from payload
    next();
} catch(e) {
  res.status(400).json({ msg: 'Token is not valid'})
}


}

module.exports = auth;

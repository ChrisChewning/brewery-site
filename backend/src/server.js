import express from 'express';
//import bodyParser from 'body-parser'; don't need b.c of the new version of express.
//import { MongoClient } from 'mongodb'; //can connect to local db
const mongoose = require('mongoose'); //helps us connect to mongodb database
const config = require('config');

require('dotenv').config(); //env variables can be in the dotenv file.


const app = express();
const port = process.env.port || 8000;
const cors = require('cors');


//middleware
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
const jwt = process.env.JWT_SECRET;
console.log(uri);
//mongoose.connect(uri, { useNewUrlParser: true; useCreateIndex: true; }); //FLAGS: mongodb nodejs driver parses the connection string. useCreateIndex: mongodb deprecating ensure index fn

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });
const client = mongoose.connection;

client.once('open', () => {
  console.log("MongoDB is connected.")
})



//require the files and use them.
const usersRouter = require('../routes/users');
const postsRouter = require('../routes/posts');
const commentsRouter = require('../routes/comments');
const breweriesRouter = require('../routes/breweries');

app.use('/users', usersRouter); // means /users is the base route
app.use('/api/community', commentsRouter);
app.use('/api/brewery', breweriesRouter);
app.use('/api/community/posts', postsRouter);

app.listen(port, () => console.log('Listening on port 8000'));  //argument to specify which port to listen on. then a callback

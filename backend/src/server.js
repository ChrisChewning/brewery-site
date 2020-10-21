import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'; //can connect to local db

const app = express();
app.use(bodyParser.json());

//GET COMMENTS AND UPVOTES
app.get('/api/community/:name', async (req, res) => {
  try {
  const postName = req.params.name; //postName gets name from url paramters

  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
  const db = client.db('brewery-db');

  const postInfo = await db.collection('community').findOne({name: postName})  //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(postInfo); //instead of send, use json since we are working with json.

  client.close();
} catch (error) {
  res.status(500).json({ message: 'Error connecting to db', error })
}
})

//UPVOTE ENDPOINT
app.post('/api/community/:name/upvotes', (req, res) => {
  const postName = req.params.name;
  postDetails[postName].upvotes += 1
res.status(200).send(`${postName} now has ${postDetails[postName].upvotes} upvotes!`)
})

//COMMENT ENDPOINT
app.post('/api/community/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const postName = req.params.name;

  //add data from body to the fake db.
  postDetails[postName].comments.push({ username, text });  //push a new object w the username and text from the request body.
  res.status(200).send(postDetails[postName]);

})


app.listen(8000, () => console.log('Listening on port 8000'));  //argument to specify which port to listen on. then a callback
//that gets called once it connects.

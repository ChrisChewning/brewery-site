import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'; //can connect to local db

const app = express();
app.use(bodyParser.json());

//db setup and tear-down fn
//1. connect and parse (const client)  2. set the db name as a variable. 3. call the operations variable, which is a fn  4. close the connection 5. catch the errors
//note: connecting to the db is asynchronous so we use async/await
const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
    const db = client.db('brewery-db');

    await operations(db); //calls it from fn
    client.close();
  } catch (error) {
  res.status(500).json({ message: 'Error connecting to the db', error})
  }
};


//GET COMMENTS
app.get('/api/community/:name', async (req, res) => {
  withDB(async (db) => { //wrapper fn
    const postName = req.params.name; //postName gets name from url paramters
    const postInfo = await db.collection('community').findOne({name: postName})
    res.status(200).json(postInfo);
  }, res); //pass the response as an argument
  })


//UPVOTE ENDPOINT
app.post('/api/community/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    const postName = req.params.name;
    const postDetails = await db.collection('community').findOne({ name: postName});

  await db.collection('community').updateOne({ name: postName }, {
  '$set': { //mongodb syntax. 2nd arg
    upvotes: postDetails.upvotes + 1,
    },
  });
  //get updated version
  const updatedPostDetails = await db.collection('community').findOne({ name: postName});
  res.status(200).json(postDetails)
}, res)
})

//COMMENT ENDPOINT
app.post('/api/community/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const postName = req.params.name;

  withDB(async (db) => {
    const postDetails = await db.collection('community').findOne({ name: postName });
    await db.collection('community').updateOne({ name: postName }, {
    '$set': {
      comments: postDetails.comments.concat({ username, text }), //add to array.
    },
  });
   const updatedPostDetails = await db.collection('community').findOne({ name: postName })

   res.status(200).json(updatedPostDetails);
 }, res);
})


app.listen(8000, () => console.log('Listening on port 8000'));  //argument to specify which port to listen on. then a callback
//that gets called once it connects.

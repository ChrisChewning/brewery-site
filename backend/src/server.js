import express from 'express';
import bodyParser from 'body-parser';

//name fields of community posts.
const postDetails = {
  'brewery-meetup': {
    upvotes: 0,
    comments: [],
  },
  'brewery-tour': {
    upvotes: 0,
    comments: [],
  },
}


const app = express();
app.use(bodyParser.json());

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

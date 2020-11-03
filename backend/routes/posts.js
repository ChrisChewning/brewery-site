const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})


router.route('/add-post').post((req, res) => {
  //Set variables
  const name = req.body.name; //how to get logged in username?  //destructure to const { name, comment } = req.body;  ?
  const content = req.body.content;
  const votes = 0;

  const newPost = new Post({
    name,
    content,
    votes
  });

  newPost.save()
  .then(() => res.json('Post added'))
  .catch(err => res.status(400).json('Error' + err));
});



module.exports = router;

const router = require('express').Router();
let Comment = require('../models/comment.model');
let Post = require('../models/post.model');

//GET COMMENTS AND UPVOTES
router.route('/brewery-meetup').get(async (req, res) => {
  try {
//Comment.findOne({name: postName})

  const postName = req.params.name; //postName gets name from url paramters
  const postInfo = await Comment.findOne({name: postName})  //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(postInfo); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ message: 'Error', error })
}
})



//SEE EVERY COMMENT (working)
router.route('/').get((req, res) => {
  Comment.find()
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})


router.route('/brewery-meetup/test').get((req, res) => {
  Comment.find()
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})

router.route('/brewery-meetup/add-comment/').post((req, res) => {
  //Set variables
  const name = req.body.name; //how to get logged in username?  //destructure to const { name, comment } = req.body;  ?
  const comment = req.body.comment;
  const postName = 'brewery-meetup'; //will be req.params.name
  const postDetails = Post.findOne({ name: postName })  //Posts name is brewery-meetup in the db.

  const updatePost = Post.updateOne({ name: postName }, {
    '$set': {
      comment: postDetails.comment.concat({ name, comment }), //add to array.
    },
  }); //find the name from postName ?


//return updated comment Array
const updatedPostDetails = Comment.findOne({ name: postName })
  newComment.updateOne({name: postName}, {
    '$set': {
      comment: postDetails.comment.concat({ username, text }), //add to array.
    },
  })
  .then(() => res.json('Comment added'))
  .catch(err => res.status(400).json('Error ' +err));
});

///working one before







router.route('/:name/upvotes').post((req, res) => {
  const postName = req.params.name; //postName gets name from url paramters
  Comment.findOne({name: postName}) //change to Post
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})


router.route('/').get((req, res) => {
  Comment.find()
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})


//UPVOTE ENDPOINT	//UPVOTE ENDPOINT
router.route('/:name/upvotes').post((req, res) => {
  const postName = req.params.name;
})

module.exports = router;

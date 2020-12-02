const router = require('express').Router();
let Comment = require('../models/comment.model');
let Post = require('../models/post.model');
const auth = require('../middleware/auth');

//GET COMMENTS
router.route('/brewery-meetup').get(async (req, res) => {
  try {
//Comment.findOne({name: postName})

  const postName = req.params.name; //postName gets name from url paramters
  const postInfo = await Post.comments.find()  //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(postInfo); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ 'message': 'Error', error })
}
})


//GET ALL POSTS, COMMENTS AND UPVOTES
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




//UPDATE A POST WITH A COMMENT
router.route('/:id/add-comment').post(auth, async (req, res) => {
const {username, votes, comment } = req.body;
try {
const postId = req.params.id; //set the req id to a variable
  const saveCommentToPost = await Post.findById({_id: postId})//.populate(User)//  //.populate(User) later
    const post = await Post.updateOne({ _id : postId }, { //update the id that matches req.params.id (ex: brewery-meetup id)
    '$set': {
      comments: saveCommentToPost.comments.concat({ username, votes, comment })
    },
  })
  res.send(post)
}catch(err){
  res.status(400).send(err);
}
})



router.route('/:name/upvotes').post((req, res) => {
  const postName = req.params.name; //postName gets name from url paramters
  Comment.findOne({name: postName}) //change to Post
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json('Error ' + err))
})



//UPVOTE ENDPOINT
router.route('/:name/upvotes').post((req, res) => {
  const postName = req.params.name;
})


module.exports = router;

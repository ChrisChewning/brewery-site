const router = require('express').Router();
let MyBeers = require('../models/mybeers.model');


//GET COMMENTS
router.route('/').post(async (req, res) => {
  const {brewery, beer, rating, notes} = req.body

  const newBeer = new MyBeers({
    brewery,
    beer,
    rating,
    notes
  });
  newBeer.save()
  .then(() => res.json({success: true, message: "new beer saved"}))
  .catch(err => res.status(400).json('Error ' + err))
  });



//GET ALL POSTS, COMMENTS AND UPVOTES
//SEE EVERY COMMENT (working)
// router.route('/').get((req, res) => {
//   Comment.find()
//   .then(comments => res.json(comments))
//   .catch(err => res.status(400).json('Error ' + err))
// })
//





//UPDATE A POST WITH A COMMENT
// router.route('/:id/add-comment').post(auth, async (req, res) => {
// const {username, votes, comment } = req.body;
// try {
// const postId = req.params.id; //set the req id to a variable
//   const saveCommentToPost = await Post.findById({_id: postId})//.populate(User)//  //.populate(User) later
//     const post = await Post.updateOne({ _id : postId }, { //update the id that matches req.params.id (ex: brewery-meetup id)
//     '$set': {
//       comments: saveCommentToPost.comments.concat({ username, votes, comment })
//     },
//   })
//   res.send(post)
// }catch(err){
//   res.status(400).send(err);
// }
// })





module.exports = router;

const router = require('express').Router();
let Post = require('../models/post.model');

///api/community/posts
//GET ALL POSTS


router.route('').get((req, res) => {
  Post.find()
  .then(posts => res.json(posts))
  .catch(err => res.status(400).json('Error ' + err))
})

//GET COMMENTS PER POST
router.route('posts/:id').get((req, res) => {
  Post.findById(req.params.id)
  .then(posts => res.json(posts))
  .catch(err => res.status(400).json('Error ' + err))
})

//ADD POST
router.route('/add-post').post((req, res) => {
  //Set variables
  const username = req.body.username;
  const name = req.body.name; //how to get logged in username?  //destructure to const { name, comment } = req.body;  ?
  const content = req.body.content;
  const votes = 0;

  const newPost = new Post({
    username,
    name,
    content,
    votes
  });

  newPost.save()
  .then(() => res.json('Post added'))
  .catch(err => res.status(400).json('Error' + err));
});

//UPDATE POST
router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    post.votes = req.body.votes;
    post.username = req.body.username;
    post.content = req.body.content;

    post.save()
    .then(() => res.json('Post updated'))
    .catch(err => res.status(400).json('Error: ' + err))
  })
  .catch(err => res.status(400).json('Error: ' + err))
})


//DELETE POST
router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then(() => res.json('Post deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  })

//UPVOTE POST
router.route('/:name/upvote').post(async (req, res) => {
          const postName = req.params.name;
          const postInfo = await Post.findOne({ name: postName });
          await Post.updateOne({ name: postName }, {
              '$set': {
                  votes: postInfo.votes + 1,
              },
          });
          const updatedPostInfo = await Post.findOne({ name: postName });
          res.status(200).json(updatedPostInfo.votes);
      });

//DOWNVOTE POST
router.route('/:name/downvote').post(async (req, res) => {
              const postName = req.params.name;
              const postInfo = await Post.findOne({ name: postName });
              await Post.updateOne({ name: postName }, {
                  '$set': {
                      votes: postInfo.votes - 1,
                  },
              });
              const updatedPostInfo = await Post.findOne({ name: postName });

              res.status(200).json(updatedPostInfo.votes);
          });




module.exports = router;

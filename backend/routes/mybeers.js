const router = require('express').Router();
let User = require('../models/user.model');
let MyBeers = require('../models/mybeers.model');
const ObjectID = require('mongodb').ObjectID;


//POST TO MYBEERS
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



//GET MYBEERS
router.route('/:id/mybeers').get(async (req, res) => {
  try {
  const userId = req.params.id;
  const beersInfo = await User.findById({_id: userId}) //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(beersInfo.beers); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ 'message': 'Error', error })
}
})




//DELETE MYBEERS
router.route('/delete-beer').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then(() => res.json('Post deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  })

//POST TO FUTURE BEERS
router.route('/:id/add-future-beer').post(async (req, res) => {
//const id = { _id: new ObjectID()}
const {brewery, beer, rating, notes } = req.body;
try {
const userId = req.params.id; //set the req id to a variable
  const saveBeerToUser = await User.findById({_id: userId})
    const addBeer = await User.updateOne({_id: userId }, {
      '$set': {
      future_beers: saveBeerToUser.future_beers.concat({ _id: new ObjectID(), brewery, beer, rating, notes })
    },
  })
  res.send(addBeer)
 }catch(err){
  res.status(400).send(err);
}
})


//GET FUTUREBEERS
router.route('/:id/my-future-beers').get(async (req, res) => {
  try {
  const userId = req.params.id;
  const beersInfo = await User.findById({_id: userId}) //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ 'message': 'Error', error })
}
})


// User.findOne({name: 'Bob'}, function (err, user) {
//     user.photos.id(photo._id);
// });

// router.route('/:id/my-future-beersss').get(async (req, res) => {
//   try {
//   const userId = req.params.id;
//   const beersInfo = await User.findById({userId}, function (error, future_beer){
//     var subBeer = future_beers.id();
//   }) //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
//   res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
// } catch (error) {
//   res.status(500).json({ 'message': 'Error', error })
// }
// })
//
// BlogPost.findById(req.params.postId, function (err, post) {
//     var subDoc = post.comments.id(req.params.commentId);
//     subDoc = req.body;
//     post.save(function (err) {
//         if (err) return res.status(500).send(err);
//         res.send(post);
//     });
// });


router.route('/:id/my-future-beers').get(async (req, res) => {
  try {
  const userId = req.params.id;
  const beersInfo = await User.findById({_id: userId}) //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ 'message': 'Error', error })
}
})


// Collection.findOneAndUpdate(
//     { _id: yourCollectionId },
//     { $pull: { subdocumentsArray: { _id: subdocumentId} } },
//     { new: true },
//user  5fd1b2af334a5f1231c7967e
//future-beers   5fd668d512e1af64342298fb
router.route('/:id/my-future-beersss').delete(async (req, res) => {
  try {
  const userId = req.params.id;
  const beerId = ObjectID('5fd6e0fe81fd370de56b9ea2') //can't be string representation
  const beersInfo = await User.findOneAndUpdate({_id: userId }, { //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
 $pull: {future_beers: {_id: beerId }}}, { new: true})
  res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
  console.log(beersInfo.future_beers)
} catch (error) {
  if (error) { console.log(error)}
//  res.status(500).json({ 'message': 'Error', error })
}
})


// Collection.findOneAndUpdate(
//     { _id: yourCollectionId },
//     { $pull: { subdocumentsArray: { _id: subdocumentId} } },
//     { new: true },
//     function(err) {
//         if (err) { console.log(err) }
//     }
// )
//{$pull: {'comments': {'id': <id>}}} )

//db.games.find( { "teams.players.player": ObjectId("2") } )


// router.route('/:id/my-future-beerss').get(async (req, res) => {
//   try {
//   const userId = req.params.id;
//   const beersInfo = await User.findById({_id: userId}), function (error, user) { //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
//     future_beers.id()
//   }
//
//   res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
// } catch (error) {
//   res.status(500).json({ 'message': 'Error', error })
// }
// })

//https://stackoverflow.com/questions/21142524/mongodb-mongoose-how-to-find-subdocument-in-found-document
//DELETE A SPECIFIC FUTUREBEER
// router.route('/:id/my-future-beers/delete').get(async (req, res) => {
//   try {
//   const userId = req.params.id;
//   const beersInfo = await User.Update({_id: userId},
//     future_beers.id("5fd668d512e1af64342298fb")
//   //findByIdAndDelete subdocument id
//   // {
//   //   $pull: {
//   //     future_beers.id: "5fd668d512e1af64342298fb"
//   //   }
//   // })
//    //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
//  )res.status(200).json(beersInfo.future_beers) //instead of send, use json since we are working with json.
// } catch (error) {
//   res.status(500).json({ 'message': 'Error', error })
// }
// })

// User.findOne({name: 'Bob'}, function (err, user) {
//     user.photos.id(photo._id);
// });
//User({'_id': ObjectId("5150a1199fac0e6910000002")}, {$pull: {id: 23}});

//EDIT FUTUREBEERS


//DELETE FUTUREBEERS




module.exports = router;

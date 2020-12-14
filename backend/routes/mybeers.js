const router = require('express').Router();
let User = require('../models/user.model');
let MyBeers = require('../models/mybeers.model');
const ObjectID = require('mongodb').ObjectID;


//POST TO MYBEERS
  router.route('/:id/add-beer').post(async (req, res) => {
  const {brewery, beer, rating, notes } = req.body;
  try {
  const userId = req.params.id; //set the req id to a variable
    const saveBeerToUser = await User.findById({_id: userId})
      const addBeer = await User.updateOne({_id: userId }, {
        '$set': {
        beers: saveBeerToUser.beers.concat({ _id: new ObjectID(), brewery, beer, rating, notes })
      },
    })
    res.send(addBeer)
   }catch(err){
    res.status(400).send(err);
  }
  })



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
router.route('/:id/my-beers/delete/:beerId').delete(async (req, res) => {
  try {
  const userId = req.params.id;
  const beerId = ObjectID(req.params.beerId) //can't be string representation
  const beersInfo = await User.findOneAndUpdate({_id: userId }, { //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
 $pull: {beers: {_id: beerId }}}, { new: true})
  res.status(200).json(beersInfo.beers); //instead of send, use json since we are working with json.
  console.log(beersInfo.beers)
} catch (error) {
  if (error) { console.log(error)}
//  res.status(500).json({ 'message': 'Error', error })
}
})



///
//FUTURE BEERS SECTION
///



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



//GET FUTURE BEERS
router.route('/:id/my-future-beers').get(async (req, res) => {
  try {
  const userId = req.params.id;
  const beersInfo = await User.findById({_id: userId}) //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
  res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
} catch (error) {
  res.status(500).json({ 'message': 'Error', error })
}
})


//DELETE FUTURE BEERS
router.route('/:id/my-future-beers/delete/:beerId').delete(async (req, res) => {
  try {
  const userId = req.params.id;
  const beerId = ObjectID(req.params.beerId) //can't be string representation
  const beersInfo = await User.findOneAndUpdate({_id: userId }, { //matches name url paramter we passed. Mongo returns client object we can use to send queries to the db
 $pull: {future_beers: {_id: beerId }}}, { new: true})
  res.status(200).json(beersInfo.future_beers); //instead of send, use json since we are working with json.
  console.log(beersInfo.future_beers)
} catch (error) {
  if (error) { console.log(error)}
//  res.status(500).json({ 'message': 'Error', error })
}
})

//EDIT FUTUREBEERS






module.exports = router;

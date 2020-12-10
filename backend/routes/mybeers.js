const router = require('express').Router();
let User = require('../models/user.model');
let MyBeers = require('../models/mybeers.model');


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

//EDIT MYBEERS


//DELETE MYBEERS


//POST TO FUTURE BEERS
router.route('/:id/add-future-beer').post(async (req, res) => {
const {brewery, beer, rating, notes } = req.body;
try {
const userId = req.params.id; //set the req id to a variable
  const saveBeerToUser = await User.findById({_id: userId})
    const addBeer = await User.updateOne({_id: userId }, {
      '$set': {
      future_beers: saveBeerToUser.future_beers.concat({ brewery, beer, rating, notes })
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

//EDIT FUTUREBEERS


//DELETE FUTUREBEERS




module.exports = router;

const router = require('express').Router();
let Breweries = require('../models/brewery.model');

router.route('/breweries').get((req, res) => {
  Breweries.find()
  .then(breweries => res.json(breweries))
  .catch(err => res.status(400).json('Error ' + err))
})




router.route('/add-brewery').post((req, res) => {
    //Set variables
    const {name, beers, image, location, website, hours, content} = req.body


  const newBrewery = new Breweries({
    name,
    beers,
    image,
    location,
    website,
    hours,
    content
  });

  newBrewery.save()
  .then(() => res.json('Brewery added'))
  .catch(err => res.status(400).json('Error' + err));
});



module.exports = router;

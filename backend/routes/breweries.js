const router = require("express").Router();
let Breweries = require("../models/brewery.model");

//GET ALL BREWERIES (Breweries list Page)
router.route("/breweries").get((req, res) => {
  Breweries.find()
    .then((breweries) => res.json(breweries))
    .catch((err) => res.status(400).json("Error " + err));
});


//GET BREWERIES WITH PATIOS
router.route("/breweries/patios").get((req, res) => {
  Breweries.find({patio:true})
    .then((breweries) => res.json(breweries))
    .catch((err) => res.status(400).json("Error " + err));
});


//GET BREWERIES WITH PATIOS
router.route("/breweries/big_indoors").get((req, res) => {
  Breweries.find({big_indoors:true})
    .then((breweries) => res.json(breweries))
    .catch((err) => res.status(400).json("Error " + err));
});

//GET SPECIFIC BREWERY
router.route("/breweries/:name").get((req, res) => {
  Breweries.findOne({ name: req.params.name })
    .then((breweries) => res.json(breweries))
    .catch((err) => res.status(400).json("Error " + err));
});


//ADD BREWERY
router.route("/add-brewery").post((req, res) => {
  //Set variables
  const { name, beers, image, location_image, patio, big_indoors, website, hours, content } = req.body;

  const newBrewery = new Breweries({
    name,
    beers,
    image,
    location: {
      type: 'Point', coordinates: req.body.location.coordinates
    },
    location_image,
    patio,
    big_indoors,
    website,
    hours,
    content,
  });
  newBrewery
    .save()
    .then(() => res.json("Brewery added"))
    .catch((err) => res.status(400).json("Error" + err));
});

//BREWERY DISTANCE
router.route("/:name/distance").get((req, res) =>{
  const {name} = req.params.name;
  const { lng, lat } = req.query;


    Breweries.find(
      {
      location: //this is the "point" element of the document
    {
      $near:
        {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 220000
        }
    }
}
)
.then(breweries => res.json({ breweries })) // respond to the client
.catch(err => console.log(err)) // do something with the error
})

module.exports = router;

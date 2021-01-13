const router = require("express").Router();
let Events = require("../models/events.model");

//GET EVENTS
router.route("/").get((req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error " + err));
});



//UPVOTE ENDPOINT
router.route("/add-event").post((req, res) => {
  const { title, date, event, location, url } = req.body;
  const votes = 0;

  const newEvent = new Events({
    title,
    date,
    event,
    location,
    url
  });

  newEvent
    .save()
    .then(() => res.json("Event added"))
    .catch((err) => res.status(400).json("Error" + err));
});


module.exports = router;

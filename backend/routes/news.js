const router = require("express").Router();
let News = require("../models/news.model");


//GET NEWS
router.route("/").get((req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json("Error " + err));
});



//UPVOTE ENDPOINT
router.route("/add-news").post((req, res) => {
  const { title, content } = req.body;

  const newNews = new News({
    title,
    content
  });

  newNews
    .save()
    .then(() => res.json("News added"))
    .catch((err) => res.status(400).json("Error" + err));
});


module.exports = router;

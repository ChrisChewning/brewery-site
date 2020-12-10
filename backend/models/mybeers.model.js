const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  brewery: {
    type: String,
    required: true,
  },
  beer: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  }
});

const MyBeers = mongoose.model("MyBeers", commentSchema);

module.exports = MyBeers;

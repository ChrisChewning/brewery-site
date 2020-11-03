const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
  }
});

const Post = mongoose.model("Post", postSchema); //arg 1 could be anything

module.exports = Post;

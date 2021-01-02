const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
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
  image: {
    data: Buffer,
    type: String,
  },
  comments: {
    type: Array,
  }
},
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema); //arg 1 could be anything

module.exports = Post;

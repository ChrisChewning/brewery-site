const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  votes: {
    type: String, //may not need this unless you want to have upvotes and downvotes for comments.
  },
  comments: {  //replies on this comment will go here. you'll need to push into this.
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    type: String,
  }
},
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

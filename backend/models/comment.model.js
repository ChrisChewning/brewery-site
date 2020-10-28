const mongoose = require('monoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: {
    type: String
},
upvotes: {
  type: String
}
})

const Comment = mongoose.model('Comment', commentSchema); //arg 1 could be anything

module.exports = Comment;

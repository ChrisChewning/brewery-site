import React, { Component } from "react";
import AddComment from "../components/AddComments";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Card from "@material-ui/core/Card";
import Moment from "react-moment";

class CommunityPost extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: "",
      post: [],
      content: "",
      votes: "",
      comments: [],
      commentsLength: 0,
      id: this.props.match.params.id,
    };

    this.handler = this.handler.bind(this)
  }

  handler() {
   this.setState({
     commentsLength: this.state.commentsLength + 1
   })
   const id = this.props.match.params.id;
   axios.get(`http://localhost:8000/api/community/posts/`).then((res) => {
     const posts = res.data.map((post, key) => {
       if (post._id == id) {
         this.setState({ name: post.name });
         this.setState({ content: post.content });
         this.setState({ votes: post.votes });
         this.setState({ comments: post.comments });
         this.setState({ commentsLength: post.comments.length})
       }
     });
   });
 }

  componentDidMount() {
    this.handler();
  }

  upvotePost = async () => {
    const id = this.props.match.params.id;

    const result = await fetch(
      `http://localhost:3000/api/community/posts/${id}/upvote`,
      {
        method: "post",
      }
    );
    const newTotal = await result.json();
    this.setState({ votes: newTotal });
  };

  downvotePost = async () => {
    const id = this.props.match.params.id;
    const result = await fetch(
      `http://localhost:3000/api/community/posts/${id}/downvote`,
      {
        method: "post",
      }
    );
    const newTotal = await result.json();
    this.setState({ votes: newTotal });
  };

  render() {
    console.log(this.state.newComment, ' new comment state parent')
    console.log(this.state.commentsLength, ' commentsLength test')
    console.log(this.props, ' THIS PROPS ')
    console.log(this.state.user, ' this is props user')

    const id = this.props.match.params.id;
    const comments = this.state.comments;
    console.log(id, "line 71"); //IF ID IS NOT NULL SHOW ADDCOMMENT. IF IT IS NULL SHOW A MESSAGE
    return (
      <>
        <div className="post-parent">
          <h2 className="post-title">{this.state.name}</h2>
          <div className="post-upvotes-content">
            <ThumbUpIcon onClick={this.upvotePost} />
            <p> {this.state.votes} </p>
            <ThumbDownIcon onClick={this.downvotePost} />
          </div>
          <p className="post-content">{this.state.content}</p>
        </div>

        { this.props.user.username ? <AddComment key={this.state.commentsLength}  id={this.state.id} comments={this.state.comments} username={this.props.user.username} newComment={this.handler}/>
      : <p>You  must be logged in to post a comment </p> }

      //NEED A PARENT DIV HERE.
      <div clasName="comments-parent">
        <p>Comments ({this.state.commentsLength})</p>
    {this.state.comments.map((comment, i) => (
          <p key={i}>
            <Card>
              {comment.username} |{" "}
              <Moment format="MMMM Do YYYY, h:mm:ss a">
                <i>{comment.todayDate.toString()}</i>
              </Moment>
              <br></br>
              <br></br> {comment.comment}
            </Card>
          </p>
        ))}
          </div>
      </>
    );
  }
}

export default withRouter(CommunityPost);

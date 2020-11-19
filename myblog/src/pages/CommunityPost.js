import React, { useState, useEffect, Component } from "react";
import { Redirect } from "react-router-dom";
import UpvotesSection from "../components/UpvotesSection";
import CommentsList from "../components/CommentsList";
import AddComments from "../components/AddComments";
import AddComment from "../components/AddComments";

import axios from "axios";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

class CommunityPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      post: [],
      content: "",
      votes: "",
      comments: [],
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    console.log(`http://localhost:8000/api/community/posts/${id}`);
    console.log(id);
    axios.get(`http://localhost:8000/api/community/posts/`).then((res) => {
      const post = res.data;

      const posts = res.data.map((post, key) => {
        if (post._id == id) {
          this.setState({ name: post.name });
          this.setState({ content: post.content });
          this.setState({ votes: post.votes });
          this.setState({ comments: post.comments });
        }
      });
    });
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
    const id = this.props.match.params.id;
    const comments = this.state.comments;
    console.log(id, 'line 71')
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
        <AddComment id = {this.state.id} comments= {this.state.comments}/>
        <p>Comments</p>
        {this.state.comments.map((comment, i) => (
          <p key={i}>{comment.username} | <i>need time here</i> <br></br><br></br> {comment.comment}</p>
      )
     )}
      </>
    );
  }
}

export default CommunityPost;

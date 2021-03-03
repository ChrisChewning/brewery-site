import React, { Component } from "react";
import AddComment from "../components/AddComments";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Card from "@material-ui/core/Card";
import Moment from "react-moment";
import { convertFromRaw, EditorState } from 'draft-js';


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
  }

  handler = () => {
    this.setState({
      commentsLength: this.state.commentsLength + 1,
    });
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8000/api/community/posts/`).then((res) => {
      const posts = res.data.map((post, key) => {
        if (post._id === id) {
          this.setState({ name: post.name });
          this.setState({ content: post.content });
          this.setState({ votes: post.votes });
          this.setState({ comments: post.comments });
          this.setState({ commentsLength: post.comments.length });
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

    return (
      <>
      <div className="comment-page-parent">
        <Card className="comments-post-card">
          <div className="comment-item-parent">
          <div className="votes-parent">
            <ThumbUpIcon onClick={this.upvotePost} />
            <p> {this.state.votes} </p>
            <ThumbDownIcon onClick={this.downvotePost} />
          </div>
          <div className="post-comment-content-parent">
          <div className="post-title-parent">
          <h2 className="post-title">{this.state.name}</h2>
          </div>
          <div className="post-content-parent">
            <p className="post-content">{this.state.content}</p>
          </div>
        </div>
        </div>
      </Card>

        {this.props.user.username ? (
          <AddComment
            key={this.state.commentsLength}
            id={this.state.id}
            comments={this.state.comments}
            username={this.props.user.username}
            image={this.props.user.image}
            newComment={this.handler}
          />
        ) : (
          <p>You must be logged in to comment </p>
        )}

        <div className="comments-parent">
          <p>Comments ({this.state.commentsLength})</p>
          {this.state.comments.map((comment, i) => (
            <Card className="comments-comments-card">
              <p key={i}>
                <div className="comments-comments-parent">
                <div className="comment-img-parent">
                <img className="comment-img" src={comment.image} alt="user"/>
                <p className="comment-username">{comment.username}</p>
              </div>
              <div className="comment-date-parent">
                <i className="comment-date">
                  <Moment format="MMM D, YYYY h:mm a">
                    {comment.addDate}
                  </Moment>
                </i>
                  <p className="comment-text" dangerouslySetInnerHTML={{ __html: comment.comment}} />
                  </div>
                </div>
            </p>
            </Card>
          ))}
        </div>
      </div>
      </>
    );
  }
}

export default withRouter(CommunityPost);

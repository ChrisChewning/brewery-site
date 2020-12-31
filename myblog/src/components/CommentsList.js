import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CommentsList extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:8000/api/community/posts`).then((res) => {
      const comments = res.data;
      this.setState({ comments });
    });
  }

  render() {
    console.log(this.state.posts);
    return (
      <>
        {this.state.comments.map((post, key) => (
          <ul key={key}>
            <li key={key}>{post.name}</li>
            <br></br>
            <li>{post.content}</li>
            <li>{post.comments}</li>
            <Link
              className="brewery-list-item"
              key={key}
              to={`/community/${post.name}`}
            >
              <h3>{post.name}</h3>
            </Link>
          </ul>
        ))}
      </>
    ); //return
  }
}

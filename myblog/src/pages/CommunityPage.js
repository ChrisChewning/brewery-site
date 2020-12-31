import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

export default class Community extends React.Component {
  state = {
    posts: []
  }



componentDidMount() {
  axios.get(`http://localhost:8000/api/community/posts`)
  .then(res => {
    const posts = res.data;
    this.setState({ posts });
  })
}

render() {
  return (
      <>
      { this.state.posts.map((post, key) => (
        <Card className="card">
        <List className="post-list">
        <p>USERNAME IMAGE HERE</p>
        <div className="post-item-parent">
          <Link className="brewery-list-item"
            key={key}
            to= {`/community/posts/${post._id}`}
            >
          <h3>{post.name}</h3>
          <div className= "vertical-divider" />
      </Link>
        <div className="post-username-date">
          <ListItem className="username">{post.username} * {post.createdAt}</ListItem>
        </div>
        </div>
      <div className="post-comments-recent">
      <ListItem key={key} className="post-content">Comments: {post.comments.length}  </ListItem>
      <ListItem className="post-content">Most Recent: {post.updatedAt}</ListItem>
      </div>
  </List>

</Card>
  ))
}
</>
)

}
}

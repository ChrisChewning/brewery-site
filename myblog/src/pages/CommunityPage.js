import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
        <ul>
        <li key={post._id}>{post.name}</li>
        <br></br>
        <li>{post.content}</li>
        <Link className="brewery-list-item"
          key={key}
          to= {`/community/posts/${post._id}`}
          >
        <h3>{post.name}</h3>
    </Link>
  </ul>
  ))
}
</>
)

}
}

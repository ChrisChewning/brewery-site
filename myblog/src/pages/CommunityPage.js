import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import AddPosts from '../components/AddPosts';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Moment from 'react-moment';

class CommunityPage extends Component {
  constructor(props) {
    super(props);

  this.state = {
    posts: []
  }
}

handler = () => {
  axios.get(`http://localhost:8000/api/community/posts`)
  .then(res => {
    const posts = res.data;
    this.setState({ posts });
  })

}

componentDidMount() {
    this.handler();
}




render() {
console.log(this.state.posts)
console.log(this.props.user)



  return (
      <>
      {this.props.user.username ? (
        <AddPosts username={this.props.user.username} image={this.props.user.image} newPost={this.handler} posts={this.state.posts}/>
      ) : (
        <p>You must be logged in to post </p>
      )}

      { this.state.posts.map((post, key) => (
        <Card className="card">
        <List className="post-list">
        <img className="post-img" src={post.image} alt="username image for post"/>
        <div className="post-item-parent">
          <Link className="brewery-list-item"
            key={key}
            to= {`/community/posts/${post._id}`}
            >
          <h3 className="post-name">{post.name}</h3>
          <div className= "vertical-divider" />
      </Link>
          <ListItem className="username">{post.username} * <Moment format=" MMM D, YYYY">
             {post.createdAt}
          </Moment>
        </ListItem>
        </div>

      <div className="post-comments-parent">
      <ListItem key={key} className="post-content">Comments: {post.comments.length}  </ListItem>
      <ListItem className="post-content">Most Recent:   <Moment format="MMM D, YYYY h:mm a">
        {post.updatedAt}
      </Moment></ListItem>
      </div>
  </List>

</Card>
  ))
}
</>
)

}
}

export default CommunityPage;

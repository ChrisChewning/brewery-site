import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import AddPosts from '../components/AddPosts';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Moment from 'react-moment';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

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
  return (
      <>
      {this.props.user.username ? (
        <AddPosts username={this.props.user.username} image={this.props.user.image} newPost={this.handler} posts={this.state.posts}/>
      ) : (
        <p>You must be logged in to post </p>
      )}

      { this.state.posts.map((post, key) => (
        <Card className="card-post">
        <List className="post-list">
        <div className="post-item-parent">

          <div className="img-test">
        <img className="post-img" src={post.image} alt="username image for post"/>
        </div>
          <div className="post-parent-content">
        <div className="post-parent-title">
          <Link className="post-content"
            key={key}
            to= {`/community/posts/${post._id}`}
            >
          <h3 className="post-parent-img-comment">{post.name}</h3>
          </Link>
          <ListItem className="username" id="MultiListItem-root">
            <CreateOutlinedIcon id="create-id" />
            {post.username}
            <div className="date-posted-comment">
            Posted on <Moment format=" MMM D, YYYY">
             {post.createdAt}
          </Moment>
          </div>
        </ListItem>

      <ListItem id="MultiListItem-root" key={key} className="post-content">
        <ChatOutlinedIcon />
         {post.comments.length} Comments
      <div className="most-recent-comment"> Latest: <Moment format="MMM D, YYYY h:mm a">
        {post.updatedAt}
      </Moment>
    </div></ListItem>

</div>
  </div>


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

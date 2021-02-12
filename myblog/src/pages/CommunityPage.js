import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import AddPosts from '../components/AddPosts';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Moment from 'react-moment';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { convertFromRaw, Editor, EditorState, blocks } from 'draft-js';

class CommunityPage extends Component {
  constructor(props) {
    super(props);

  this.state = {
    posts: [],
    postsContent: '',
    editorState: EditorState.createEmpty(),
  }
}


//  convertFromRaw(JSON.parse({post.content}))
handler = () => {
  axios.get(`http://localhost:8000/api/community/posts`)
  .then(res => {
    const posts = res.data.map((item, key) => {
      console.log(item, "RES DATA") //OBJECT
        for (const [key, value] of Object.entries(item)){
        if (key == 'content'){
          //item[key] = 'CONTENT'
          //item[key] = EditorState.createEmpty()
          item[key] = EditorState.createWithContent( //convert from Editor State (raw)
          convertFromRaw(JSON.parse(item[key])))
          this.setState({editorState: item[key]})

          console.log(res.data)
        }
        this.setState({posts: res.data})
      }
})
})

// .then(convert => {  //set the the comment to EditorState.
//   const posts = this.state.posts.map((contentItem, key) => {
//     console.log(contentItem.content, ' posts map')
//     const converted = EditorState.createWithContent( //convert from Editor State (raw)
//     convertFromRaw(JSON.parse(contentItem.content)))
//     console.log(converted)
//     this.setState({ editorState: converted}) //set converted text to postsContent
//     console.log(this.state.editorState, 'EDITOR STATE')
//     //REPLACE this.state.posts.content, converted
//   })
//   //.then(change => {
//
//   //})
// })
  }


componentDidMount() {
    this.handler();
}




render() {
  console.log(this.state.editorState, 'editor state')
  const content = this.state.editorState.getCurrentContent()
  console.log(content, 'CONTENT') //this is in content state
  console.log(this.state.postsContent, 'POSTS CONTENT')
  console.log(this.state.posts, 'posts')


  return (

      <>

      <div className="post-parent">

      {!this.props.user || this.props.user.username === undefined ? (
        <p>You  must be logged in to post </p>
      ) : (
        <AddPosts username={this.props.user.username} image={this.props.user.image} newPost={this.handler} posts={this.state.posts}/>
      )}

      { this.state.posts.map((post, key) => (
        <Card className="card-post">
        <List className="post-list">
        <div className="post-item-parent">
          <div className="post-img-parent">
        <img className="post-img" src={post.image} alt="username for post"/>
        </div>
            <div className="post-parent-title-content">
            <Link className="post-content"
              key={key}
              to= {`/community/posts/${post._id}`}
              >
            <h3 className="post-parent-img-comment">{post.name}</h3>
            </Link>



          </div>
          <div className="post-parent-detail-container">
        <div className="post-parent-details">
          <ListItem className="" id="MultiListItem-root">
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
</div>
</>
)

}
}

export default CommunityPage;

import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import UpvotesSection from '../components/UpvotesSection';
import CommentsList from '../components/CommentsList';
import AddComments from '../components/AddComments';
import axios from 'axios';


//const CommunityPost = ({ match }) => {
export default class CommunityPost extends React.Component {

  state = {
    post : [],
    content : '',
    votes : '',
    comments : [],
  }

componentDidMount() {
  const id = this.props.match.params.id;
  console.log(id)
  axios.get(`http://localhost:8000/api/community/posts/`)
  .then(res => {
    const post = res.data;

    const posts = res.data.map((post, key) => {
      if (post._id == id){
        this.setState({content: post.content})
        this.setState({votes: post.votes})
        this.setState({comments: post.comments})
      } 
    });

  console.log(this.state.content, '< --- post content')
  console.log(this.state.votes, '<--- post votes')
  console.log(this.state.comments, '<--- post comments')
  })

}
render() {
  return (
    <h2>hi</h2>
  )
}


}

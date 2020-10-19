import React from 'react';
import posts from './community-content';
import {Redirect} from 'react-router-dom';

const CommunityPost = ({ match }) => {
  console.log(posts)
  const name = match.params.name;
  const post = posts.find(post => post.name === name); //equal to name property from url parameter.

  if (!post) return <Redirect to ="/community" />

  return (
  <>
  <div className="post-parent">
<h2 className="post-title">{post.title}</h2>
<p>{post.content}</p>
</div>
  </>
);
}


export default CommunityPost;

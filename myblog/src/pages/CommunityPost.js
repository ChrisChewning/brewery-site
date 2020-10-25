import React, { useState, useEffect } from 'react';
import posts from './community-content';
import {Redirect} from 'react-router-dom';
import UpvotesSection from '../components/UpvotesSection';
import CommentsList from '../components/CommentsList';
import AddComments from '../components/AddComments';

const CommunityPost = ({ match }) => {
  const name = match.params.name;
  const post = posts.find(post => post.name === name); //equal to name property from url parameter.

  //react hooks   useState, useEffect
  //postInfo will be populated from server. setPostInfo will change value. Arg to useState is the initial value before we change state.
  const [postInfo, setPostInfo] = useState({ upvotes: 0, comments: [] });

  //req to backend to load postInfo. useEffect allows us to complete side effects of the component like fetching data and settting state.
  //useEffect runs when the component first mounts and whenever it updates.
  useEffect(() => { ///anonymous fn whenever component is loaded
    const fetchData = async () => {
      const result = await fetch(`/api/community/${name}`)
      const body = await result.json();  //will contain the post info
      setPostInfo(body); ///call setPostInfo, which has the state for upvotes and comments.
    }
    fetchData();
  }, [name]) //arry of values useEffect should watch. whenever name changes, it'll get called.

  if (!post) return <Redirect to ="/community" />


console.log(postInfo.upvotes)
  return (
  <>
  <div className="post-parent">
<h2 className="post-title">{post.title}</h2>
<div className="post-upvotes-content">
<UpvotesSection postName={name} upvotes={postInfo.upvotes} setPostInfo={setPostInfo} />
<p className="post-content">{post.content}</p>
</div>
</div>
<AddComments postName={name} setPostInfo={setPostInfo} />
<CommentsList comments={postInfo.comments} />

  </>
);
}


export default CommunityPost;


//setPostInfo is the hook

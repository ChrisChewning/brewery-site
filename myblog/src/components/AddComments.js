import React, { useState,  } from "react";
import { useParams } from "react-router-dom";
import { FormControl } from '@material-ui/core';
import CommunityPost from '../pages/CommunityPost';

const AddComments = ({ id, comments, username }) => { //id is coming from communitypost. setpostinfo from ?
  //const username = "Chris"; //set user's username here.
  const [commentText, setCommentText] = useState("");
  //const [postInfo, setPostInfo] = useState({ comments: [] });

console.log(comments, 'this is comments')
  const AddComment = async () => {
    const result = await fetch(`http://localhost:8000/api/community/${id}/add-comment`, { //options object for method, body, and headers.
      method: "post",
      body: JSON.stringify({ username, comment: commentText }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
      headers: { //when sending post req's w a json body to the server, we need to include a header.
        "Content-Type": "application/json", //Content-Type is case-sensitive. This tells the server what data we're passing along.
      },
    });
    //update UI
    const body = await result.json(); //get body of response to update UI
    console.log(body, ' this is body')
    const emptyComment = "";
  //promise that keeps repeating:  setCommentText(AddComment);
  //never ends AddComment()
  };

  console.log(username, " ADD COMMENT username")
  console.log(commentText)
  return (
    <div id="add-comment">
      <h3>Add a Comment</h3>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
                </label>
      <button onClick={() => AddComment()}>Add Comment</button>
    </div>
  );
};

export default AddComments;

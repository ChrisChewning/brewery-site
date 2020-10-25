import React, { useState } from "react";
import { FormControl } from '@material-ui/core';

const AddComments = ({ postName, setPostInfo }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  //send data to the server

  const addComment = async () => {
    const result = await fetch(`/api/community/${postName}/add-comment`, {
      method: "post",
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //update UI
    const body = await result.json(); //get body or response to update UI
    setPostInfo(body);
  };

  return (
    <div id="add-comment">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        />
      </label>
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddComments;

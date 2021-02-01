import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';

const AddComments = ({ id, comments, username, image, newComment }) => {
  const [commentText, setCommentText] = useState(""); //form comment
  const [showCommentHeading, setCommentHeading] = useState(false);

  const AddComment = async () => {
    await fetch(
      `http://localhost:8000/api/community/${id}/add-comment`,
      {
        //options object for method, body, and headers.
        method: "post",
        body: JSON.stringify({ username, comment: commentText, image: "/" + image }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
        headers: { //when sending post req's w a json body to the server, we need to include a header.
          "Content-Type": "application/json", //Content-Type is case-sensitive. This tells the server what data we're passing along.
        },
      }
    );
    //update UI
    setCommentText(""); //updates form but doesn't re-render the page.
    newComment(); //calls this from the parent component
    setCommentHeading(false);
  };

  const addCommentTitle = () => {
    console.log('clicked')
    setCommentHeading(true);
  }

  return (
    <>
      <h3 onClick={() => addCommentTitle()} className="post-comment-label">Add a Comment</h3>
    {showCommentHeading ? (
    <Card className="add-post-parent-card">
      <div class="post-content-parent">
      <TextField
        label="Comment:"
        variant="outlined"
          defaultValue="Success"
          multiline={true}
          rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            id="post-content"
  />
  </div>
  <Button variant="contained" color="primary" className="post-comment-btn"
      onClick={() => AddComment()}>Submit</Button>
    </Card>
  ) : (<div></div>)
  }
    </>
  );
};

export default AddComments;

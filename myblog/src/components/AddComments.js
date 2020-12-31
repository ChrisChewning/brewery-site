import React, { useState } from "react";

const AddComments = ({ id, comments, username, newComment }) => {
  const [commentText, setCommentText] = useState(""); //form comment

  const AddComment = async () => {
    const result = await fetch(
      `http://localhost:8000/api/community/${id}/add-comment`,
      {
        //options object for method, body, and headers.
        method: "post",
        body: JSON.stringify({ username, comment: commentText }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
        headers: { //when sending post req's w a json body to the server, we need to include a header.
          "Content-Type": "application/json", //Content-Type is case-sensitive. This tells the server what data we're passing along.
        },
      }
    );
    //update UI
    setCommentText(""); //updates form but doesn't re-render the page.
    newComment(); //calls this from the parent component
  };

  return (
    <div id="add-comment">
      <h3>Add a Comment</h3>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </label>
      <button onClick={() => AddComment()}>Add Comment</button>
    </div>
  );
};

export default AddComments;

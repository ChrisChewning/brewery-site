import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';

const AddPosts = ({ username, image, newPost }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState(""); //form comment
  const [showPostHeading, setPostHeading] = useState(false);

  const AddPost = async () => {
    await fetch(
      `http://localhost:8000/api/community/posts/add-post`,
      {
        //options object for method, body, and headers.
        method: "post",
        body: JSON.stringify({ name: postTitle, content: postText, username: username, image: image  }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
        headers: { //when sending post req's w a json body to the server, we need to include a header.
          "Content-Type": "application/json", //Content-Type is case-sensitive. This tells the server what data we're passing along.
        },
      }
    );
    //update UI
  setPostTitle("");
  setPostText(""); //updates form but doesn't re-render the page.
  newPost(); //calls this from the parent component
  setPostHeading(false);
  };

  const addPostTitle = () => {
    console.log('clicked')
    setPostHeading(true);
  }

  return (
    <>
    <h3 onClick={() => addPostTitle()} className="post-comment-label">Add a Post</h3>
    {showPostHeading ? (
      <Card id="add-post-parent-card">
      <form id="post-entry">
      <TextField id="post-title"
      label="Post Title:"
      value={postTitle}
      onChange={(e) => setPostTitle(e.target.value)}

      />
    <div class="post-content-parent">
    <TextField
      label="Post:"
      variant="outlined"
        defaultValue="Success"
        multiline={true}
        rows={3}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          id="post-content"
/>
</div>
<Button variant="contained" color="primary" className="post-comment-btn"
onClick={() => AddPost()}>Submit</Button>
    </form>
    </Card>
  ) : (<div></div>)
}
    </>
  );
};

export default AddPosts;

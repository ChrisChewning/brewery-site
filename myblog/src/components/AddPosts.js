import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';

const AddPosts = ({ username, image, newPost }) => {
  console.log(username)
  console.log(image)
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState(""); //form comment

  const AddPost = async () => {
    const result = await fetch(
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
  };

  return (
    <div>
      <h3>Add a Post</h3>
      <form>
      <TextField
      label="Post Title:"
      value={postTitle}
      onChange={(e) => setPostTitle(e.target.value)}
      /> 
      <TextField
      label="Post:"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
/>
<Button variant="contained" color="primary"
onClick={() => AddPost()}>Add Post </Button>
    </form>
    </div>
  );
};

export default AddPosts;

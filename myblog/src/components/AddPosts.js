import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';
import PageContainer from '../components/RichText.js';
import {EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import 'draft-js/dist/Draft.css';


const AddPosts = ({ username, image, newPost }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState(""); //form comment
  const [showPostHeading, setPostHeading] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),)

  const AddPost = async () => {
    await fetch(
      `http://localhost:8000/api/community/posts/add-post`,
      {
        //options object for method, body, and headers.
        method: "post",
        body: JSON.stringify({ name: postTitle, content: editorState, username: username, image: image  }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
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

console.log(editorState, ' editorState')

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


    <Editor editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            />



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

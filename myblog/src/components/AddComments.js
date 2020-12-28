import React, { useState, useEffect } from "react";



const AddComments = ({ id, comments, username, newComment }) => { //id is coming from communitypost. setpostinfo from ?
  const [commentsState, setComments] = useState(comments.length); //array of comments
  const [commentText, setCommentText] = useState(""); //form comment
  //const [postInfo, setPostInfo] = useState({ comments: [] });

console.log(newComment, 'new Comment')
console.log(comments, 'this is comments')
console.log(commentsState, ' commentsState')
  const AddComment = async () => {
    const result = await fetch(`http://localhost:8000/api/community/${id}/add-comment`, { //options object for method, body, and headers.
      method: "post",
      body: JSON.stringify({ username, comment: commentText }), //JSON object turned into string for server to parse. comment is in the post req. you stringify to commentText here.
      headers: { //when sending post req's w a json body to the server, we need to include a header.
        "Content-Type": "application/json", //Content-Type is case-sensitive. This tells the server what data we're passing along.
      },
    });
    //update UI
    // const updatedArray = commentText;
    //comments = [...commentText]
    const body = await result.json(); //get body of response to update UI
    setCommentText(""); //updates form but doesn't re-render the page.

    console.log(newComment, 'NEW COMMENT STATE / PROPS')
    newComment();
    // const updateComments = [...comments];
    // updateComments.push(commentText)
    // console.log(updateComments)
    // setComments([updateComments])

//How to call prop    newComment
    //HOW TO SET PROPS + 1 so you can change state in parent component


  };

  console.log(username, " ADD COMMENT username")
  console.log(commentText)


  return (
    <div id="add-comment">
      <h3>Add a Comment</h3>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" value={commentText} onChange={e => setCommentText(e.target.value)} />
                </label>
      <button onClick={() => AddComment()}>Add Comment</button>
    </div>
  );
};

export default AddComments;

import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const UpvotesSection = ({ postName, upvotes, setPostInfo }) => {
  //props. 1. is for the name in the URL.  2. is for postName.upvotes.  3. is the hook

  const upvotePost = async () => {
    const result = await fetch(`/api/community/${postName}/upvote`, {
      method: "post",
    });
    const body = await result.json(); //get the body of the result.
    setPostInfo(body); //update state of PostInfo
  };

  const downvotePost = async () => {
    const result = await fetch(`/api/community/${postName}/downvote`, {
      method: "post",
    });
    const body = await result.json();
    setPostInfo(body);
  };

  return (
    <div id="upvotes-section">
      <ThumbUpIcon onClick={() => upvotePost()} />
      <p> {upvotes} </p>
      <ThumbDownIcon onClick={() => downvotePost()} />
    </div>
  );
};

export default UpvotesSection;

//{upvotes} is just sending the upvotes property through postName

import { useState } from "react";
import Button from "./Button";
import Comment from "./Comment";
import { usePosts } from "./PostContext";

export default function PostComments({ comments, id }) {
  const { dispatch } = usePosts();
  function handleMakeComment(e) {
    e.preventDefault();
    if (!comment) {
      return;
    }
    dispatch({ type: "posts/comment", payload: { comment, id } });
    setComment("");
  }
  const [comment, setComment] = useState("");
  return (
    <div>
      COMMENTS ({comments.length})
      {comments.map((comment) => (
        <Comment>{comment}</Comment>
      ))}
      <form onSubmit={(e) => handleMakeComment(e)}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <Button>Add comment</Button>
      </form>
    </div>
  );
}

import { useState } from "react";
import Button from "./Button";
import Comment from "./Comment";
import { usePosts } from "./PostContext";
export default function FormMakeComment({ comments, id }) {
  const TEMP_ID = window.crypto.randomUUID();
  const { postComment } = usePosts();
  function handleMakeComment(e) {
    e.preventDefault();
    if (!comment) {
      return;
    }
    postComment({ id: TEMP_ID, comment, discussionId: id });

    setComment("");
  }
  const [comment, setComment] = useState("");
  return (
    <div>
      COMMENTS ({comments == null ? 0 : comments.length})
      {comments?.map((comment) => (
        <Comment key={comment.id}>{comment.comment}</Comment>
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

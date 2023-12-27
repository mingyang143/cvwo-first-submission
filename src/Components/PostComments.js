import { useState } from "react";
import Button from "./Button";
import Comment from "./Comment";

export default function PostComments({ comments, onMakeComment, id }) {
  function handleMakeComment(e) {
    e.preventDefault();
    if (!textBox) {
      return;
    }
    onMakeComment(textBox, id);
    setTextBox("");
  }
  const [textBox, setTextBox] = useState("");
  return (
    <div>
      COMMENTS ({comments.length})
      {comments.map((comment) => (
        <Comment>{comment}</Comment>
      ))}
      <form onSubmit={(e) => handleMakeComment(e)}>
        <input
          type="text"
          value={textBox}
          onChange={(e) => setTextBox(e.target.value)}
        ></input>
        <Button>Add comment</Button>
      </form>
    </div>
  );
}

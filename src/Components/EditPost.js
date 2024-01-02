import { useState } from "react";
import Button from "./Button";
import { usePosts } from "./PostContext";

function EditPost({ id, setIsEditing, currTitle, currContent }) {
  const [newTitle, setNewTitle] = useState(currTitle);
  const [newContent, setNewContent] = useState(currContent);
  const { postEdit } = usePosts();

  function handleSubmit(e) {
    e.preventDefault();
    postEdit({ id: id, title: newTitle, content: newContent });
    setIsEditing(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      ></input>
      <label>Content of post </label>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      ></input>
      <Button>Edit changes!</Button>
    </form>
  );
}

export default EditPost;

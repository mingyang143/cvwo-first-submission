import { useState } from "react";
import Button from "./Button";
import { usePosts } from "./PostContext";
export default function FormMakePost() {
  const { dispatch, createPost } = usePosts();
  const [postTitle, setpostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    if (!postTitle || !postContent) return;
    const newPost = {
      id,
      title: postTitle,
      content: postContent,
      likes: 0,
      comments: [],
    };
    dispatch({ type: "posts/addPost", payload: newPost });
    createPost();
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a post! 😊</h2>
      <label>Title of post </label>
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setpostTitle(e.target.value)}
      ></input>
      <label>Content of post </label>
      <input
        type="text"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></input>
      <Button>Start Discussion! 💬</Button>
    </form>
  );
}

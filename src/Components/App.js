import Navigation from "./Navigation";
import PostList from "./PostList";
import FormMakePost from "./FormMakePost";
import Button from "./Button";
import { useState, useEffect } from "react";

const discussionContent = [
  {
    id: 0,
    title: "why are cats curious?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
    likes: 10,
    comments: ["qwewewe", "rtertret", "qwewqe"],
  },
  {
    id: 1,
    title: "why do we have to study?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
    likes: 7,
    comments: ["qwewewe", "rtertret", "qwewqe"],
  },
  {
    id: 2,
    title: "How to escape the matrix?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
    likes: 1,
    comments: ["qwewewe", "rtertret", "qwewqe"],
  },
];

function App() {
  function handleMakePost(post) {
    setFormOpen((formOpen) => !formOpen);
  }
  function handleAddPost(post) {
    setPosts((posts) => [...posts, post]);
    setFormOpen(false);
  }
  function handleUpdateLikes(id) {
    setPosts((posts) =>
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }
  function handleMakeComment(comment, id) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  }
  const [posts, setPosts] = useState(discussionContent);
  const [AddPostformOpen, setFormOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  useEffect(function () {
    //callback?.();
    //const controller = new AbortController();
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError("");

        // const res = await fetch("172.18.92.251:8000/users", {
        //   signal: controller.signal,
        // });
        const res = await fetch("172.18.92.251:8000/users");
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.content;
        // if (data.errorCode !== "0") {
        //   throw new Error("failed to get usrs!");
        // }
        console.log(data);
        // setUsers(data.Search);
        // setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);
  return (
    <div>
      <Navigation />
      <PostList
        discussionContent={posts}
        onUpdateLikes={handleUpdateLikes}
        onMakeComment={handleMakeComment}
      />
      {AddPostformOpen && <FormMakePost onAddPost={handleAddPost} />}
      {!AddPostformOpen && (
        <Button onClick={handleMakePost}>Create Post 🗣️</Button>
      )}
    </div>
  );
}

export default App;

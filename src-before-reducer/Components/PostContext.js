import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

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

function PostProvider({ children }) {
  function handlePostOpen(post) {
    setPostFormOpen((formOpen) => !formOpen);
  }
  function handleAddPost(post) {
    setPosts((posts) => [...posts, post]);
    setPostFormOpen(false);
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
  const [AddPostformOpen, setPostFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");

  useEffect(function () {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch("/users");
        if (!res.ok)
          throw new Error("Something went wrong with fetching users", {
            signal: controller.signal,
          });
        const data = await res.json();
        console.log(data.payload);
        // setUsers(data.Search);
        setError("");
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
    //2) Provide value to child components
    <PostContext.Provider
      value={{
        discussionContent: posts,
        onUpdateLikes: handleUpdateLikes,
        onMakeComment: handleMakeComment,
        onAddPost: handleAddPost,
        onPostOpen: handlePostOpen,
        AddPostformOpen,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const PostContext = createContext();

const initialState = {
  posts: [
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
  ],
  isPostFormOpen: false,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "posts/formToggle":
      return { ...state, isPostFormOpen: !state.isPostFormOpen };
    case "posts/addPost":
      return {
        ...state,
        posts: [...state, action.payload],
        isPostFormOpen: false,
      };
    case "posts/likes":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        ),
      };
    case "posts/comment":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        ),
      };
    case "posts/loadingToggle":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "posts/errorFetch":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("unknown action");
  }
}

function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, isPostFormOpen, isLoading, error } = state;

  // function handlePostOpen(post) {
  //   setPostFormOpen((formOpen) => !formOpen);
  // }
  // function handleAddPost(post) {
  //   setPosts((posts) => );
  //   setPostFormOpen(false);
  // }
  // function handleUpdateLikes(id) {
  //   setPosts((posts) =>
  //     posts.map((post) =>
  //       post.id === id ? { ...post, likes: post.likes + 1 } : post
  //     )
  //   );
  // // }
  // function handleMakeComment(comment, id) {
  //   setPosts(
  //     posts.map((post) =>
  //       post.id === id
  //         ? { ...post, comments: [...post.comments, comment] }
  //         : post
  //     )
  //   );
  // }

  useEffect(function () {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        dispatch({ type: "posts/loadingToggle" });
        dispatch({ type: "posts/errorFetch", payload: "" });
        const res = await fetch("/users");
        if (!res.ok)
          throw new Error("Something went wrong with fetching users", {
            signal: controller.signal,
          });
        const data = await res.json();
        console.log(data.payload);
        // setUsers(data.Search);
        dispatch({ type: "posts/errorFetch", payload: "" });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "posts/errorFetch", payload: err.message });
        }
        console.log(err);
      } finally {
        dispatch({ type: "posts/loadingToggle" });
      }
    }

    fetchUsers();
  }, []);

  return (
    //2) Provide value to child components
    <PostContext.Provider
      value={{
        posts,
        isPostFormOpen,
        isLoading,
        error,
        dispatch,
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

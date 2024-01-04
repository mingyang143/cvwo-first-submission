import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

// [
//   {
//     id: 0,
//     title: "why are cats curious?",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
//     likes: 10,
//     comments: ["qwewewe", "rtertret", "qwewqe"],
//   },
//   {
//     id: 1,
//     title: "why do we have to study?",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
//     likes: 7,
//     comments: ["qwewewe", "rtertret", "qwewqe"],
//   },
//   {
//     id: 2,
//     title: "How to escape the matrix?",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed mollis leo. Nulla non ligula molestie, varius velit non, maximus velit. Sed eros lorem, blandit et interdum ut, pharetra quis libero. Vivamus convallis nisl eros, vel aliquam sapien eleifend vitae. In hac habitasse platea dictumst. Cras arcu velit, sagittis et.",
//     likes: 1,
//     comments: ["qwewewe", "rtertret", "qwewqe"],
//   },
// ]

const initialState = {
  posts: [],
  isPostFormOpen: false,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "posts/fetched":
      return { ...state, posts: action.payload };
    case "posts/formToggle":
      return { ...state, isPostFormOpen: !state.isPostFormOpen };
    case "posts/addPost":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        isPostFormOpen: false,
      };
    case "posts/likes":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        ),
      };
    case "posts/edit":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                title: action.payload.title,
                content: action.payload.content,
              }
            : post
        ),
      };
    case "posts/loadingToggle":
      return {
        ...state,
        isLoading: !state.isLoading,
        error: "",
      };
    case "posts/errorFetch":
      return {
        ...state,
        error: action.payload,
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

    default:
      throw new Error("unknown action");
  }
}

function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, isPostFormOpen, isLoading, error } = state;
  const { user } = useAuth();

  useEffect(function () {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        dispatch({ type: "posts/loadingToggle" });
        const res = await fetch("/discussions");
        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching discussion content",
            {
              signal: controller.signal,
            }
          );
        const data = await res.json();
        const initialState = data.payload.data;
        dispatch({ type: "posts/fetched", payload: initialState });
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
  //create post need more work with backend and frontend
  function createPost(newPost) {
    console.log("creating post");
    dispatch({ type: "posts/addPost", payload: newPost });
    const data = addPost(newPost);
    //need to fetch comments again either by calling function manually or by using useEffect dependency array
  }
  async function addPost(newPost) {
    try {
      const res = await fetch(`/discussion`, {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      alert("There was an error loading data...");
    } finally {
    }
  }

  function createComment(newComment) {
    console.log("creating comment");
    dispatch({ type: "posts/comment", payload: newComment });
    const data = addComment(newComment);
  }
  async function addComment(newComment) {
    try {
      const res = await fetch(`/comment`, {
        method: "post",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch {
      alert("There was an error loading data...");
    } finally {
    }
  }

  async function postEdit({ id, title, content }) {
    console.log("editing post");
    try {
      dispatch({ type: "posts/loadingToggle" });
      const res = await fetch(`/discussion`, {
        method: "post",
        body: JSON.stringify({
          id: id,
          user_id: user.user_id,
          title: title,
          content: content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "posts/edit", payload: { id, title, content } });
      return data;
    } catch (err) {
      dispatch({ type: "posts/errorFetch", payload: err.message });
      alert("There was an error editing data...");
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        isPostFormOpen,
        isLoading,
        error,
        dispatch,
        postEdit,
        createPost,
        createComment,
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

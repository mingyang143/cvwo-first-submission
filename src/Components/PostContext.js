import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

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
      alert(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case "posts/comment":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.discussionId
            ? { ...post, comments: [...post.comments, action.payload] }
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
    async function fetchDiscussions() {
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

    fetchDiscussions();
  }, []);

  const createPost = useCallback(function createPost(newPost) {
    dbAddPost(newPost);
  }, []);

  async function dbAddPost(newPost) {
    dispatch({ type: "posts/loadingToggle" });
    try {
      const res = await fetch(`/discussion`, {
        method: "put",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Something went wrong with creating discussion");
      const data = await res.json();
      dispatch({ type: "posts/addPost", payload: data.payload.data });

      return data;
    } catch (err) {
      dispatch({ type: "posts/errorFetch", payload: err.message });
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  }

  const createComment = useCallback(function createComment(newComment) {
    dispatch({ type: "posts/comment", payload: newComment });

    dbAddComment({
      comment: newComment.comment,
      discussionId: newComment.discussionId,
    });
  }, []);

  async function dbAddComment(newComment) {
    dispatch({ type: "posts/loadingToggle" });
    try {
      const res = await fetch(`/comment`, {
        method: "put",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with adding comment");
      const data = await res.json();
      return data;
    } catch (err) {
      dispatch({ type: "posts/errorFetch", payload: err.message });
    } finally {
      dispatch({ type: "posts/loadingToggle" });
    }
  }

  const dbPostEdit = useCallback(
    async function dbPostEdit({ id, title, content }) {
      dispatch({ type: "posts/loadingToggle" });
      try {
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
        if (!res.ok)
          throw new Error("Something went wrong with editing discussion");
        const data = await res.json();
        dispatch({ type: "posts/edit", payload: { id, title, content } });
        return data;
      } catch (err) {
        dispatch({ type: "posts/errorFetch", payload: err.message });
        alert("There was an error editing data...");
      } finally {
        dispatch({ type: "posts/loadingToggle" });
      }
    },
    [user.user_id]
  );

  const postEdit = useCallback(
    function postEdit(postToBeEdited) {
      dbPostEdit(postToBeEdited);
    },
    [dbPostEdit]
  );

  const likesInc = useCallback(function likesInc(id) {
    dbLikesInc(id);
  }, []);

  async function dbLikesInc(id) {
    try {
      dispatch({ type: "posts/likes", payload: id });
      const res = await fetch(`/likes`, {
        method: "put",
        body: JSON.stringify({
          discussionId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with adding comment");
    } catch (err) {
      dispatch({ type: "posts/errorFetch", payload: err.message });
    }
  }
  const value = useMemo(() => {
    return {
      posts,
      isPostFormOpen,
      isLoading,
      error,
      dispatch,
      postEdit,
      createPost,
      createComment,
      likesInc,
    };
  }, [
    posts,
    isPostFormOpen,
    isLoading,
    error,
    dispatch,
    postEdit,
    createPost,
    createComment,
    likesInc,
  ]);
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };

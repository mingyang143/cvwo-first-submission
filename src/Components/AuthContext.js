import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "toggleLoading":
      return { ...state, isLoginLoading: !state.isLoginLoading };
    default:
      throw new Error("unknown action");
  }
}
const AuthContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, isLoginLoading } = state;

  async function login(username, password) {
    dispatch({ type: "toggleLoading" });
    const data = await dbIsValidUser({ name: username });
    dispatch({ type: "toggleLoading" });
    if (data?.errorCode === 0) {
      dispatch({
        type: "login",
        payload: { name: username, userId: data.payload.data.id },
      });
      alert("Successfully logged in!");
    } else {
      alert("No user found, please create a user! ❌");
    }
  }
  async function createUser(username, password) {
    dispatch({ type: "toggleLoading" });
    const data = await dbPostUser({ name: username });
    dispatch({ type: "toggleLoading" });
    if (data) {
      alert("New user created, please log in now");
    } else {
      alert("Failed to create new user");
    }
    navigate("/login");
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  async function dbIsValidUser(newUser) {
    try {
      const res = await fetch(`/checkuser?name=${newUser.name}`);
      const data = await res.json();
      return data;
    } catch {
      alert("There was an error validating user...");
    } finally {
    }
  }
  async function dbPostUser(newUser) {
    try {
      const res = await fetch(`/users`, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      return data;
    } catch {
      alert("There was an error loading data...");
    } finally {
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        createUser,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { useAuth, AuthProvider };

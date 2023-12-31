import { createContext, useContext, useReducer } from "react";
const initialState = {
  user: null,
  isAuthenticated: false,
};

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action");
  }
}
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  async function login(username, password) {
    const data = await isValidUser({ name: username });
    if (data?.errorCode === 0) {
      dispatch({ type: "login", payload: { name: username } });
      alert("Successfully logged in!");
    } else {
      alert("No user found, please create a user! ❌");
    }
  }
  async function createUser(username, password) {
    const data = await PostUser({ name: username });
    if (data) {
      alert("New user created, please log in now");
    } else {
      alert("Failed to create new user");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  async function isValidUser(newUser) {
    try {
      const res = await fetch(`/checkuser?name=${newUser.name}`);
      const data = await res.json();
      return data;
    } catch {
      alert("There was an error validating user...");
    } finally {
    }
  }
  async function PostUser(newUser) {
    try {
      const res = await fetch(`/users`, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const data = await res.json();
      return data;
    } catch {
      alert("There was an error loading data...");
    } finally {
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, createUser }}
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

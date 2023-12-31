import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ message, onSubmit, type, ctaButton }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      onSubmit(username, password);
      setUsername("");
      setPassword("");
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className="login">
      <h1>{message}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {type === "login" && (
          <div>
            <Link to="/create">No account? Create one now!</Link>
          </div>
        )}
        <div>
          <button>{ctaButton}</button>
        </div>
      </form>
    </main>
  );
}

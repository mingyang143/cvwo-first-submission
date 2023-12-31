import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function LogoutUi() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className="user">
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default LogoutUi;

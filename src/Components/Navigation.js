import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/app">App</NavLink>
        </li>
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        <li></li>
      </ul>
    </nav>
  );
}

export default Navigation;

import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LogoutUi from "./LogoutUi";
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
        {!isAuthenticated && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <LogoutUi />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

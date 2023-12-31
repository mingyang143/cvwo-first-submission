import { useAuth } from "./AuthContext";
import LoginCreateUser from "./LoginCreateUser";

function Login() {
  const { login } = useAuth();
  return (
    <LoginCreateUser
      message={"Login now!"}
      onSubmit={login}
      type={"login"}
      ctaButton={"Login"}
    />
  );
}

export default Login;

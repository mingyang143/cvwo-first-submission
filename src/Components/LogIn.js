import { useAuth } from "./AuthContext";
import LoginCreateUser from "./LoginCreateUser";
import Spinner from "./Spinner";

function Login() {
  const { login, isLoginLoading } = useAuth();
  if (isLoginLoading) {
    return <Spinner />;
  }
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

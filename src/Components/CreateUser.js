import { useAuth } from "./AuthContext";
import LoginCreateUser from "./LoginCreateUser";
import Spinner from "./Spinner";

function CreateUser() {
  const { createUser, isLoginLoading } = useAuth();
  if (isLoginLoading) {
    return <Spinner />;
  }
  return (
    <LoginCreateUser
      message={"Create a new user now! 🥳"}
      onSubmit={createUser}
      type={"create"}
      ctaButton={"Create User!"}
    />
  );
}

export default CreateUser;

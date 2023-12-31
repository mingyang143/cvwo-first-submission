import { useAuth } from "./AuthContext";
import LoginCreateUser from "./LoginCreateUser";

function CreateUser() {
  const { createUser } = useAuth();
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

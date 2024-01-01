import PostList from "./PostList";
import FormMakePost from "./FormMakePost";
import Button from "./Button";
import { usePosts } from "./PostContext";
import Spinner from "./Spinner";

function App() {
  const { isPostFormOpen, dispatch, isLoading } = usePosts();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <PostList />
      {isPostFormOpen && <FormMakePost />}
      {!isPostFormOpen && (
        <Button onClick={() => dispatch({ type: "posts/formToggle" })}>
          Create Post 🗣️
        </Button>
      )}
    </section>
  );
}

export default App;

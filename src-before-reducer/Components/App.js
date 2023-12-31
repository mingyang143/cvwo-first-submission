import PostList from "./PostList";
import FormMakePost from "./FormMakePost";
import Button from "./Button";
import { usePosts } from "./PostContext";

function App() {
  const { AddPostformOpen, onPostOpen } = usePosts();
  return (
    <section>
      <PostList />
      {AddPostformOpen && <FormMakePost />}
      {!AddPostformOpen && <Button onClick={onPostOpen}>Create Post 🗣️</Button>}
    </section>
  );
}

export default App;

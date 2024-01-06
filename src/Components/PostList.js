import Post from "./Post";
import { usePosts } from "./PostContext";
export default function PostList() {
  const { posts } = usePosts();
  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <Post postContent={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}

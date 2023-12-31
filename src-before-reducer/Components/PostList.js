import Post from "./Post";
import { usePosts } from "./PostContext";
export default function PostList() {
  const { discussionContent } = usePosts();
  return (
    <div>
      <ul>
        {discussionContent.map((post) => (
          <Post postContent={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}

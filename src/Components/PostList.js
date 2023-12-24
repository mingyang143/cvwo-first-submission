import Post from "./Post";
export default function PostList({ discussionContent, onUpdateLikes }) {
  return (
    <div>
      <ul>
        {discussionContent.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            likes={post.likes}
            onUpdateLikes={onUpdateLikes}
          >
            {" "}
          </Post>
        ))}
      </ul>
    </div>
  );
}

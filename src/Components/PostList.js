import Post from "./Post";
export default function PostList({
  discussionContent,
  onUpdateLikes,
  onMakeComment,
}) {
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
            comments={post.comments}
            onMakeComment={onMakeComment}
          >
            {" "}
          </Post>
        ))}
      </ul>
    </div>
  );
}

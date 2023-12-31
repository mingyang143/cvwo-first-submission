import { useState } from "react";
import Button from "./Button";
import PostComments from "./PostComments";
import TextExpander from "./TextExpander";
import LikesCounter from "./LikesCounter";
import { usePosts } from "./PostContext";
export default function Post({ postContent }) {
  const { dispatch } = usePosts();
  const { id, title, content, likes, comments } = postContent;
  function handleSelection() {
    setCommentView((CommentView) => !CommentView);
  }

  const [CommentView, setCommentView] = useState(false);

  return (
    <>
      <li id={id}>
        <label>{title}</label>
        {content.split(" ").length > 30 ? (
          <TextExpander collapsedNumWords={30} className="box">
            {content}
          </TextExpander>
        ) : (
          <div className="box">
            <p>{content}</p>
          </div>
        )}
        <LikesCounter
          likes={likes}
          onUpdateLikes={() => dispatch({ type: "posts/likes", payload: id })}
        />

        {
          <Button onClick={handleSelection}>
            {CommentView ? "Close comments ❌" : "Comment now!"}
          </Button>
        }
      </li>
      {CommentView && <PostComments comments={comments} id={id} />}
    </>
  );
}

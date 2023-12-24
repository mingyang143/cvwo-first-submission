import { useState } from "react";
import Button from "./Button";
import PostComments from "./PostComments";
import TextExpander from "./TextExpander";
import LikesCounter from "./Likes";
export default function Post({ id, title, content, likes, onUpdateLikes }) {
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
        <LikesCounter likes={likes} onUpdateLikes={() => onUpdateLikes(id)} />

        {
          <Button onClick={handleSelection}>
            {CommentView ? "Close comments ❌" : "Comment now!"}
          </Button>
        }
      </li>
      {CommentView && <PostComments onSelection={handleSelection} />}
    </>
  );
}

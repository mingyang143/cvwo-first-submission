import { useState } from "react";
import Button from "./Button";
import PostComments from "./PostComments";
import TextExpander from "./TextExpander";
import LikesCounter from "./LikesCounter";
import { usePosts } from "./PostContext";
import { useAuth } from "./AuthContext";
import EditPost from "./EditPost";
export default function Post({ postContent }) {
  const { dispatch } = usePosts();
  const { user } = useAuth();
  const { id, title, content, likes, comments, user_id } = postContent;

  const [isEditing, setIsEditing] = useState(false);

  function handleSelection() {
    setCommentView((CommentView) => !CommentView);
  }

  const [CommentView, setCommentView] = useState(false);

  return (
    <>
      <li>
        {user_id === user.user_id && isEditing ? (
          <EditPost
            setIsEditing={setIsEditing}
            id={id}
            currTitle={title}
            currContent={content}
          />
        ) : (
          <>
            <label>{title}</label>
            {content.split(" ").length > 30 ? (
              <div>
                <TextExpander collapsedNumWords={30} className="box">
                  {content}
                </TextExpander>
              </div>
            ) : (
              <div className="box">
                <p>{content}</p>
              </div>
            )}
          </>
        )}
        {user_id === user.user_id && !isEditing && (
          <Button className="clear" onClick={() => setIsEditing(true)}>
            Edit Post
          </Button>
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

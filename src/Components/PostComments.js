import Button from "./Button";
import Comment from "./Comment";

const initialComments = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing.",
];

export default function PostComments({ onSelection }) {
  return (
    <div>
      COMMENTS
      {initialComments.map((comment) => (
        <Comment>{comment}</Comment>
      ))}
      <form>
        <input type="text"></input>
        <Button>Add comment</Button>
      </form>
      {/* <Button onClick={onSelection}>Close comments ❌</Button> */}
    </div>
  );
}

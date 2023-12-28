export default function LikesCounter({ likes, onUpdateLikes }) {
  return (
    <div className="hearts-counter">
      <span>{likes} ❤️</span>
      <button onClick={onUpdateLikes}>Like 💖</button>
    </div>
  );
}

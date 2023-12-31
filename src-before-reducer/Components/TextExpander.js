import { useState } from "react";

export default function TextExpander({
  children,
  expanded = false,
  className,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "#1f09cd",
}) {
  function getXWords(string, x) {
    return string.split(" ").slice(0, x).join(" ");
  }
  function handleExpand() {
    setExpand((e) => !e);
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };
  const [isExpanded, setExpand] = useState(expanded);
  return (
    <div className={className ? className : ""}>
      <span>
        {isExpanded ? children : getXWords(children, collapsedNumWords) + "..."}
        <button onClick={handleExpand} style={buttonStyle}>
          {isExpanded ? collapseButtonText : expandButtonText}
        </button>
      </span>
    </div>
  );
}

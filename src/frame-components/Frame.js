import React from "react";
import SmallPanelView from "./SmallPanelView";
import Time from "./Time.js";

export default function Frame(props) {
  function handleChange(newDuration) {
    props.updateDuration(newDuration, props.index);
  }

  return (
    <div
      className="frame"
      style={{
        borderColor: props.isSelected ? "#3f51b5" : "#808080"
      }}
      onClick={function() {
        props.selectFrame(props.index);
      }}
    >
      {props.colors.map((color, i) => (
        <SmallPanelView key={i} index={i} color={color} />
      ))}
      <Time onChange={handleChange} duration={props.duration} />
    </div>
  );
}

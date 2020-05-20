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
      {props.index}
      <div className="small-panels">
        {props.colors.map((color, i) => (
          <SmallPanelView key={i} index={i} color={color} />
        ))}
        <Time disabled={!(props.isSelected)} onChange={handleChange} duration={props.duration} />
      </div>
    </div>
  );
}

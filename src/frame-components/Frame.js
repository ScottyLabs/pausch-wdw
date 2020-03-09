export default Frame;

import React from "react";
import SmallPanelView from "./SmallPanelView";
import Time from "./Time.js";

export default function Frame(props) {
  function handleChange(newDuration) {
    props.updateDuration(newDuration, props.index);
  }

  return (
    <div className = "frame">
      {props.colors.map((color, i) => (
        <SmallPanelView
          key={i}
          index={i}
          color={color}
          isSelected={props.selectedIndex === i}
          selectPanel={props.selectPanel}
        />
      ))}
      <Time onChange={handleChange} />
    </div>
  );
}

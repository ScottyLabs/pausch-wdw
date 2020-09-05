import React from "react";

// components
import Frame from "./Frame";

export default function Frames(props) {
  return (
    <div id="frames">
      {props.frames.map((frame, i) => (
        <Frame
          key={i}
          index={i}
          duration={frame.duration}
          colors={Object.values(frame.colors)}
          isSelected={props.selectedFrameIndex === i}
          selectFrame={props.selectFrame}
          updateDuration={props.updateDuration}
        />
      ))}
    </div>
  );
}

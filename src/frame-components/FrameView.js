import React from "react";
import Frame from "./Frame";

export default function FrameView(props) {
  return (
    <div id="frame-view">
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

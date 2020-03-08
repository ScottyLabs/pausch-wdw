import React from "react";
import Frame from "./Frame";

export default function FrameView(props) {

  return (
    <div id="frame-view">
      {props.frames.map((colors, duration, i) => (
        <Frame
          key={i}
          index={i}
          duration={duration}
          colors={colors}
          selectedFrameIndex={props.selectedFrameIndex === i}
          selectFrame={props.selectFrame}
        />
      ))}
      <button
        onClick={() => this.props.addFrame()}
      >
        Add Frame +
      </button>
    </div>
  );
}

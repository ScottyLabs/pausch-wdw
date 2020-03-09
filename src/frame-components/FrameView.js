import React from "react";
import Frame from "./Frame";
import { Button } from "@material-ui/core";

export default function FrameView(props) {
  return (
    <div id="frame-view">
      {props.frames.map((frame, i) => (
        <Frame
          key={i}
          index={i}
          duration={frame.duration}
          colors={frame.colors}
          isSelected={props.selectedFrameIndex === i}
          selectFrame={props.selectFrame}
        />
      ))}
      <Button
        color="inherit"
        onClick={function() {
          props.addFrame();
        }}
      >
        Add Frame
      </Button>
    </div>
  );
}

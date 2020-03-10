import React from "react";
import Panels from "./Panels";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";
import FrameView from "./frame-components/FrameView";
import { Button } from "@material-ui/core";

export default function App() {
  const defaultFrame = {
    colors: {
      0: "#808080",
      1: "#808080",
      2: "#808080",
      3: "#808080",
      4: "#808080",
      5: "#808080",
      6: "#808080",
      7: "#808080",
      8: "#808080"
    },
    duration: 1
  };
  const [selectedPanelIndex, setPanelIndex] = React.useState(0);
  const [selectedFrameIndex, setFrameIndex] = React.useState(0);
  const [frames, setFrames] = React.useState({
    0: JSON.parse(JSON.stringify(defaultFrame)) // clones defaultFrame object
  });
  const [frameCount, setFrameCount] = React.useState(1);

  function selectPanel(newPanelIndex) {
    setPanelIndex(newPanelIndex);
    console.log("Panel: " + newPanelIndex);
  }

  function selectFrame(newFrameIndex) {
    if (newFrameIndex < frameCount) {
      setFrameIndex(newFrameIndex);
      console.log("Frame: " + newFrameIndex);
      setPanelIndex(0);
    } else {
      console.log("Out of bounds frame index.");
    }
  }

  function addFrame() {
    var oldSize = frameCount;
    setFrames({
      ...frames,
      [oldSize]: JSON.parse(JSON.stringify(defaultFrame))
    });
    setFrameCount(oldSize + 1);
    console.log("Frame added. Frames size: " + frameCount);
    setFrameIndex(oldSize);
    selectPanel(0);
  }

  function deleteFrame() {
    var oldSize = frameCount;

    if (oldSize <= 1) return;
    /*const newFrames = Object.keys(frames).filter(
      frame => frame.id !== selectedFrameIndex
    );
   
    setFrames({ newFrames }); 
    const newFrames = Object.keys(frames).reduce((object, key) => {
      if (key !== selectedFrameIndex) {
        object[key] = frames[key];
      }
      return object;
    }, {});*/
    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      if (Object.keys(frames)[i] !== selectedFrameIndex) {
        newFrames[ctr] = frames[ctr];
        ctr++;
      }
    }
    setFrames({ newFrames });
    setFrameCount(oldSize - 1);
    console.log("Frame deleted. Frames size: " + frameCount);
    selectFrame(oldSize - 2);
    selectPanel(0);
  }

  function duplicateFrame() {
    console.log("Frame duplicated. Frames size: " + frameCount);
  }

  function updateColor(newColor) {
    var updatedFrame = Object.assign({}, frames[selectedFrameIndex]);
    updatedFrame.colors[selectedPanelIndex] = newColor;
    setFrames({ ...frames, [selectedFrameIndex]: updatedFrame });
    console.log(
      "Frame " +
        selectedFrameIndex +
        ", Panel " +
        selectedPanelIndex +
        " color changed"
    );
  }

  function updateDuration(newDuration, frameIndex) {
    var updatedFrame = Object.assign({}, frames[frameIndex]);
    updatedFrame.duration = newDuration;
    setFrames({ ...frames, [selectedFrameIndex]: updatedFrame });
    console.log("Frame " + selectedFrameIndex + " time changed");
  }

  return (
    <div>
      <Header name="Srinu Lade" frames={frames} />
      <Panels
        colors={Object.values(frames[selectedFrameIndex].colors)}
        selectedPanelIndex={selectedPanelIndex}
        selectPanel={selectPanel}
      />
      <ColorSelector
        selectedColor={frames[selectedFrameIndex].colors[selectedPanelIndex]}
        updateColor={updateColor}
      />
      <Button color="inherit" onClick={addFrame}>
        Add Frame
      </Button>
      <Button color="inherit" onClick={deleteFrame}>
        Delete Frame
      </Button>
      <Button color="inherit" onClick={duplicateFrame}>
        Duplicate Frame
      </Button>
      <FrameView
        frames={Object.values(frames)}
        addFrame={addFrame}
        selectedFrameIndex={selectedFrameIndex}
        selectFrame={selectFrame}
        updateDuration={updateDuration}
      />
    </div>
  );
}

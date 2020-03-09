import React from "react";
import Panels from "./Panels";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";

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
    0: Object.assign({}, defaultFrame) // clones defaultFrame object
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
      [oldSize]: Object.assign({}, defaultFrame),
    });
    setFrameCount(oldSize + 1);
    console.log("Frame added. Frames size: " + frames.size);
    setFrameIndex(oldSize);
    selectPanel(0);
  }

  function updateColor(newColor) {
    setFrames({ ...frames, [selectedFrameIndex]: { ...colors, [selectedPanelIndex]: newColor} });
    console.log("Frame " + selectedFrameIndex + ", Panel " + selectedPanelIndex + " color changed");
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
        selectedColor={frames[selectedFrameIndex].colors[selectedIndex]}
        updateColor={updateColor}
      />
      <FrameView
        frames={Object.values(frames)}
        addFrame={addFrame}
        selectedFrameIndex={selectedFrameIndex}
        selectFrame={selectFrame}
      />
    </div>
  );
}

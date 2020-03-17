import React from "react";
import Panels from "./Panels";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";
import Frames from "./frame-components/Frames";
import { Button } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default function App() {
  const classes = useStyles();
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
      8: "#808080",
      9: "#808080",
      10: "#808080",
      11: "#808080",
      12: "#808080",
      13: "#808080",
      14: "#808080",
      15: "#808080",
      16: "#808080",
      17: "#808080",
      18: "#808080",
      19: "#808080",
      20: "#808080",
      21: "#808080",
      22: "#808080",
      23: "#808080",
      24: "#808080",
      25: "#808080",
      26: "#808080",
      27: "#808080",
      28: "#808080",
      29: "#808080",
      30: "#808080",
      31: "#808080",
      32: "#808080",
      33: "#808080",
      34: "#808080",
      35: "#808080",
      36: "#808080",
      37: "#808080",
      38: "#808080",
      39: "#808080",
      40: "#808080",
      41: "#808080",
      42: "#808080",
      43: "#808080",
      44: "#808080",
      45: "#808080",
      46: "#808080",
      47: "#808080",
      48: "#808080",
      49: "#808080",
      50: "#808080",
      51: "#808080"
    },
    duration: 1
  };
  const [selectedPanelIndex, setPanelIndex] = React.useState(0);
  const [selectedFrameIndex, setFrameIndex] = React.useState(0);
  const [frames, setFrames] = React.useState({
    0: JSON.parse(JSON.stringify(defaultFrame)) // clones defaultFrame object
  });
  const [frameCount, setFrameCount] = React.useState(1);
  const [currColor, setCurrColor] = React.useState("#808080");

  function updateColor(newColor) {
    setCurrColor(newColor);
    updatePanelColor(currColor);
  }

  function selectPanel(newPanelIndex) {
    setPanelIndex(newPanelIndex);
    updatePanelColor(currColor);
    console.log("Panel index: " + newPanelIndex);
  }

  function selectFrame(newFrameIndex) {
    if (0 <= newFrameIndex && newFrameIndex < frameCount) {
      setFrameIndex(newFrameIndex);
      console.log("Frame index: " + newFrameIndex);
    } else {
      console.log("Out of bounds frame index.");
    }
  }

  function addFrame() {
    var oldSize = frameCount;
    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      newFrames[ctr] = JSON.parse(JSON.stringify(frames[i]));
      ctr++;
      if (i === selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(defaultFrame));
        ctr++;
      }
    }
    setFrames(newFrames);
    setFrameCount(oldSize + 1);
    setFrameIndex(selectedFrameIndex + 1);
    console.log("Frame duplicated. Frames size: " + frameCount);
  }

  function deleteFrame() {
    var oldSize = frameCount;

    if (oldSize <= 1) {
      console.log("Cannot delete frame when frame count == 1");
      return;
    }

    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      if (i !== selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(frames[i]));
        ctr++;
      }
    }
    setFrames(newFrames);
    setFrameCount(oldSize - 1);
    if (selectedFrameIndex === oldSize - 1) {
      selectFrame(selectedFrameIndex - 1);
    }
    console.log("Frame deleted. Frames size: " + frameCount);
  }

  function duplicateFrame() {
    var oldSize = frameCount;
    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      newFrames[ctr] = JSON.parse(JSON.stringify(frames[i]));
      ctr++;
      if (i === selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(frames[i]));
        ctr++;
      }
    }
    setFrames(newFrames);
    setFrameCount(oldSize + 1);
    setFrameIndex(selectedFrameIndex + 1);
    console.log("Frame duplicated. Frames size: " + frameCount);
  }

  function updatePanelColor(newColor) {
    var updatedFrame = JSON.parse(JSON.stringify(frames[selectedFrameIndex]));
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
    var updatedFrame = JSON.parse(JSON.stringify(frames[selectedFrameIndex]));
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
      <ColorSelector selectedColor={currColor} updateColor={updateColor} />
      <div id="frame-view">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddBoxIcon />}
          onClick={addFrame}
        >
          Add Frame
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddToPhotosIcon />}
          onClick={duplicateFrame}
        >
          Duplicate Frame
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={deleteFrame}
        >
          Delete Frame
        </Button>
        <br />
        <Frames
          frames={Object.values(frames)}
          addFrame={addFrame}
          selectedFrameIndex={selectedFrameIndex}
          selectFrame={selectFrame}
          updateDuration={updateDuration}
        />
      </div>
    </div>
  );
}

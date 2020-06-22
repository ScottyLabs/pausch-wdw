import React, { Component } from "react";

// Components
import Panels from "./components/Panels";
import Frames from "./components/Frames";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";

// MUI
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import DeleteIcon from "@material-ui/icons/Delete";
import PauseIcon from "@material-ui/icons/PauseOutlined";
import PlayIcon from "@material-ui/icons/PlayArrowOutlined";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const styles = () => ({
  button: {
    margin: "0px 5px",
  },
  previewBtn: {
    margin: "0px 5px 0px 30px",
  },
});

const user_id = "acarnegie";

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
    51: "#808080",
  },
  duration: 1.0,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPanelIndex: -1,
      selectedFrameIndex: 0,
      frames: {
        0: JSON.parse(JSON.stringify(defaultFrame)), // clones defaultFrame object
      },
      frameCount: 1,
      currColor: "#808080",
      playing: false,
    };

    this.selectColor = this.selectColor.bind(this);
    this.selectPanel = this.selectPanel.bind(this);

    this.selectFrame = this.selectFrame.bind(this);
    this.addFrame = this.addFrame.bind(this);
    this.deleteFrame = this.deleteFrame.bind(this);
    this.duplicateFrame = this.duplicateFrame.bind(this);

    this.updatePanelColor = this.updatePanelColor.bind(this);
    this.updatePanelsColor = this.updatePanelsColor.bind(this);
    this.updateDuration = this.updateDuration.bind(this);

    this.playPreview = this.playPreview.bind(this);
    this.goToNextFrame = this.goToNextFrame.bind(this);
    this.pausePreview = this.pausePreview.bind(this);
  }

  selectColor(newColor) {
    this.setState({
      currColor: newColor,
      selectedPanelIndex: -1,
    });
  }

  selectPanel(newPanelIndex, e) {
    console.log("prev panel index: " + this.state.selectedPanelIndex);
    if (e.shiftKey && this.state.selectedPanelIndex !== -1) {
      console.log("shift key pressed");
      let minIndex = Math.min(this.state.selectedPanelIndex, newPanelIndex);
      let maxIndex = Math.max(this.state.selectedPanelIndex, newPanelIndex);
      this.updatePanelsColor(this.state.currColor, minIndex, maxIndex + 1);
    } else {
      this.updatePanelColor(this.state.currColor, newPanelIndex);
    }
    this.setState({
      selectedPanelIndex: newPanelIndex,
    });
    console.log("Panel index: " + newPanelIndex);
  }

  selectFrame(newFrameIndex) {
    if (0 <= newFrameIndex && newFrameIndex < this.state.frameCount) {
      this.setState({
        selectedFrameIndex: newFrameIndex,
      });
      console.log("Frame index: " + newFrameIndex);
    } else {
      console.log("Out of bounds frame index.");
    }
  }

  addFrame() {
    var oldSize = this.state.frameCount;
    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      newFrames[ctr] = JSON.parse(JSON.stringify(this.state.frames[i]));
      ctr++;
      if (i === this.state.selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(defaultFrame));
        ctr++;
      }
    }
    this.setState({
      frames: newFrames,
      frameCount: oldSize + 1,
      selectedFrameIndex: this.state.selectedFrameIndex + 1,
    });
    console.log("Frame duplicated. Frames size: " + this.state.frameCount);
  }

  deleteFrame() {
    var oldSize = this.state.frameCount;

    if (oldSize <= 1) {
      console.log("Cannot delete frame when frame count == 1");
      return;
    }

    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      if (i !== this.state.selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(this.state.frames[i]));
        ctr++;
      }
    }
    var newFrameIndex = this.state.selectedFrameIndex;
    if (newFrameIndex === oldSize - 1) {
      newFrameIndex = newFrameIndex - 1;
    }
    this.setState({
      frames: newFrames,
      frameCount: oldSize - 1,
      selectedFrameIndex: newFrameIndex,
    });
    console.log("Frame deleted. Frames size: " + this.state.frameCount);
  }

  duplicateFrame() {
    var oldSize = this.state.frameCount;
    const newFrames = {};
    let ctr = 0;
    for (let i = 0; i < oldSize; i++) {
      newFrames[ctr] = JSON.parse(JSON.stringify(this.state.frames[i]));
      ctr++;
      if (i === this.state.selectedFrameIndex) {
        newFrames[ctr] = JSON.parse(JSON.stringify(this.state.frames[i]));
        ctr++;
      }
    }
    this.setState({
      frames: newFrames,
      frameCount: oldSize + 1,
      selectedFrameIndex: this.state.selectedFrameIndex + 1,
    });
    console.log("Frame duplicated. Frames size: " + this.state.frameCount);
  }

  updatePanelColor(newColor, panelIndex) {
    var updatedFrame = JSON.parse(
      JSON.stringify(this.state.frames[this.state.selectedFrameIndex])
    );
    updatedFrame.colors[panelIndex] = newColor;
    this.setState({
      frames: {
        ...this.state.frames,
        [this.state.selectedFrameIndex]: updatedFrame,
      },
    });
    console.log(
      "Frame " +
        this.state.selectedFrameIndex +
        ", Panel " +
        panelIndex +
        " color changed"
    );
  }

  // colors panels startPanelIndex UP TO but NOT INCLUDING endPanelIndex
  updatePanelsColor(newColor, startPanelIndex, endPanelIndex) {
    var updatedFrame = JSON.parse(
      JSON.stringify(this.state.frames[this.state.selectedFrameIndex])
    );
    for (let i = startPanelIndex; i < endPanelIndex; i++) {
      updatedFrame.colors[i] = newColor;
    }
    this.setState({
      frames: {
        ...this.state.frames,
        [this.state.selectedFrameIndex]: updatedFrame,
      },
    });
    console.log(
      "Frame " +
        this.state.selectedFrameIndex +
        ", Panels " +
        startPanelIndex +
        "-" +
        endPanelIndex +
        " color changed"
    );
  }

  updateDuration(newDuration, frameIndex) {
    var updatedFrame = JSON.parse(
      JSON.stringify(this.state.frames[frameIndex])
    );
    updatedFrame.duration = newDuration;
    this.setState({
      frames: { ...this.state.frames, [frameIndex]: updatedFrame },
    });
    console.log("Frame " + frameIndex + " time changed");
  }

  playPreview() {
    this.setState({
      playing: true,
    });
    this.timer = setTimeout(
      this.goToNextFrame,
      this.state.frames[this.state.selectedFrameIndex].duration * 1000
    );
  }

  goToNextFrame() {
    console.log("previewing next frame: " + this.state.selectedFrameIndex);
    var nextIndex;
    if (this.state.selectedFrameIndex === this.state.frameCount - 1) {
      nextIndex = 0;
    } else {
      nextIndex = this.state.selectedFrameIndex + 1;
    }
    this.selectFrame(nextIndex);
    this.playPreview();
  }

  pausePreview() {
    this.setState({
      playing: false,
    });
    clearTimeout(this.timer);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header user_id={user_id} design={this.state.frames} />
        <Panels
          colors={Object.values(
            this.state.frames[this.state.selectedFrameIndex].colors
          )}
          selectedPanelIndex={this.state.selectedPanelIndex}
          selectPanel={this.selectPanel}
        />
        <ColorSelector
          selectedColor={this.state.currColor}
          selectColor={this.selectColor}
        />
        <div id="frame-view">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddBoxIcon />}
            onClick={this.addFrame}
          >
            Add Frame
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddToPhotosIcon />}
            onClick={this.duplicateFrame}
          >
            Duplicate Frame
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={this.deleteFrame}
          >
            Delete Frame
          </Button>
          <Button
            variant="contained"
            color={this.state.playing ? "secondary" : "primary"}
            className={classes.previewBtn}
            startIcon={this.state.playing ? <PauseIcon /> : <PlayIcon />}
            onClick={this.state.playing ? this.pausePreview : this.playPreview}
          >
            Preview
          </Button>
          <br />
          <Frames
            frames={Object.values(this.state.frames)}
            addFrame={this.addFrame}
            selectedFrameIndex={this.state.selectedFrameIndex}
            selectFrame={this.selectFrame}
            updateDuration={this.updateDuration}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

import React, { Component } from "react";
import './styles/basic.css';

// Components
import Panels from "./components/basic/Panels";
import Header from "./builtin/basic/Header";
import ColorSelector from "./builtin/basic/ColorSelector";

const user_id = "acarnegie";

class BasicApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPanelIndex: 0,
      currColor: "#808080",
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
      },
    };

    this.selectColor = this.selectColor.bind(this);
    this.selectPanel = this.selectPanel.bind(this);
  }

  selectColor(newColor) {
    this.setState({
      currColor: newColor,
    });
  }

  selectPanel(newPanelIndex) {
    const newColors = this.state.colors;
    newColors[newPanelIndex] = this.state.currColor;

    this.setState({
      selectedPanelIndex: newPanelIndex,
      colors: newColors,
    });
  }

  render() {
    // a single frame of the colors lasting 10 seconds
    const frame = {
      0: {
        colors: this.state.colors,
        duration: 10,
      },
    };

    return (
      <div>
        <Header user_id={user_id} design={frame} />
        <Panels
          colors={Object.values(this.state.colors)}
          selectedIndex={this.state.selectedPanelIndex}
          selectPanel={this.selectPanel}
        />
        <ColorSelector
          selectedColor={this.state.currColor}
          selectColor={this.selectColor}
        />
      </div>
    );
  }
}

export default BasicApp;

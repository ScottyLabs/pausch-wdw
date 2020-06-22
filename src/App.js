import React, { Component } from "react";

// Components
import Panels from "./components/Panels";
import ColorSelector from "./builtin/ColorSelector";

class App extends Component {
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
    return (
      <div>
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

export default App;

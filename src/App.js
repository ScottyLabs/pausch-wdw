import React, { Component } from "react";

// Components
import Panels from "./components/Panels";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";

const user_id = "acarnegie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPanelIndex: -1,
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
        8: "#808080"
      }
    };

    this.selectColor = this.selectColor.bind(this);
    this.selectPanel = this.selectPanel.bind(this);
    this.updatePanelColor = this.updatePanelColor.bind(this);
  }

  selectColor(newColor) {
    this.setState({
      selectedPanelIndex: -1,
      currColor: newColor,
    });
  }

  selectPanel(newPanelIndex) {
    this.updatePanelColor(this.state.currColor, newPanelIndex);
    this.setState({
      selectedPanelIndex: newPanelIndex,
    });
  }

  updatePanelColor(newColor, panelIndex) {
    this.setState({
      ...colors, [panelIndex]: newColor
    });
  }

  render() {
    const frame = {
      0: {
        colors: this.state.colors,
        duration: 1
      }
    };

    return (
      <div>
        <Header user_id={user_id} design={frame} />
        <Panels
          colors={this.state.colors}
          selectedPanelIndex={this.state.selectedPanelIndex}
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

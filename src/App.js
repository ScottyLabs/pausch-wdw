import React, { Component } from "react";

// Components
import Panels from "./components/Panels";

class App extends Component {
  render() {
    const selectedPanelIndex = 0;
    const colors = ["red", "blue", "green"];

    return (
      <div>
        <Panels
          colors={Object.values(colors)}
          selectedIndex={selectedPanelIndex}
        />
      </div>
    );
  }
}

export default App;

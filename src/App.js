import React, { Component } from "react";

// Components
import Panel from "./components/Panel";

class App extends Component {
  render() {
    return (
      <div>
        <Panel color='blue' isSelected={true}></Panel>
      </div>
    );
  }
}

export default App;

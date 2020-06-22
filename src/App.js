import React, { Component } from "react";

// Components
import Panels from "./components/Panels";

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

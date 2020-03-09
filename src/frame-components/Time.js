import React, { Component } from "react";

class Time extends Component {
  //state = {  }

  render() {
    return (
      <div>
        <h1>Duration in seconds: </h1>
        <NumericInput
          min={0}
          max={30}
          value={this.props.duration}
          onChange={value => this.props.onChange(value)}
        />
      </div>
    );
  }
}

export default Time;

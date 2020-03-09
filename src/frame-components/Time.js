import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

class Time extends Component {

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

import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

class Time extends Component {

  render() {
    return (
      <div className="time-input">
        Duration:&nbsp;
        <NumericInput
          size={1}
          precision={1}
          min={0}
          max={30}
          value={this.props.duration}
          onChange={value => this.props.onChange(value)}
        />&nbsp;secs
      </div>
    );
  }
}

export default Time;

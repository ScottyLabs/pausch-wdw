import React from "react";

// assets
import img from "../assets/pausch-design.jpg";

export default function Panel(props) {
  /*
  props = {
    index: 0,
    color: '#808080',
    isSelected: false,
    selectPanel: number -> ()
  }
  */

  return (
    <div
      className="panel"
      style={{
        backgroundColor: props.color,
        borderColor: props.isSelected ? "#3f51b5" : "#808080",
      }}
      onClick={() => {
        props.selectPanel(props.index);
      }}
    >
      <img src={img} alt="Pausch Design" />
    </div>
  );
}

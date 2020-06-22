import React from "react";
import img from "../assets/pausch-design.jpg";

export default function Panel(props) {
  return (
    <div
      className="panel"
      style={{
        backgroundColor: props.color,
        borderColor: props.isSelected ? "#3f51b5" : "#808080",
      }}
      onClick={function (e) {
        props.selectPanel(props.index, e);
      }}
    >
      <img src={img} alt="Pausch Design" />
    </div>
  );
}

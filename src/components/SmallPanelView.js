import React from "react";

// assets
import img from "../assets/pausch-design.jpg";

export default function Panel(props) {
  return (
    <div
      className="small-panel"
      style={{
        backgroundColor: props.color,
      }}
    >
      <img src={img} alt="Pausch Design" />
    </div>
  );
}

import React from "react";
import Panel from "./Panel";

export default function Panels(props) {
  const menuItems = props.colors.map((color, i) => (
    <Panel
      key={i}
      index={i}
      color={color}
      isSelected={props.selectedIndex === i}
      selectPanel={props.selectPanel}
    />
  ));

  return <div id="panels">{menuItems}</div>;
}

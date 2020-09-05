import React from "react";

// components
import Panel from "./Panel";

export default function Panels(props) {
  /*
  props = {
    colors: ['#808080', '#808080', ....],
    selectedIndex: 2,
    selectPanel: number -> ()
  }
  */

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

  /*
  returns:
  <div id='panels>
    <Panel color='red' isSelected={false} />,
    <Panel color='blue' isSelected={false} />,
    <Panel color='green' isSelected={true} />,
  </div>
  */
}

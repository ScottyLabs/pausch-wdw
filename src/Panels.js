import React from 'react';
import Panel from './Panel';

export default function Panels(props) {

  /*
  props = {
    colors: ['red', 'blue', ....],
    selectedIndex: 2,
    selectPanel: number -> ()
  }
  */

  return (
    <div id='panels'>
      {props.colors.map((color, i) => (
        <Panel key={i} index={i}
          color={color} isSelected={props.selectedPanelIndex === i}
          selectPanel={props.selectPanel} />
      ))}
    </div>
  );

  /*
  <div id='panels>
    <Panel color='red' isSelected={false} />,
    <Panel color='blue' isSelected={false} />,
    <Panel color='green' isSelected={true} />,
  </div>
  */
}

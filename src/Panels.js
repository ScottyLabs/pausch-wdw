import React from 'react';
import Panel from './Panel';

export default function Panels(props) {

  /*
  props = {
    colors: ['red', 'blue', ....],
    selectedIndex: 2,
  }
  */

  return (
    <div id='panels'>
      {props.colors.map((color, i) => (
        <Panel key={i} color={color} isSelected={props.selectedIndex === i} />
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

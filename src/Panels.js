import React from 'react';
import Panel from './Panel';

export default function Panels(props) {

  /*
  props = {
    colors: ['red', 'blue', ....],
    selectedIndex: 2,
  }
  */

  let panels = [];
  for (let i = 0; i < props.colors.length; i++) {
    panels.push(
      <Panel key={i} id={i} color={props.colors[i]}
          isSelected={props.selectedIndex === i} />
    );
  }

  return <div>{panels}</div>;

  /*
  <div id='panels>
    <Panel color='red' isSelected={false} />,
    <Panel color='green' isSelected={false} />,
    <Panel color='blue' isSelected={true} />,
  </div>
  */
}

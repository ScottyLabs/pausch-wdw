import React from 'react';
import img from './assets/pausch-design.jpg';

export default function Panel(props) {

  /*
  props = {
    index: 0,
    color: 'red',
    isSelected: false,
    selectPanel: number -> ()
  }
  */

  return (
    <div 
      className='panel'
      style={{
        backgroundColor: props.color,
        borderColor: props.isSelected ? '#3f51b5' : '#808080',
      }}
      onClick={function() { 
        props.selectPanel(props.index)
      }}
    >
      <img src={img} draggable = "false" alt="Pausch Design" />
    </div>
  );
}

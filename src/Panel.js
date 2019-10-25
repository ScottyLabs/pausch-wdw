import React from 'react';
import img from './assets/pausch-design.jpg';

export default function Panel(props) {

  /*
  props = {
    color: 'red',
    isSelected: false,
  }
  */

  return (
    <div 
      className='panel'
      style={{
        backgroundColor: props.color,
        borderColor: props.isSelected ? '#3f51b5' : '#808080',
      }}
    >
      <img src={img} alt="Pausch Design" />
    </div>
  );
}

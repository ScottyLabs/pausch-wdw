import React from 'react';
import img from './assets/pausch-design.jpg';

export default function Panel(props) {

  return (
    <div
      className='small-panel'
      style={{
        backgroundColor: props.color,
        borderColor: '#808080',
      }}
      onClick={function() {
        props.selectPanel(props.index)
      }}
    >
      <img src={img} alt="Pausch Design" />
    </div>
  );
}

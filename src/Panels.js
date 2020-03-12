import React from 'react';
import Panel from './Panel';
import ScrollMenu from 'react-horizontal-scrolling-menu';

export default function Panels(props) {

  /*
  props = {
    colors: ['red', 'blue', ....],
    selectedIndex: 2,
    selectPanel: number -> ()
  }
  */
 const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };

  const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
  const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

  const alignCenter = true;
  const clickWhenDrag = false;
  const dragging = true;
  const wheel = true;

  const menuItems = props.colors.map((color, i) => (
    <Panel key={i} index={i} 
      color={color} isSelected={props.selectedIndex === i}
      selectPanel={props.selectPanel} />
  ))


  return (
    <div id='App'> 
        <ScrollMenu
          alignCenter={alignCenter}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          data= {menuItems}
          clickWhenDrag = {clickWhenDrag}
          dragging={dragging}
          wheel = {wheel}
          />
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

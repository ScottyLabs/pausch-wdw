import React from 'react';
import Panels from './Panels';
import ColorSelector from './builtin/ColorSelector';

export default function App() {
  const [selectedIndex, setIndex] = React.useState(0);
  const [colors, setColors] = React.useState({
    0: "#808080", 
    1: "#808080", 
    2: "#808080",
    3: "#808080",
    4: "#808080",
    5: "#808080",
    6: "#808080",
    7: "#808080",
    8: "#808080",
  });

  function selectPanel(newIndex) {
    setIndex(newIndex);
  }

  function updateColor(newColor) {
    setColors({ ...colors, [selectedIndex]: newColor });
  }

  return (
    <div>
      <Panels colors={Object.values(colors)} selectedIndex={selectedIndex} 
        selectPanel={selectPanel} />
      <ColorSelector selectedColor={colors[selectedIndex]} 
        updateColor={updateColor} />
    </div>
  );
}

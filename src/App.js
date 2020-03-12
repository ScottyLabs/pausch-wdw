import React, { useState } from "react";
import Panels from "./Panels";
import Header from "./builtin/Header";
import ColorSelector from "./builtin/ColorSelector";

export default function App() {
  //initial selected panel is the first one
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
    8: "#808080"
  });

  // keep track of last, most current color selected
  const [currColor, setCurrColor] = React.useState("#808080");

  function selectPanel(newIndex) {
    setIndex(newIndex);
    setColors({ ...colors, [newIndex]: currColor });
  }

  function updateColor(newColor) {
    setCurrColor(newColor);
    setColors({ ...colors, [selectedIndex]: newColor });
  }

  return (
    <div>
      <Header name="Srinu Lade" colors={colors} />
      <Panels
        colors={Object.values(colors)}
        selectedIndex={selectedIndex}
        selectPanel={selectPanel}
      />
      <ColorSelector selectedColor={currColor} updateColor={updateColor} />
    </div>
  );
}

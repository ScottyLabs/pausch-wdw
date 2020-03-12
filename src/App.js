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
    8: "#808080",
    9: "#808080",
    10: "#808080",
    11: "#808080",
    12: "#808080",
    13: "#808080",
    14: "#808080",
    15: "#808080",
    16: "#808080",
    17: "#808080",
    18: "#808080", 
    19: "#808080", 
    20: "#808080",
    21: "#808080",
    22: "#808080",
    23: "#808080",
    24: "#808080",
    25: "#808080",
    26: "#808080",
    27: "#808080",
    28: "#808080",
    29: "#808080",
    30: "#808080",
    31: "#808080",
    32: "#808080",
    33: "#808080",
    34: "#808080",
    35: "#808080",
    36: "#808080", 
    37: "#808080", 
    38: "#808080",
    39: "#808080",
    40: "#808080",
    41: "#808080",
    42: "#808080",
    43: "#808080",
    44: "#808080",
    45: "#808080",
    46: "#808080",
    47: "#808080",
    48: "#808080",
    49: "#808080",
    50: "#808080",
    51: "#808080",
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

import React from 'react';
import Panels from './Panels';

export default function App() {
  const [selectedIndex, setIndex] = React.useState(0);
  const [colors, setColors] = React.useState(["red", "blue", "green"]);

  return (
    <div>
      <Panels colors={colors} selectedIndex={selectedIndex} />
    </div>
  );
}

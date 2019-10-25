import React from 'react';
import Panels from './Panels';

export default function App() {
  const selectedIndex = 0;
  const colors = ["red", "blue", "green"];

  return (
    <div>
      <Panels colors={colors} selectedIndex={selectedIndex} />
    </div>
  );
}

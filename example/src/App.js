import React, { useMemo } from 'react'
import useDraggable from 'use-draggable'

const refStyle = {
  width: '200px',
  height: '200px',
  background: 'black',
  color: 'white',
  fontSize: '36px',
  fontFamily: 'monospace',
  userSelect: 'none',
  display: 'flex',
  cursor: 'pointer',
}

const App = () => {
  const initialPosition = useMemo(() => ({ x: 200, y: 500 }), []);
  const { ref } = useDraggable({ initialPosition });

  return (
    <div ref={ref} style={refStyle} id="die">
      <span>Drag Me :3</span>
    </div>
  );
}

export default App

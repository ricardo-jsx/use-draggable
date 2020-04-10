import React, { useMemo } from 'react'
import useDraggable from 'use-draggable'

const refStyle = {
  width: '200px',
  height: '200px',
  background: 'black',
  color: 'white',
  fontSize: '24px',
  fontFamily: 'monospace',
  userSelect: 'none',
  display: 'flex',
  cursor: 'pointer',
}

function Simple() {
  const initialPosition = useMemo(() => ({ x: 200, y: 500 }), []);
  const { ref } = useDraggable({ initialPosition });

  return (
    <div ref={ref} style={refStyle} id="simple">
      <span>Drag Me :3</span>
    </div>
  );
}

const App = () => {
  return (
    <>
      <Simple />
    </>
  );
}

export default App

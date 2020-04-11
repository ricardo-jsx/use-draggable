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
  flexDirection: 'column',
}

const handleStyle = {
  background: 'white',
  color: 'black',
  cursor: 'pointer'
}

function Simple() {
  const initialPosition = useMemo(() => ({ x: 200, y: 500 }), []);
  const { ref, refHandle } = useDraggable({ initialPosition });

  return (
    <div ref={ref} style={refStyle} id="simple">
      <span>Drag Me :3</span>

      <div ref={refHandle} style={handleStyle}>only here</div>
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

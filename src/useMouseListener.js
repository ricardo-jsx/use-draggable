import { useEffect, useState } from "react";

export default function useMouseListener(ref) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    function handleMouseDown() {
      setMouseIsPressed(true)
    }

    function handleMouseUp() {
      setMouseIsPressed(false)
    }

    function hadleMouseMove(e) {
      if (mouseIsPressed) setMousePosition({ x: e.clientX, y: e.clientY });
    }

    ref.current.addEventListener('mousedown', handleMouseDown);
    ref.current.addEventListener('mouseup', handleMouseUp);
    ref.current.addEventListener('mousemove', hadleMouseMove);

    return () => {
      ref.current.removeEventListener('mousedown', handleMouseDown);
      ref.current.removeEventListener('mouseup', handleMouseUp);
      ref.current.removeEventListener('mousemove', hadleMouseMove);
    }
  }, [ref, mouseIsPressed]);

  return { mousePosition };
}
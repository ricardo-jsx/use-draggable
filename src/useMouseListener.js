import { useEffect, useState } from "react";

export default function useMouseListener(ref) {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);

  useEffect(() => {
    function handleMouseDown(e) {
      if (ref.current.contains(e.target)) {
        setMouseIsPressed(true)
      }
    }

    function handleMouseUp() {
      setMouseIsPressed(false)
    }

    function hadleMouseMove(e) {
      if (mouseIsPressed) setMousePosition({ x: e.clientX, y: e.clientY });
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', hadleMouseMove);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', hadleMouseMove);
    }
  }, [ref, mouseIsPressed]);

  return { mousePosition };
}
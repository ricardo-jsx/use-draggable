import { useRef, useMemo } from "react";
import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";

const DEFAULT_PROPS = {
  initialPosition: null,
  onDragStart() { },
  onDrag() { },
  onDragStop() { },
};

export default function useDraggable({ initialPosition } = DEFAULT_PROPS) {
  const ref = useRef(null);
  const refHandle = useRef(null);
  const mouseProps = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouseProps, initialPosition);

  return { ref, refHandle, position };
}
import { useRef, useMemo, useEffect } from "react";

import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";
import useBounds from "./useBounds";

const DEFAULT_PROPS = {
  initialPosition: null,
  axis: "both",
  onDragStart() {},
  onDrag() {},
  onDragStop() {}
};

export default function useDraggable(props) {
  const { initialPosition, axis } = { ...DEFAULT_PROPS, ...props };

  const ref = useRef(null);
  const refHandle = useRef(null);
  const refBound = useRef(null);
  const positionProps = useMemo(() => ({ initialPosition, axis }), [
    initialPosition,
    axis
  ]);

  const mouseProps = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouseProps, positionProps);
  const boundPosition = useBounds(ref, refBound, position);

  useEffect(() => {
    ref.current.style.transform = `translate(${boundPosition.x}px, ${boundPosition.y}px)`;
  }, [boundPosition]);

  return { ref, refHandle, refBound, position: boundPosition, mouseProps };
}

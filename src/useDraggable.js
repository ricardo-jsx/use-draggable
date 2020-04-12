import { useRef, useMemo, useEffect } from "react";

import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";
import useBounds from "./useBounds";
import useLimit from "./useLimit";

const DEFAULT_PROPS = {
  initialPosition: null,
  axis: "both",
  limit: null,
  onDragStart() {},
  onDrag() {},
  onDragStop() {}
};

export default function useDraggable(props) {
  const { initialPosition, axis, limit } = { ...DEFAULT_PROPS, ...props };

  const ref = useRef(null);
  const refHandle = useRef(null);
  const refBound = useRef(null);

  const mouseProps = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouseProps, initialPosition, axis);
  const boundPosition = useBounds(ref, refBound, position);
  const limitPosition = useLimit(limit, initialPosition, boundPosition);

  useEffect(() => {
    ref.current.style.transform = `translate(${limitPosition.x}px, ${limitPosition.y}px)`;
  }, [limitPosition]);

  return { ref, refHandle, refBound, position: limitPosition, mouseProps };
}

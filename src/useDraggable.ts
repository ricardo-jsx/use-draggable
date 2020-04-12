import { useRef, useEffect } from "react";

import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";
import useBounds from "./useBounds";
import useLimit from "./useLimit";

import { DraggableProps, Draggable } from './index.types';

const DEFAULT_PROPS: DraggableProps = {
  initialPosition: null,
  axis: 'both',
  limit: null,
};

export default function useDraggable(props: DraggableProps): Draggable {
  const { initialPosition, axis, limit } = { ...DEFAULT_PROPS, ...props };

  const ref = useRef(null);
  const refHandle = useRef(null);
  const refBound = useRef(null);

  const mouse = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouse, initialPosition, axis);
  const boundPosition = useBounds(ref, refBound, position);
  const limitPosition = useLimit(limit, initialPosition, boundPosition);

  useEffect(() => {
    ref.current.style.transform = `translate(${limitPosition.x}px, ${limitPosition.y}px)`;
  }, [limitPosition]);

  return { ref, refHandle, refBound, position: limitPosition, mouse };
}

import { useRef, useEffect, useMemo } from "react";

import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";
import useBounds from "./useBounds";
import useLimit from "./useLimit";

import { PartialDraggableProps, Draggable, DraggableProps } from './index.types';

function useMergedProps(props: PartialDraggableProps): DraggableProps {
  return useMemo(() => ({
    axis: props && props.axis || 'both',
    initialPosition: props && props.initialPosition || null,
    limit: props && props.limit || null
  }), [props]);
}

export default function useDraggable(props: PartialDraggableProps): Draggable {
  const { initialPosition, axis, limit } = useMergedProps(props);

  const ref = useRef<HTMLElement>(null);
  const refHandle = useRef<HTMLElement>(null);
  const refBound = useRef<HTMLElement>(null);

  const mouse = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouse, initialPosition, axis);
  const boundPosition = useBounds(ref, refBound, position);
  const limitPosition = useLimit(initialPosition, boundPosition, limit);
  
  useEffect(() => {
    if(ref.current)
      ref.current.style.transform = `translate(${limitPosition.x}px, ${limitPosition.y}px)`;
  }, [limitPosition]);

  return { ref, refHandle, refBound, position: limitPosition, mouse };
}

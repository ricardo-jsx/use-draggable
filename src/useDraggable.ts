import { useRef, useEffect, useMemo } from "react";

import useMouseListener from "./useMouseListener";
import usePosition from "./usePosition";
import useBounds from "./useBounds";
import useLimit from "./useLimit";

import { PartialDraggableProps, Draggable, DraggableProps } from './index.types';

function useMergedProps(props: PartialDraggableProps): DraggableProps {
  return useMemo(() => ({
    axis: props.axis || 'both',
    initialPosition: props.initialPosition || { },
    limit: props.limit || { }
  }), [props]);
}

export default function useDraggable(props: PartialDraggableProps): Draggable {
  const { initialPosition, axis, limit } = useMergedProps(props);

  const ref = useRef(null);
  const refHandle = useRef(null);
  const refBound = useRef(null);

  const mouse = useMouseListener(refHandle.current ? refHandle : ref);
  const position = usePosition(ref, mouse, initialPosition, axis);
  const boundPosition = useBounds(ref, refBound, position);
  const limitPosition = useLimit(limit, boundPosition, initialPosition);

  useEffect(() => {
    const elem = ref.current ?? { style: { transform: '' }};
    elem.style.transform = `translate(${limitPosition.x}px, ${limitPosition.y}px)`;
  }, [limitPosition]);

  return { ref, refHandle, refBound, position: limitPosition, mouse };
}

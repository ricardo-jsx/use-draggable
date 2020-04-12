import { useState, useEffect, useMemo, RefObject } from "react";

import { calculateSpacing } from "./utils";
import { Position, Coords } from "./index.types";

export default function useBounds(ref: RefObject<any>, refBound: RefObject<any>, position: Position) : Position {
  const initialState: Coords = useMemo(() => ({ north: undefined, east: undefined, south: undefined, west: undefined }), []);
  const [bounds, setBounds] = useState(initialState);

  useEffect(() => {
    const domRefRect = ref.current.getBoundingClientRect();
    const width = domRefRect.right - domRefRect.left;
    const height = domRefRect.bottom - domRefRect.top;

    if (refBound.current) {
      const domBoundRect = refBound.current.getBoundingClientRect();
      const boundWidth = domBoundRect.right - domBoundRect.left;
      const boundHeight = domBoundRect.bottom - domBoundRect.top;

      const north =
        domBoundRect.top -
        domRefRect.top +
        calculateSpacing(refBound.current, 'top');

      const west =
        domBoundRect.left -
        domRefRect.left +
        calculateSpacing(refBound.current, 'left');

      const east =
        boundWidth - width - calculateSpacing(refBound.current, 'right') * 2;
        
      const south =
        boundHeight - height - calculateSpacing(refBound.current, 'bottom') * 2;

      setBounds({ north, east, south, west });
    }
  }, [ref, refBound]);

  return useMemo(() => {
    let { x, y } = position;

    if (Object.values(bounds).every(val => val === null)) return position;

    if (y! < (bounds.north ?? Number.POSITIVE_INFINITY)) y = bounds.north;
    if (y! > (bounds.south ?? Number.NEGATIVE_INFINITY)) y = bounds.south;
    if (x! < (bounds.west ?? Number.NEGATIVE_INFINITY)) x = bounds.west;
    if (x! > (bounds.east ?? Number.POSITIVE_INFINITY)) x = bounds.east;

    return { x, y };
  }, [position, bounds]);
}

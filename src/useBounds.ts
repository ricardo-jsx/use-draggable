import { useState, useEffect, useMemo, RefObject } from "react";

import { calculateSpacing } from "./utils";
import { Position, Coords } from "./index.types";

const isUndefined = (val: any) => typeof val === 'undefined';

export default function useBounds(ref: RefObject<HTMLElement>, refBound: RefObject<HTMLElement>, position: Position) : Position {
  const [bounds, setBounds] = useState<Coords>({});

  useEffect(() => {    
    if (ref.current && refBound.current) {
      const domRefRect = ref.current.getBoundingClientRect();
      const width = domRefRect.right - domRefRect.left;
      const height = domRefRect.bottom - domRefRect.top;

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
    
    const northLim = isUndefined(bounds.north) ? -9999 : bounds.north!;
    const eastLim = isUndefined(bounds.east) ? 9999 : bounds.east!;
    const southLim = isUndefined(bounds.south) ? 9999 : bounds.south!;
    const westLim = isUndefined(bounds.west) ? -9999 : bounds.west!;
    
    if (y < northLim) y = northLim;
    if (x > eastLim) x = eastLim;
    if (y > southLim) y = southLim;
    if (x < westLim) x = westLim;

    return { x, y };
  }, [position, bounds]);
}

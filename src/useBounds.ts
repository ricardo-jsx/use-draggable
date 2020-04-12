import { useState, useEffect, useMemo, RefObject } from "react";

import { calculateSpacing } from "./utils";
import { Position } from "./index.types";

export default function useBounds(ref: RefObject<any>, refBound: RefObject<any>, position: Position) : Position {
  const [bounds, setBounds] = useState({
    top: null,
    right: null,
    bottom: null,
    left: null
  });

  useEffect(() => {
    const domRefRect = ref.current.getBoundingClientRect();
    const width = domRefRect.right - domRefRect.left;
    const height = domRefRect.bottom - domRefRect.top;

    if (refBound.current) {
      const domBoundRect = refBound.current.getBoundingClientRect();
      const boundWidth = domBoundRect.right - domBoundRect.left;
      const boundHeight = domBoundRect.bottom - domBoundRect.top;

      const top =
        domBoundRect.top -
        domRefRect.top +
        calculateSpacing(refBound.current, "Top");
      const left =
        domBoundRect.left -
        domRefRect.left +
        calculateSpacing(refBound.current, "Left");
      const right =
        boundWidth - width - calculateSpacing(refBound.current, "Right") * 2;
      const bottom =
        boundHeight - height - calculateSpacing(refBound.current, "Bottom") * 2;

      setBounds({ top, right, bottom, left });
    }
  }, [ref, refBound]);

  return useMemo(() => {
    let { x, y } = position;

    if (Object.values(bounds).every(val => val === null)) return position;

    if (y < bounds.top) y = bounds.top;
    if (y > bounds.bottom) y = bounds.bottom;
    if (x < bounds.left) x = bounds.left;
    if (x > bounds.right) x = bounds.right;

    return { x, y };
  }, [position, bounds]);
}

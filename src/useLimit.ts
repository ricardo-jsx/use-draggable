import { useMemo } from "react";

import { Limit, Position } from "./index.types";

export default function useLimit(limit: Limit, initialPosition: Position, position: Position): Position {
  return useMemo(() => {
    if (!limit) return position;

    initialPosition = initialPosition || { x: 0, y: 0 };

    const minLeft = initialPosition.x - limit.left;
    const maxRight = initialPosition.x + limit.right;
    const minTop = initialPosition.y - limit.top;
    const maxBottom = initialPosition.y + limit.bottom;

    const x =
      position.x < minLeft
        ? minLeft
        : position.x > maxRight
        ? maxRight
        : position.x;
    const y =
      position.y < minTop
        ? minTop
        : position.y > maxBottom
        ? maxBottom
        : position.y;

    return { x, y };
  }, [limit, initialPosition, position]);
}

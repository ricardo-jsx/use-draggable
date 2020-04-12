import { useMemo } from "react";

import { Coords, Position } from "./index.types";

export default function useLimit(limit: Coords, currPosition: Position, initialPosition: Position): Position {
  return useMemo(() => {
    if (!limit) return currPosition;

    initialPosition = initialPosition || { x: 0, y: 0 };

    const minLeft = (initialPosition.x ?? 0) - (limit.west ?? Number.NEGATIVE_INFINITY);
    const maxRight = (initialPosition.x ?? 0) + (limit.east ?? Number.POSITIVE_INFINITY);
    const minTop = (initialPosition.y ?? 0) - (limit.north ?? Number.NEGATIVE_INFINITY);
    const maxBottom = (initialPosition.y ?? 0) + (limit.south ?? Number.POSITIVE_INFINITY);

    const x = (currPosition.x ?? 0) < minLeft ? minLeft : (currPosition.x ?? 0) > maxRight ? maxRight : currPosition.x;
    const y = (currPosition.y ?? 0) < minTop ? minTop : (currPosition.y ?? 0) > maxBottom ? maxBottom : currPosition.y;

    return { x, y };
  }, [limit, initialPosition, currPosition]);
}

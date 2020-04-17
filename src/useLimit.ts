import { useMemo } from "react";

import { Coords, Position } from "./index.types";

export default function useLimit(initialPosition: Position | null, currPosition: Position, limit: Coords | null): Position {
  if(!limit) return currPosition;

  let x = (initialPosition ? initialPosition.x : 0);
  let y = (initialPosition ? initialPosition.y : 0);

  const minLeft = x - (limit.west || 9999);
  const maxRight = x + (limit.east || 9999);
  const minTop = y - (limit.north || 9999);
  const maxBottom = y + (limit.south || 9999);
  debugger;

  x = currPosition.x < minLeft ? minLeft : currPosition.x > maxRight ? maxRight : currPosition.x;
  y = currPosition.y < minTop ? minTop : currPosition.y > maxBottom ? maxBottom : currPosition.y;

  return { x, y };
}

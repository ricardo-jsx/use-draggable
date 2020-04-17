import { useReducer, useEffect, RefObject, useMemo } from "react";
import { Mouse, Position, Action, Axis } from "./index.types";
import { getElemPosition } from "./utils";

interface State {
  currentPosition: Position,
  lastMousePosition: Position | null
}

const INITIAL_STATE = {
  currentPosition: { x: 0, y: 0 },
  lastMousePosition: null
};

export default function usePosition(ref: RefObject<HTMLElement>, mouse: Mouse, initialPosition: Position | null, axis: Axis): Position {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const currElemPosition = getElemPosition(ref.current);
  
  useEffect(() => {
    const payload = {
      x: (initialPosition && initialPosition.x) || currElemPosition.x,
      y: (initialPosition && initialPosition.y) || currElemPosition.y
    };

    dispatch({ type: "SET_INITIAL_POSITION", payload });
  }, [ref, initialPosition]);

  useEffect(
    () => dispatch({ type: "UPDATE_POSITION", payload: { mouse, axis } }),
    [mouse, axis]
  );

  return state.currentPosition;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_INITIAL_POSITION": {
      const { x, y } = action.payload;
      return { ...state, lastMousePosition: null, currentPosition: { x, y } };
    }

    case "UPDATE_POSITION": {
      const { axis, mouse } = action.payload;
      
      if (!mouse.isPressed) return { ...state, lastMousePosition: null };

      if (!state.lastMousePosition)
        return { ...state, lastMousePosition: mouse.position };

      const xDelta = ["x", "both"].includes(axis)
        ? mouse.position.x - state.lastMousePosition.x
        : 0;
      const yDelta = ["y", "both"].includes(axis)
        ? mouse.position.y - state.lastMousePosition.y
        : 0;

      const currentPosition = {
        x: state.currentPosition.x + xDelta,
        y: state.currentPosition.y + yDelta
      };

      return {
        ...state,
        currentPosition,
        lastMousePosition: mouse.position
      };
    }

    default:
      throw new Error("Unexpected action was dispatched");
  }
}
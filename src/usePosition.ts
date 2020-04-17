import { useReducer, useEffect, RefObject, useMemo } from "react";
import { Mouse, Position, Action, Axis } from "./index.types";

interface State {
  currentPosition: Position,
  lastMousePosition: Position | null
}

const INITIAL_STATE = {
  currentPosition: { x: 0, y: 0 },
  lastMousePosition: null
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_INITIAL_POSITION": {
      const { x, y } = action.payload;
      return { ...state, currentPosition: { x, y } };
    }

    case "UPDATE_POSITION": {
      const { axis, mouseProps } = action.payload;

      if (!mouseProps.isPressed) return { ...state, lastMousePosition: null };

      if (!state.lastMousePosition)
        return { ...state, lastMousePosition: mouseProps.position };

      const xDelta = ["x", "both"].includes(axis)
        ? mouseProps.position.x - state.lastMousePosition.x
        : 0;
      const yDelta = ["y", "both"].includes(axis)
        ? mouseProps.position.y - state.lastMousePosition.y
        : 0;

      const currentPosition = {
        x: state.currentPosition.x + xDelta,
        y: state.currentPosition.y + yDelta
      };

      return {
        ...state,
        currentPosition,
        lastMousePosition: mouseProps.position
      };
    }

    default:
      throw new Error("Unexpected action was dispatched");
  }
}

export default function usePosition(ref: RefObject<HTMLElement>, mouse: Mouse, initialPosition: Position | null, axis: Axis): Position {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
  const defaultInitialPosition = useMemo(() => ({
    x: ref.current && ref.current.getBoundingClientRect().x,
    y: ref.current && ref.current.getBoundingClientRect().y
  }), [ref]);

  useEffect(() => {
    const payload = {
      x: (initialPosition && initialPosition.x) || defaultInitialPosition.x,
      y: (initialPosition && initialPosition.y) || defaultInitialPosition.y
    };

    dispatch({ type: "SET_INITIAL_POSITION", payload });
  }, [ref, initialPosition]);

  useEffect(
    () => dispatch({ type: "UPDATE_POSITION", payload: { mouseProps: mouse, axis } }),
    [mouse, axis]
  );

  return state.currentPosition;
}

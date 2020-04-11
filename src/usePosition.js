import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  currentPosition: { x: 0, y: 0 },
  lastMousePosition: null
};

function reducer(state, action) {
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

export default function usePosition(ref, mouseProps, positionProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { initialPosition, axis } = positionProps;

  useEffect(() => {
    const payload = initialPosition || ref.current.getBoundingClientRect();
    dispatch({ type: "SET_INITIAL_POSITION", payload });
  }, [ref, initialPosition]);

  useEffect(
    () => dispatch({ type: "UPDATE_POSITION", payload: { mouseProps, axis } }),
    [mouseProps, axis]
  );

  return state.currentPosition;
}

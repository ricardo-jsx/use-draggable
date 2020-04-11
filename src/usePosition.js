import { useReducer, useEffect } from "react";

const INITIAL_STATE = {
  currentPosition: { x: 0, y: 0 },
  lastMousePosition: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_POSITION': {
      const { x, y } = action.payload;
      return { ...state, currentPosition: { x, y } };
    }

    case 'UPDATE_POSITION': {
      const { position, isPressed } = action.payload;

      if (!isPressed)
        return { ...state, lastMousePosition: null }

      if (!state.lastMousePosition)
        return { ...state, lastMousePosition: position };

      const xDelta = position.x - state.lastMousePosition.x;
      const yDelta = position.y - state.lastMousePosition.y;

      const currentPosition = {
        x: state.currentPosition.x + xDelta,
        y: state.currentPosition.y + yDelta,
      }

      return { ...state, currentPosition, lastMousePosition: position };
    }

    default:
      throw new Error('Unexpected action was dispatched');
  }
}

export default function usePosition(ref, mouseProps, initialPosition) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const payload = initialPosition || ref.current.getBoundingClientRect();
    dispatch({ type: 'SET_INITIAL_POSITION', payload });
  }, [ref, initialPosition]);

  useEffect(() => dispatch({ type: 'UPDATE_POSITION', payload: mouseProps }), [mouseProps]);

  useEffect(() => {
    const { x, y } = state.currentPosition;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }, [state]);

  return state;
}
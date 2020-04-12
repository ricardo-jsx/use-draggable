import { useEffect, useReducer, RefObject } from "react";

import { Mouse, Action } from './index.types';

const INITIAL_STATE: Mouse = {
  position: null,
  isPressed: false,
  isDragging: false,
  isDragStopped: false
};

function reducer(state: Mouse, action: Action) {
  switch (action.type) {
    case "MOUSE_DOWN": {
      return {
        ...state,
        isPressed: true,
        isDragStopped: false,
        position: action.payload
      };
    }

    case "MOUSE_UP": {
      return {
        ...state,
        isPressed: false,
        isDragging: false,
        isDragStopped: state.isDragging
      };
    }

    case "MOUSE_MOVE": {
      if (state.isPressed)
        return { ...state, isDragging: true, position: action.payload };

      return state;
    }

    default:
      throw new Error("Unexpected action was dispatched");
  }
}

export default function useMouseListener(ref: RefObject<any>): Mouse {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    function handleMouseDown(e) {
      if (ref.current.contains(e.target)) {
        dispatch({
          type: "MOUSE_DOWN",
          payload: { x: e.clientX, y: e.clientY }
        });
      }
    }

    function handleMouseUp() {
      dispatch({ type: "MOUSE_UP" });
    }

    function hadleMouseMove(e) {
      dispatch({ type: "MOUSE_MOVE", payload: { x: e.clientX, y: e.clientY } });
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", hadleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", hadleMouseMove);
    };
  }, [ref, dispatch]);

  return state;
}

import { RefObject } from 'react';

export interface Position {
  x: number,
  y: number
}

export interface Limit {
  top: number | null,
  right: number | null,
  bottom: number | null,
  left: number | null,
}

export interface Mouse {
  position: Position,
  isPressed: Boolean,
  isDragging: Boolean,
  isDragStopped: Boolean
}

export interface DraggableProps {
  initialPosition?: Position,
  axis?: 'x' | 'y' | 'both',
  limit?: Limit
}

export interface Draggable {
  ref: RefObject<any>,
  refHandle: RefObject<any>,
  refBound: RefObject<any>,
  position: Position,
  mouse: Mouse
}

export interface Action {
  type: String,
  payload?: any
}
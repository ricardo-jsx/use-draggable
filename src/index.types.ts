import { RefObject } from 'react';

export interface Position {
  x?: number,
  y?: number
}

export interface Coords {
  north?: number,
  east?: number,
  south?: number,
  west?: number,
}

export interface Mouse {
  position: Position,
  isPressed: Boolean,
  isDragging: Boolean,
  isDragStopped: Boolean
}

export interface PartialDraggableProps {
  initialPosition?: Position | null,
  axis?: 'x' | 'y' | 'both',
  limit?: Coords | null
}

export interface DraggableProps {
  initialPosition: Position,
  axis: 'x' | 'y' | 'both',
  limit: Coords
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
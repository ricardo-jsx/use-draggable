import { RefObject } from 'react';

export interface Position {
  x: number,
  y: number
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

export type Axis = 'x' | 'y' | 'both';

export interface PartialDraggableProps {
  initialPosition?: Position | null,
  axis?: Axis,
  limit?: Coords | null
}

export interface DraggableProps {
  initialPosition: Position | null,
  limit: Coords | null,
  axis: Axis,
}

export interface Draggable {
  ref: RefObject<HTMLElement>,
  refHandle: RefObject<HTMLElement>,
  refBound: RefObject<HTMLElement>,
  position: Position,
  mouse: Mouse
}

export interface Action {
  type: String,
  payload?: any
}
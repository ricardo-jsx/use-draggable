# use-draggable

> Small library, inspired by react-draggable, for making elements draggable

- [Demo](https://ricardo-jsx.github.io/use-draggable/)

[![NPM](https://img.shields.io/npm/v/use-draggable.svg)](https://www.npmjs.com/package/use-draggable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center">
  <img src="https://media.giphy.com/media/McJkoflZuiBCdXZU7o/giphy.gif" alt="Example of library usage" />
</p>

## Install

```bash
npm install --save use-draggable
```

## Usage

```jsx
import React from 'react';
import useDraggable from 'use-draggable';

function Example() {
  const { ref } = useDraggable();
  
  return (
    <div ref={ref}>
      I can now be moved around!
    </div>
  );
}
```

## useDraggable Props

```ts
{
  // Determines which axis the draggable can move. Accepted values:
  // - 'both' allows movement horizontally and vertically (default).
  // - 'x' limits movement to horizontal axis.
  // - 'y' limits movement to vertical axis.
  // - 'none' stops all movement.
  axis: string,
  
  // Determines in which position the element should be rendered initially.
  // The default value is null.
  initialPosition?: {
    x: number,
    y: number
  },
  
  // Determines how many pixels the draggable element can be moved from its initial position.
  // The default value is null, which means that are no limits to the element to be dragged.
  limit?: {
    top: number | null,
    right: number | null,
    bottom: number | null,
    left: number | null
  }
}
```

## useDraggable Return

```ts
{
  // The draggable element
  ref: RefObject<any>,

  // Optional property in case you want to specify an element to be used as the handle that initiates drag.
  refHandle?: RefObject<any>,
  
  // Optional property in case you want the draggable element to be bounded to the area of a parent element.
  refBound?: RefObject<any>,
  
  // The position of the draggable element.
  position: { x: number, y: number },
  
  // Mouse properties.
  mouse: {
    position: { x: number, y: number },
    isPressed: boolean,
    isDragging: boolean,
    isDragStopped: boolean
  }
}
```

## License

MIT © [ricardo-jsx](https://github.com/ricardo-jsx)

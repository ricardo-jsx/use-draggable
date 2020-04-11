import React, { useMemo } from "react";
import useDraggable from "use-draggable";
import styled from "styled-components";

import Tweet from "./Tweet";

export default { title: "useDraggable" };

const StyledHandle = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledBounds = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  border: 1px solid black;
  left: 100px;
  top: 100px;
`;

export function Default() {
  const { ref } = useDraggable();
  return <Tweet ref={ref} message="You can drag me anywhere." />;
}

export function WithInitialPosition() {
  const initialPosition = useMemo(() => ({ x: 200, y: 50 }), []);
  const { ref } = useDraggable({ initialPosition });

  return (
    <Tweet
      ref={ref}
      message="I have a start position of { x: 200, y: 50 } pixels."
    />
  );
}

export function WithDragHandle() {
  const { ref, refHandle } = useDraggable();

  return (
    <Tweet
      ref={ref}
      refHandle={refHandle}
      isDraggable={false}
      message={
        <>
          <span>You can only drag me clicking </span>
          <StyledHandle ref={refHandle}>here</StyledHandle>
          <span>.</span>
        </>
      }
    />
  );
}

export function WithTrackPosition() {
  const { ref, position } = useDraggable();

  return (
    <Tweet
      ref={ref}
      message={`I keep track of my position { x: ${position.x}px, y:${position.y}px}`}
    />
  );
}

export function WithAxis() {
  const { ref } = useDraggable({ axis: "both" });
  const { ref: refX } = useDraggable({ axis: "x" });
  const { ref: refY } = useDraggable({ axis: "y" });

  return (
    <div>
      <Tweet ref={ref} message="I can be dragged me on both axis." />
      <Tweet ref={refX} message="I can only be dragged horizontally." />
      <Tweet ref={refY} message="I can only be dragged vertically." />
    </div>
  );
}

export function WithBounds() {
  const { ref, position } = useDraggable({
    bounds: { top: 100, right: 700, bottom: 500, left: 100 }
  });

  return (
    <>
      <StyledBounds />
      <Tweet
        ref={ref}
        message={`I can only be dragged inside this box { x: ${position.x}px, y:${position.y}px}`}
      />
    </>
  );
}

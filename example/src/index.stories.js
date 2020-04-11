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
  width: 700px;
  height: 300px;
  padding: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
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
      <Tweet
        ref={ref}
        axis="both"
        message="I can be dragged me on both axis."
      />
      <Tweet
        ref={refX}
        axis="x"
        message="I can only be dragged horizontally."
      />
      <Tweet ref={refY} axis="y" message="I can only be dragged vertically." />
    </div>
  );
}

export function WithBounds() {
  const initialPosition = useMemo(() => ({ x: 0, y: 0 }), []);
  const { ref, refBound, position } = useDraggable({ initialPosition });
  const { ref: refB, refBound: refBoundB, position: positionB } = useDraggable({
    initialPosition
  });

  return (
    <>
      <StyledBounds ref={refBound}>
        <Tweet
          ref={ref}
          message={`I can only be dragged inside this box { x: ${position.x}px, y:${position.y}px}`}
        />
      </StyledBounds>
      <StyledBounds ref={refBoundB}>
        <Tweet
          ref={refB}
          message={`I can only be dragged inside this box { x: ${positionB.x}px, y:${positionB.y}px}`}
        />
      </StyledBounds>
    </>
  );
}

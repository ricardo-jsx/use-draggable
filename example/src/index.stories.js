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
  const initialPosition = useMemo(() => ({ x: 200, y: 50 }), []);
  const { ref, position } = useDraggable({ initialPosition });

  return (
    <Tweet
      ref={ref}
      message={`I keep track of my position { x: ${position.x}px, y:${position.y}px}`}
    />
  );
}

export function WithAxis() {
  const propsX = useMemo(() => ({ axis: "x" }), []);
  const propsY = useMemo(() => ({ axis: "y" }), []);

  const { ref } = useDraggable();
  const { ref: refX } = useDraggable(propsX);
  const { ref: refY } = useDraggable(propsY);

  return (
    <div>
      <Tweet
        ref={ref}
        axis="both"
        message="I can be dragged me on both axis."
        style={{ marginBottom: "1rem" }}
      />

      <Tweet
        ref={refX}
        axis="x"
        message="I can only be dragged horizontally."
        style={{ marginBottom: "1rem" }}
      />

      <Tweet ref={refY} axis="y" message="I can only be dragged vertically." />
    </div>
  );
}

export function WithMouseEvents() {
  const { ref, mouse } = useDraggable();

  return (
    <Tweet
      ref={ref}
      message={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>I listen to mouse actions.</span>
          <span>Pressed: {mouse.isPressed ? "Yes" : "No"}</span>
          <span>Dragging: {mouse.isDragging ? "Yes" : "No"}</span>
          <span>Drag Stoped: {mouse.isDragStopped ? "Yes" : "No"}</span>
        </div>
      }
    />
  );
}

export function WithBounds() {
  const initialPosition = useMemo(() => ({ x: 0, y: 0 }), []);
  const { ref, refBound } = useDraggable({ initialPosition });
  const { ref: refB, refBound: refBoundB } = useDraggable({ initialPosition });

  return (
    <>
      <StyledBounds ref={refBound}>
        <Tweet ref={ref} message={`I can only be dragged inside this box`} />
      </StyledBounds>
      <StyledBounds ref={refBoundB}>
        <Tweet ref={refB} message={`I can only be dragged inside this box`} />
      </StyledBounds>
    </>
  );
}

export function WithDirectionLimits() {
  const initialPosition = useMemo(() => ({ x: 300, y: 300 }), []);
  const limit = useMemo(
    () => ({ north: 100, east: 100, south: 100, west: 100 }),
    []
  );

  const { ref, position } = useDraggable({ initialPosition, limit });

  return (
    <Tweet
      ref={ref}
      message={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>I can only be dragged 100px in any direction.</span>
          <span>{`{ x: ${position.x}px, y:${position.y}px}`}</span>
        </div>
      }
    />
  );
}

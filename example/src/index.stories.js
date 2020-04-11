import React, { useMemo } from 'react';
import useDraggable from 'use-draggable';
import styled from 'styled-components';

import Tweet from './Tweet';

export default { title: 'useDraggable' };

const StyledHandle = styled.span`
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export function Default() {
  const { ref } = useDraggable();
  return (
    <Tweet ref={ref} message="You can drag me anywhere." />
  );
}

export function WithInitialPosition() {
  const initialPosition = useMemo(() => ({ x: 200, y: 50 }), []);
  const { ref } = useDraggable({ initialPosition });

  return (
    <Tweet ref={ref} message="I have a start position of { x: 200, y: 50 } pixels." />
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
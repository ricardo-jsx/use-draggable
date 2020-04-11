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
    <Tweet ref={ref} message="I will initially render at [200px, 50px]." />
  );
}

export function WithDragHandle() {
  const { ref, refHandle } = useDraggable();

  return (
    <Tweet
      ref={ref}
      refHandle={refHandle}
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
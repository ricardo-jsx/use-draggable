import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import tweetAuthor from "./tweet-author.jpg";

function getCursorOfTweet(props) {
  if (!props.isDraggable) return "default";
  if (props.axis === "x") return "e-resize";
  if (props.axis === "y") return "n-resize";

  return "move";
}

const StyledTweet = styled.article`
  width: 500px;
  background: #15202b;
  cursor: ${getCursorOfTweet};
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  font-family: Arial, sans-serif;

  > img {
    pointer-events: none;
    user-select: none;
    width: 50px;
    border-radius: 50px;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 8px;
    user-select: none;
  }

  .username {
    display: flex;
    color: white;

    > * {
      margin: 0 4px;
      font-size: 15px;
      color: rgb(136, 153, 166);
    }

    .name {
      font-weight: bold;
      margin-left: 0;
    }

    .middot {
      text-align: center;
      line-height: 10px;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .message {
    color: white;
    margin-top: 4px;
  }
`;

const Tweet = React.forwardRef((props, ref) => (
  <StyledTweet ref={ref} {...props}>
    <img src={tweetAuthor} alt="Tweet Author" />
    <div>
      <div className="username">
        <span className="name">Ricardo JSX</span>
        <span>@ricardo-jsx</span>
        <span className="middot">.</span>
        <span>7h</span>
      </div>
      <div className="message">{props.message}</div>
    </div>
  </StyledTweet>
));

Tweet.propTypes = {
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType })
  ]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isDraggable: PropTypes.bool,
  axis: PropTypes.oneOf(["both", "x", "y"])
};

Tweet.defaultProps = {
  isDraggable: true,
  axis: "both"
};

export default Tweet;

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

export const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:after {
    content: " ";
    display: block;
    width: 44px;
    height: 44px;
    margin: 8px;
    border-radius: 50%;
    border: 5px solid #000;
    border-color: #797979 transparent #797979 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

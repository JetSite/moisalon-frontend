import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  cursor: pointer;
`;

const NavigationRomb = ({ itemIndex, active, onClick }) => {
  return (
    <Wrapper onClick={() => onClick(itemIndex)}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6L6 0L12 6L6 12L0 6Z"
          fill={active ? "#FF0033" : "#E3E3E3"}
        />
      </svg>
    </Wrapper>
  );
};

export default NavigationRomb;

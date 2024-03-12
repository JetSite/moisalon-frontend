import styled from "styled-components";

import { laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: ${laptopBreakpoint}) {
    overflow-x: scroll;
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Tag = styled.div`
  border: 1px solid #000000;
  border-radius: 50px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 25px;
  margin-right: 12px;
  transition: all 0.1s ease-in-out;
  flex-shrink: 0;

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background: #ff0033;
    color: #fff;
    border-color: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 89px;
    min-height: 28px;
    padding: 0;
    margin-right: 7px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

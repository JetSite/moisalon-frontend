import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../../styles/variables";

export const Wrapper = styled.div`
  max-width: 1160px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  display: inline-flex;
  background-color: transparent;
  position: relative;
  top: 19px;
  flex-wrap: wrap;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    flex-wrap: nowrap;
    margin-bottom: 0;
    padding: 10px 0;
    padding-left: 20px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Item = styled.a`
  display: flex;
  width: 136px;
  margin-bottom: 9px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? "#f03" : "#fff")};
  border-radius: 50px;
  height: 36px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 9px;
  flex-shrink: 0;
  transition: 0.3s;
  background-color: ${(props) => (props.active ? "#f03" : "#000")};
  p {
    color: #fff;
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #f03;
    border: 1px solid #f03;
    p {
      color: #fff;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 131px;
    height: 28px;
    margin-right: 8px;

    &:last-child {
      margin-right: 8px;
    }
  }
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

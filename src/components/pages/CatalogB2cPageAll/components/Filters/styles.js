import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 28px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    font-size: 16px;
    margin-right: 10px;
  }
`;

export const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
    flex-shrink: 0;
    margin-right: 10px;
  }
`;

export const Label = styled.p`
  font-size: 18px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
  }
`;

export const Checkbox = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + p {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + p::before {
    content: "";
    display: inline-block;
    width: 23px;
    height: 23px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #e3e3e3;
    margin-right: 14px;
    cursor: pointer;
    background: ${(props) =>
      props.checked ? `url("/icon-check.svg") no-repeat center` : ""};
  }
  @media (max-width: ${laptopBreakpoint}) {
    & + p::before {
      margin-right: 7px;
    }
  }
`;

export const ShowAll = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 45px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    flex-shrink: 0;
    margin: 0;
    margin-right: 10px;
  }
`;

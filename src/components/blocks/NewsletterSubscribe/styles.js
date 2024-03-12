import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  padding: 57px 140px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: ${tabletBreakpoint}) {
    padding: 57px 70px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #000;
    margin: 0;
    padding-top: 62px;
  }
`;

export const Text = styled.div`
  min-width: 439px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;

  @media (max-width: ${laptopBreakpoint}) {
    min-width: 0;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    text-transform: uppercase;
  }
`;

export const InputWrap = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.label`
  position: absolute;
  bottom: 14px;
  left: 0;
  color: #fff;
  transition-duration: 0.3s;

  @media (max-width: ${laptopBreakpoint}) {
    bottom: 35px;
  }
`;

export const Input = styled.input`
  min-width: 332px;
  height: 39px;
  margin-right: 124px;
  padding: 0 0 14px 0;
  border: 0;
  border-bottom: 1px solid #fff;
  background-color: #000;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  border-radius: 0;
  -webkit-border-radius: 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;

    + ${Label} {
      font-size: 12px;
      color: #fff;
      transform: translateY(-30px);

      @media (max-width: ${laptopBreakpoint}) {
        font-size: 12px;
      }
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    min-width: 100%;
    margin: 41px 0 26px 0;
    padding: 0 0 0 5px;
  }
`;

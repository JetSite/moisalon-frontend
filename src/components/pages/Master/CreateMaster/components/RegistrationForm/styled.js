import { Field } from "react-final-form";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const Wrapper = styled.div`
  max-width: 690px;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 44px;
  }
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 90px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`;

export const Form = styled.form``;

export const WrapperForm = styled.div`
  width: 100%;
  padding-bottom: 93px;

  @media (max-width: ${laptopBreakpoint}) {
    padding-bottom: 76px;
  }
`;

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`;

export const FieldStyled = styled(Field)`
  label {
    width: fit-content;
    &:after {
      display: ${({ requiredField }) => (requiredField ? "block" : "none")};
      content: "";
      position: absolute;
      top: -3px;
      right: -11px;
      width: 7px;
      height: 7px;
      background: url("/required-icon.svg") no-repeat center;
    }
  }
`;

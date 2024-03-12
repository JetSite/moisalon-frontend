import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
  }
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 90px;
`;

export const TitleCabinet = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const TextCabinet = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin-top: 18px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const TitleServicesMobile = styled.h4`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding-top: 50px;
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    border-bottom: 1px solid #e3e3e3;
  }
`;

export const Form = styled.form``;

export const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 108px;
`;

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`;

export const ButtonWrap = styled.div`
  margin-top: 66px;
`;

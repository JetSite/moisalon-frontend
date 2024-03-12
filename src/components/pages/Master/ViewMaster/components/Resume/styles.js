import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const Wrapper = styled.div`
  padding: 0 140px;
  padding-top: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    padding: 0 20px;
  }
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`;

export const Content = styled.p`
  width: 67%;
  margin-top: 30px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
`;

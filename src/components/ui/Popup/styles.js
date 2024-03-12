import styled from "styled-components";
import { mobileBreakpoint } from "../../../../styles/variables";

export const Title = styled.p`
  display: inline-block;
  width: 319px;
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
  padding: 34px 29px 0 28px;
  margin: 0 auto;

  @media (max-width: ${mobileBreakpoint}) {
    width: auto;
    line-height: 22px;
  }
`;

export const City = styled.span`
  width: 319px;
  font-size: 14px;
  font-weight: 700;
  line-height: 25px;
  padding: 0;
`;

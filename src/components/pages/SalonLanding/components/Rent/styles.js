import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  padding: 179px 140px 163px 140px;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
    padding: 0 20px;
    padding-bottom: 60px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 90px;
  }

  @media (max-width: ${tabletBreakpoint}) {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column-reverse;
  }
`;

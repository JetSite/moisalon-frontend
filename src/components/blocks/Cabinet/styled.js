import styled from "styled-components";
import { laptopBreakpoint } from "../../../../styles/variables";

export const MainContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0;
  }
`;

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
  }
`;

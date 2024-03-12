import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-bottom: 10px;
  }
`;

export const Text = styled.p`
  display: inline-block;
  color: #a1a1a1;
  font-size: 10px;
  font-weight: 600;
`;

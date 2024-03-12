import styled from "styled-components";

import { laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 100px;
    padding: 0 20px;
    background: #fff;
  }
`;

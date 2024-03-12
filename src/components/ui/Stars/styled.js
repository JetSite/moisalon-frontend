import styled from "styled-components";

import { laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActiveStar = styled.div`
  width: 11px;
  height: 11px;
  background: url("/active-heart.svg") no-repeat center;
  margin-right: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 8px;
    height: 8px;
    background-size: contain;
  }
`;

export const DisableStar = styled.div`
  width: 11px;
  height: 11px;
  background: url("/disable-heart.svg") no-repeat center;
  margin-right: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 8px;
    height: 8px;
    background-size: contain;
  }
`;

import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  background: url("/main-search-bg.jpg") no-repeat center;
  background-size: cover;
  min-height: 523px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 100px;
    display: ${({ showSearchPopup }) => (showSearchPopup ? "block" : "none")};
    padding: 0 20px;
    background: #fff;
  }
`;

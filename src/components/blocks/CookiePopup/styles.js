import styled from "styled-components";
import { laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  display: ${(props) => (props.openCookie ? "flex" : "none")};
  position: fixed;
  z-index: 1000;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 112px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  transform: ${({ openCookie }) =>
    openCookie ? "translateY(0)" : "translateY(-100%)"};
  transition: all 0.2s;
  bottom: 0;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 10px 20px;
    height: 178px;
  }
`;

export const Text = styled.p`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    line-height: 20px;
  }
`;

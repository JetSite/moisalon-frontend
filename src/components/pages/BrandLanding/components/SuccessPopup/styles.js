import styled from "styled-components";
import { Close } from "../BrandLandingPopup/styles";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 600;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: ${({ isOpen }) => (isOpen ? 600 : -1)};
  transition: all 0.1s ease-in-out;
`;

export const Wrapper = styled.div`
  width: 40%;
  max-width: 821px;
  height: 429px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2f0f0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: ${({ isOpen }) => (isOpen ? 700 : -1)};
  transition: all 0.3s ease-in-out;

  @media (max-width: ${tabletBreakpoint}) {
    width: 60%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 90%;
    height: 329px;
  }
`;

export const Text = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;

  @media (max-width: ${tabletBreakpoint}) {
    width: 60%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const CloseSuccess = styled(Close)`
  &:hover {
    &:before,
    &:after {
      background-color: #333;
    }
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
    top: 16px;
    right: 16px;
  }
`;

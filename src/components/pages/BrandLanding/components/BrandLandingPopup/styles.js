import styled from "styled-components";
import {
  red,
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: ${({ isOpen }) => (isOpen ? 300 : -1)};
  transition: all 0.1s ease-in-out;

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Wrapper = styled.div`
  width: 90%;
  max-width: 1442px;
  height: 700px;
  display: flex;
  justify-content: space-between;
  padding: 103px 180px 0 180px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: ${({ isOpen }) => (isOpen ? 400 : -1)};
  transition: all 0.4s ease-in-out;

  @media (max-width: ${tabletBreakpoint}) {
    flex-direction: column;
    height: 90vh;
    padding: 40px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 100vh;
    padding: 20px;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Title = styled.h2`
  margin-top: 132px;
  color: ${red};
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 72px;
    font-size: 24px;
    line-height: 36px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Subtitle = styled.p`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 22px;
    font-size: 16px;
    line-height: 26px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Left = styled.div`
  max-width: 504px;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 100%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 504px;
  }
`;

export const Right = styled.div`
  max-width: 335px;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 100%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 335px;
  }
`;

export const Close = styled.div`
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;

    &:before,
    &:after {
      background-color: ${red};
    }
  }
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
    right: 16px;
    top: 16px;
  }
`;

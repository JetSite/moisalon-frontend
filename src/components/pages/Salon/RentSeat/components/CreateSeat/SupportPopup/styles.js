import styled from "styled-components";
import {
  laptopBreakpoint,
  mobileBreakpoint,
  red,
} from "../../../../../../../../styles/variables";
import Button from "../../../../../../ui/Button";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: 0.3s;

  &.fadeBg-enter {
    opacity: 0;
  }

  &.fadeBg-enter-active {
    opacity: 1;
  }

  &.fadeBg-exit {
    opacity: 1;
  }

  &.fadeBg-exit-active {
    opacity: 0;
  }

  @media (max-width: ${mobileBreakpoint}) {
    padding: 20px;
  }
`;

export const PopupWrapper = styled.div`
  width: 350px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 10000;
  position: relative;
  overflow: hidden;
  transition: 0.4s;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    max-width: 350px;
    padding: 20px;
    padding-bottom: 10px;
  }
`;

export const Text = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 14px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`;

export const CustomButton = styled(Button)`
  width: 100px;
  font-size: 12px;
  text-transform: uppercase;

  a {
    color: #fff;
  }

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

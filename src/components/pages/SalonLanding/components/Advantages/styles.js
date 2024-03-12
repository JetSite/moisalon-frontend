import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  position: relative;
  background: #000;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 40px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 40px;
  }
`;

export const Content = styled.div`
  padding: 117px 163px 69px 733px;
  color: #fff;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    padding-bottom: 60px;
  }
`;

export const Text = styled.p`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  position: relative;
  z-index: 2;

  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 60px;
    font-size: 24px;
    line-height: 42px;
  }
`;

export const List = styled.ul`
  margin-top: 74px;
  position: relative;
  z-index: 2;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 44px;
  }
`;

export const ListItem = styled.li`
  margin-left: 49px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 29.5px;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -49px;
    width: 20px;
    height: 20px;
    background: #fff;
    transform: rotate(45deg);

    @media (max-width: ${laptopBreakpoint}) {
      width: 18px;
      height: 18px;
      top: 4px;
      left: -30px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 30px;
  }
`;

export const ButtonWrap = styled.div`
  margin-left: 12.5px;
  position: relative;
  z-index: 2;
`;

export const Photo = styled.div`
  width: 721px;
  height: 599px;
  position: absolute;
  left: 25px;
  bottom: 0;
  background: url("/about-woman2.png") no-repeat center;
  background-size: cover;
  z-index: 1;

  @media (max-width: ${tabletBreakpoint}) {
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Overlay = styled.div`
  display: none;

  @media (max-width: ${tabletBreakpoint}) {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }

  @media (max-width: ${laptopBreakpoint}) {
    /* display: none; */
  }
`;

export const Arrow = styled.div`
  width: 242px;
  height: 142px;
  position: absolute;
  left: 419px;
  top: 79px;
  background: url("/about-arrow-icon.svg") no-repeat center;
  background-size: cover;
  z-index: 1;

  @media (max-width: ${tabletBreakpoint}) {
    width: 192px;
    height: 92px;
    background-size: contain;
    left: 70%;
    top: 20%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 142px;
    height: 42px;
    left: 0px;
    top: 70%;
  }
`;

export const Romb = styled.div`
  width: 68px;
  height: 68px;
  position: absolute;
  left: 95px;
  top: 341px;
  background: url("/all-romb.svg") no-repeat center;
  background-size: contain;
  z-index: 1;

  @media (max-width: ${tabletBreakpoint}) {
    width: 48px;
    height: 48px;
    background-size: contain;
    left: 20%;
    top: 25%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 48px;
    height: 48px;
    background-size: contain;
    left: 70%;
    top: 20%;
  }
`;

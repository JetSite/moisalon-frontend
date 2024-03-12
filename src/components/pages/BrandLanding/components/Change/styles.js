import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
  red,
} from "../../../../../../styles/variables";

export const BottomWrapper = styled.div`
  background: #f2f0f0;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
  }
`;

export const BottomContent = styled.div`
  max-width: 1440px;
  padding: 150px 140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    padding-bottom: 60px;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Left = styled.div`
  max-width: 580px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const ImageWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Image = styled.img`
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  max-width: 473px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const TitleBottom = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 50px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 30px;
    font-size: 24px;
    line-height: 36px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 16px;
    line-height: 26px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Items = styled.div``;

export const ButtonWrap = styled.div`
  margin-top: 100px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
  }
`;

export const Item = styled.div`
  padding-left: 50px;
  position: relative;
  font-size: 14px;
  line-height: 27px;
  margin-bottom: 30px;
  &:before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #000;
    transform: rotate(45deg);

    @media (max-width: ${tabletBreakpoint}) {
      width: 18px;
      height: 18px;
      top: 3px;
    }

    @media (max-width: ${laptopBreakpoint}) {
    }
  }

  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 15px;
    padding-left: 40px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding-left: 40px;
  }
`;

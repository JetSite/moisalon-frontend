import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 175px 140px 143px 140px;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 40px;
    padding: 20px;
    flex-direction: column-reverse;
  }
`;

export const LeftBlock = styled.div`
  width: 50.9%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 26px;
    line-height: 34px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
    font-size: 26px;
    line-height: 34px;
  }
`;

export const Text = styled.p`
  margin-top: 55px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 30px;
    font-size: 16px;
    line-height: 28px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 40px;
    font-size: 16px;
  }
`;

export const RightBlock = styled.div`
  width: 40.8%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const ImageWrap = styled.div`
  width: 100%;
  min-height: 471px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 300px;
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

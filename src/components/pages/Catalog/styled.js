import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
  mobileBreakpoint,
} from "../../../../styles/variables";

export const Wrapper = styled.div`
  padding: 0 140px;
  margin: 0 auto;
  margin-top: 48px;
  width: 1440px;
  padding-bottom: 80px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
    padding-bottom: 20px;
    margin-top: 0;
  }
`;

export const Title = styled.h2`
  display: ${({ noTitle }) => (noTitle ? "none" : "block")};
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`;

export const Content = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; */
  display: flex;
  flex-wrap: wrap;
  gap: 29px 22px;

  @media (max-width: ${laptopBreakpoint}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
    column-gap: 14px;
    row-gap: 20px;
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`;

export const ButtonWrap = styled.div`
  text-align: center;
`;

import styled from "styled-components";
import Button from "../../../../ui/Button";
import { laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  background: #000;

  @media (max-width: ${laptopBreakpoint}) {
    /* display: none; */
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    .swiper-slide {
      min-width: 185px !important;
      width: 185px !important;
    }
  }
`;

export const Content = styled.div`
  padding-top: 100px;
  padding-bottom: 60px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0;
    padding-top: 40px;
  }
`;

export const TitleWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    width: 161px;
  }
`;

export const Title = styled.p`
  display: inline-block;
  margin-bottom: 27px;
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 11px;
  left: -44px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    top: 3px;
    left: -30px;
    svg {
      width: 16px;
      height: 18px;
    }
  }
`;

export const NoSearchResults = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

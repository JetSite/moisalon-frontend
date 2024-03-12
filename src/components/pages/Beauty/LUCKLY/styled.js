import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../styles/variables";

export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 140px;
  margin: 0 auto;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0;
  }
`;

export const Content = styled.div`
  max-width: 700px;
`;
export const HideMobile = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const Image = styled.img`
  margin-bottom: 38px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;
export const ImageMobile = styled.img`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 25px;
    max-width: 400px;
  }
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 49px;
    height: 49px;
  }
`;

export const Autor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 38px;
  @media (max-width: ${laptopBreakpoint}) {
    position: absolute;
    top: 20px;
    color: #fff;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const HeadMobile = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
    display: block;
  }
`;

export const Info = styled.div`
  margin-left: 14px;
`;

export const Close = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  background: url("/beauty-close.svg") no-repeat center;
  cursor: pointer;
  right: 30px;
  top: 20px;
  z-index: 1;
`;

export const Name = styled.p`
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
  }
`;

export const About = styled(Name)``;

export const Title = styled.p`
  font-size: 24px;
  line-height: 34px;
  margin-bottom: 30px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    color: #fff;
    position: absolute;
    bottom: 30px;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }
`;

export const Description = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 50px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
    margin-bottom: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const ContentItem = styled.div`
  margin-bottom: 50px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-left: 20px;
    margin-bottom: 30px;
    padding-right: 20px;
  }
`;

export const ItemText = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 20px;
  }
`;

export const ItemTitle = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 25px;
  font-weight: 600;
  position: relative;
  padding-left: 15px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  &:after {
    position: absolute;
    content: "";
    width: 6px;
    height: 6px;
    background: #ff0033;
    transform: rotate(-45deg);
    left: 0;
    top: 11px;
    @media (max-width: ${laptopBreakpoint}) {
      top: 7px;
    }
  }
`;

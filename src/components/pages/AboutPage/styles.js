import styled from "styled-components";
import { laptopBreakpoint } from "../../../../styles/variables";

export const Wrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

export const TopWrap = styled.div`
  background: #000;

  @media (max-width: ${laptopBreakpoint}) {
    background: #fff;
  }
`;

export const Top = styled.div`
  max-width: 1440px;
  min-height: 516px;
  margin: 0 auto;
  padding: 76px 140px;
  display: flex;
  justify-content: space-between;
  color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 0;
    display: block;
    padding: 0 20px;
    color: #000;
    overflow: hidden;
  }
`;

export const Bottom = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 99px;
  min-height: 424px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    min-height: 675px;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    color: #000;
    background: #f8f8f8;
    overflow: hidden;
  }
`;

export const TopLeft = styled.div`
  width: 45%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const TopRight = styled.div`
  width: 40%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const BottomLeft = styled.div`
  width: 49%;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const BottomRight = styled.div`
  width: 38%;
  padding-top: 140px;

  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    padding-top: 0;
    width: 100%;
    z-index: 100;
  }
`;

export const MainTitle = styled.h1`
  margin-bottom: 27px;
  padding-bottom: 29px;
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  text-transform: uppercase;
  border-bottom: 1px solid #ffffff;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 30px;
    margin-bottom: 18px;
    padding: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    text-align: center;
  }
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    width: 80%;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    text-align: center;
  }
`;

export const Text = styled.p`
  margin-bottom: 58px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    z-index: 400;
  }
`;

export const TopText = styled(Text)`
  color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    color: #000;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    z-index: 0;
  }
`;

export const TopImage = styled.div`
  position: relative;
  top: -47px;
  width: 100%;
  height: 219px;
  background: url("/moi-logo-white.svg") no-repeat center;
  background-size: cover;
`;

export const TopMobileImage = styled.div`
  margin: 0 auto;
  margin-bottom: 92px;
  position: relative;
  width: 323px;
  height: 149px;
  background: url("/logo.svg") no-repeat center;
  background-size: cover;
`;

export const BottomImage = styled.div`
  width: 100%;
  height: 100%;
  background: url("/about-page-bottom.jpg") no-repeat center;
  background-size: cover;
`;

export const NumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 322px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 200px;
    padding: 0 20px;
    overflow-x: scroll;
    cursor: pointer;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 50px;
    flex-shrink: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Quantity = styled.p`
  display: block;
  margin-bottom: 36px;
  color: #ff0033;
  font-size: 48px;
  font-weight: 600;
  line-height: 25px;
  text-decoration: underline;
`;

export const NumbersText = styled(Text)`
  margin: 0;

  @media (max-width: ${laptopBreakpoint}) {
    z-index: 0;
  }
`;

export const MissionWrapper = styled.div`
  position: relative;
  min-height: 674px;
  background: #f8f8f8;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 0;
    background: #fff;
  }
`;

export const MissionContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 202px 140px 238px 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

export const MissionTitle = styled(Title)`
  margin-bottom: 56px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 18px;
  }
`;

export const MissionText = styled(Text)`
  max-width: 475px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    z-index: 0;
  }
`;

export const Romb = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 75%;
  left: 28%;
  background: url("/all-romb.svg") no-repeat center;
  background-size: contain;
`;

export const Rectangle = styled.div`
  width: 58px;
  height: 69px;
  position: absolute;
  top: 13%;
  left: 3%;
  background: url("//all-salon-img.svg") no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    top: 70%;
    left: 7%;
  }
`;

export const OneIcon = styled.div`
  width: 69px;
  height: 127px;
  position: absolute;
  bottom: 18%;
  right: 6%;
  background: url("/about-number.svg") no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    bottom: 20%;
    right: 8%;
  }
`;

export const Star = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 16%;
  right: 39%;
  background: url("/black-star-icon.svg") no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    top: 65%;
    left: 47%;
  }
`;

export const RedCircle = styled.div`
  width: 158px;
  height: 158px;
  position: absolute;
  top: 11%;
  right: 6%;
  background: url("/all-circle-red.svg") no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    right: 0;
    top: 3%;
    left: 3%;
  }
`;

export const BlackArrow = styled.div`
  width: 122px;
  height: 72px;
  position: absolute;
  bottom: 18%;
  right: 41%;
  background: url("/about-black-arrow.svg") no-repeat center;
  background-size: contain;
`;

export const WhiteArrow = styled.div`
  width: 122px;
  height: 72px;
  position: absolute;
  bottom: 8%;
  left: 50%;
  margin-left: -61px;
  background: url("/all-masters.svg") no-repeat center;
  background-size: contain;
`;

export const RedArrow = styled.div`
  width: 101px;
  height: 63px;
  position: absolute;
  bottom: 143px;
  left: 50%;
  margin-left: -51px;
  background: url("/about-arrow-icon.svg") no-repeat center;
  background-size: contain;
`;

export const SmallCircle = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 34%;
  right: 15%;
  background: url("/about-small-circle.svg") no-repeat center;
  background-size: contain;
`;

export const BlackCircle = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 4%;
  right: 7%;
  background: url("/about-black-circle.svg") no-repeat center;
  background-size: contain;
`;

export const RedHook = styled.div`
  width: 74px;
  height: 87px;
  position: absolute;
  top: 18%;
  left: 44%;
  background: url("/about-red-hook.svg") no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 57px;
    height: 67px;
    top: 13%;
    left: 67%;
  }
`;

export const BigRomb = styled.div`
  width: 386px;
  height: 386px;
  position: absolute;
  top: 18%;
  right: 16%;
  background: url("/about-romb.svg") no-repeat center;
  background-size: contain;
`;

export const LineWrapper = styled.div`
  height: 104px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

export const LineContent = styled.div`
  height: 100%;
  padding-left: 10px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LineElement = styled.div`
  display: flex;
  flex-shrink: 0;
`;

export const LineTitle = styled(Title)`
  margin: 0 20px;
  user-select: none;
`;

export const LineIcon = styled.img`
  width: 24px;
`;

export const AdvWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 77px;
  min-height: 642px;
  margin-left: -73px;
  margin-right: -73px;
  padding-top: 155px;
  padding-bottom: 162px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 0;
    flex-wrap: nowrap;
    row-gap: 0;
    margin-left: 0;
    margin-right: 0;
    padding-top: 60px;
    padding-bottom: 95px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const AdvItem = styled.div`
  width: 289px;
  height: 126px;
  margin: 0 73px;
  border-bottom: 1px solid #000;

  @media (max-width: ${laptopBreakpoint}) {
    height: 90px;
    margin: 0 24px;
    flex-shrink: 0;
  }
`;

export const AdvTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 7px;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
  }
`;

export const AdvText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;

  @media (max-width: ${laptopBreakpoint}) {
    line-height: 25px;
  }
`;

export const PosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 77px;
  min-height: 642px;
  margin-left: -73px;
  margin-right: -73px;
  padding-top: 155px;
  padding-bottom: 162px;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 0;
    flex-wrap: nowrap;
    row-gap: 0;
    margin-left: 0;
    margin-right: 0;
    padding-top: 45px;
    padding-bottom: 96px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const PosItem = styled.div`
  width: 289px;
  height: 80px;
  margin: 0 73px;
  border-bottom: 1px solid #000;

  @media (max-width: ${laptopBreakpoint}) {
    height: 80px;
    margin: 0 26px;
    flex-shrink: 0;
  }
`;

export const PosListItem = styled.div`
  position: relative;
  padding-left: 17px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;

  &:before {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    top: 11px;
    left: 0;
    background: url("/about-list-icon.svg") no-repeat center;
    background-size: contain;
  }
`;

export const BPWrapper = styled.div`
  min-height: 777px;
  background: #000;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 0;
  }
`;

export const BPContent = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;
  padding-top: 176px;
  padding-bottom: 135px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 70px 20px 44px 20px;
  }
`;

export const BPTitle = styled(Title)`
  margin-bottom: 83px;
  color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
  }
`;

export const BPList = styled.p`
  width: 40%;
  margin: 20px 0;
  margin-left: 53px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;

  a {
    color: inherit;
    text-decoration: underline;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    padding: 25px 0 25px 53px;
    width: 100%;
  }
`;

export const BPItemWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:not(:last-child) {
    margin-bottom: ${({ toggle }) => (toggle ? "0" : "42px")};
    @media (max-width: ${laptopBreakpoint}) {
      margin-bottom: ${({ toggle }) => (toggle ? "0" : "31px")};
    }
  }
`;

export const BPItem = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    line-height: 25px;
    letter-spacing: 0em;
    text-transform: none;
  }
`;

export const Plus = styled.span`
  margin-right: 30px;
  display: inline-block;
  width: 23px;
  height: 23px;
  position: relative;
  border: 1px solid #fff;
  border-radius: 50%;

  &:before {
    content: " ";
    position: absolute;
    display: block;
    background-color: #fff;
    width: 1px;
    left: 48%;
    top: 5px;
    bottom: 5px;
    z-index: 9;
    opacity: ${({ toggle }) => (toggle ? "0" : "1")};
    transition: 0.2s;
  }

  &:after {
    content: " ";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 1px;
    top: 48%;
    left: 5px;
    right: 5px;
    z-index: 9;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 25px;
  }
`;

export const RedStar = styled.div`
  width: 216px;
  height: 216px;
  position: absolute;
  top: 304px;
  right: 40%;
  background: url("/about-red-star.svg") no-repeat center;
  background-size: contain;
`;

export const WaveVertical = styled.div`
  width: 330px;
  height: 428px;
  position: absolute;
  top: 132px;
  right: 16%;
  background: url("/about-wave-vertical.svg") no-repeat center;
  background-size: contain;
`;

export const WhiteCircle = styled.div`
  width: 106px;
  height: 106px;
  position: absolute;
  top: 239px;
  right: 7%;
  background: url("/about-circle-white.svg") no-repeat center;
  background-size: contain;
`;

export const Underlined = styled.span`
  /* text-decoration: underline; */
`;

export const RedOval = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 316px;
    height: 233px;
    position: absolute;
    bottom: 60%;
    margin-bottom: -116px;
    left: 50%;
    margin-left: -158px;
    background: url("/about-mobile-oval-red.svg") no-repeat center;
    background-size: contain;
    z-index: 10;
  }
`;

export const GrayRectangle = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    position: absolute;
    width: 150px;
    height: 112px;
    top: 36%;
    margin-top: -72px;
    left: 27%;
    margin-left: -65px;
    background: #f8f8f8;
    z-index: 50;
  }
`;

export const MobileTitle = styled(Title)`
  margin: 0 auto;
  padding-top: 38px;
  width: 80%;
`;

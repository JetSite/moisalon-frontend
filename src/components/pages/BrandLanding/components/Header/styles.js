import styled from 'styled-components';
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  min-height: 868px;
  position: relative;
  background: #000 url('/for-brand-main.jpg') no-repeat center;
  background-size: cover;
  z-index: 1;
  overflow: hidden;

  @media (max-width: ${laptopBreakpoint}) {
    background-position: left;
    background-size: auto 100%;
  }
`;

export const Content = styled.div`
  padding: 29px 140px 0 140px;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    top: 38px;
    right: 139px;
    background: #ff0033;
    transform: rotate(45deg);
  }

  @media (max-width: ${tabletBreakpoint}) {
    padding: 29px 70px 0 70px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;

    &:before {
      display: none;
    }
  }
`;

export const LogoSmallWrap = styled.div`
  width: 145px;
  height: 38px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    margin-top: 10px;
  }
`;

export const LogoSmall = styled(LazyImage)`
  height: auto;
  width: auto;
`;

export const LogoSmallText = styled.p`
  width: 36.3%;
  max-width: 421px;
  margin-top: 36px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  position: relative;
  z-index: 3;

  @media (max-width: ${tabletBreakpoint}) {
    width: 50%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 24px;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`;

export const LogoBigWrap = styled.div`
  width: 40%;
  max-width: 464px;
  margin: 0 auto;

  @media (max-width: ${laptopBreakpoint}) {
    width: 60%;
    margin-top: 28px;
  }
`;

export const LogoBig = styled(LazyImage)`
  height: auto;
  width: 100%;
`;

export const LogoBigText = styled.h1`
  width: 77.7%;
  margin: 0 auto;
  margin-top: 61px;
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  z-index: 3;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 30px;
    line-height: 42px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 90%;
    margin-top: 28px;
    font-size: 24px;
    line-height: 42px;
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 65px;
  text-align: center;
  position: relative;
  z-index: 3;
`;

export const Features = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  width: 100%;
  min-height: 115px;
  color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const FeaturesItem = styled.div`
  width: 100%;
  flex: 1 1 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  border: 1px solid #fff;
  border-left: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    border-bottom: none;
  }
`;

import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  margin-top: 40px;
  margin-left: -8px;
  margin-right: -8px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0px;
  }
`;

export const ListItemWrapper = styled.div`
  margin: 0 7px;
  margin-bottom: 55.5px;
  width: 220px;
  height: 365.75px;
  padding: 29px 41px 0 41px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 160px;
    height: 266px;
    margin-bottom: 18px;
    padding: 21px 31px 0 31px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 137.5px;
  height: 137.5px;
  background: url('/service-card-bg.png') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100px;
    height: 100px;
  }
`;

export const Image = styled(LazyImage)`
  width: 101.75px;
  height: 101.75px;
  object-fit: cover;
  border-radius: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 74px;
    height: 74px;
  }
`;

export const TextBlock = styled.div`
  margin-top: 30px;
  height: 150px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 18px;
    height: 100px;
  }
`;

export const TitlePriceWrap = styled.div`
  flex-grow: 1;
`;

export const Title = styled.h3`
  min-height: 75px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: 54px;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`;

export const Price = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

export const Quantity = styled.p`
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
  }
`;

export const WrapperItemsMasters = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 55px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 55px;

  a {
    width: 217px;
    height: 436px;

    @media (max-width: ${laptopBreakpoint}) {
      width: 175px;
      height: 313px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: flex-start;
    row-gap: 18px;
    column-gap: 15px;
    margin-bottom: 40px;
  }
`;

export const TitleResults = styled.h3`
  margin-bottom: 55px;
  margin-left: 8px;
  margin-right: 8px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 28px;
    text-align: left;
    font-size: 22px;
  }
`;

export const LinkStyled = styled.a`
  display: block;
  height: 100%;
`;

export const SalonCardWrapper = styled.div`
  width: 373px;
  height: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`;

export const WrapperItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 55px;
  margin-bottom: 55px;
  margin-left: 8px;
  margin-right: 8px;

  a {
    color: #000;
  }

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: flex-start;
    row-gap: 18px;
    column-gap: 15px;
    margin-bottom: 40px;
  }
`;

export const WrapperItemsSalons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 55px;
  margin-bottom: 55px;
  margin-left: 8px;
  margin-right: 8px;

  a {
    color: #000;
  }

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: center;
    row-gap: 18px;
    column-gap: 15px;
    margin-bottom: 40px;
  }
`;

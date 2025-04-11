import styled from 'styled-components';
import { red, laptopBreakpoint } from '../../../styles/variables';

export const Wrapper = styled.div`
  padding: 0 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  width: 28.9%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    position: relative;
  }
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 335px;
  border: 1px solid #f0f0f0;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 335px;
    height: 201px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EndEducation = styled.p`
  margin-top: 44px;
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  text-align: right;
`;

export const Right = styled.div`
  width: 60.9%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-align: center;
  }
`;

export const Subtitle = styled.p`
  margin-top: 28px;
  color: ${red};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 10px;
    color: #000;
    font-size: 10px;
    font-weight: 500;
    text-align: center;
    text-decoration: underline;
  }
`;

export const DatePromoWrap = styled.div`
  margin-top: 45px;
  margin-bottom: 65px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 14px;
    margin-bottom: 12px;
  }
`;

export const DateWrap = styled.div``;

export const Date = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 3px;
    font-size: 10px;
  }
`;

export const Promo = styled(Date)``;

export const EducationInfo = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  &:not(:last-child) {
    margin-bottom: 47px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 25px;

    &:not(:last-child) {
      margin-bottom: 37px;
    }
  }
`;

export const EducationInfoBold = styled.span`
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

export const EducationConditions = styled.p`
  margin-top: 77px;
  color: #797979;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    line-height: 16px;
  }
`;

export const EducationPrice = styled.p`
  margin-top: 40px;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

export const CountdownWrap = styled.div`
  margin-top: 44px;
  @media (max-width: ${laptopBreakpoint}) {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
  }
`;

export const Rating = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
`;

export const Count = styled.p`
  font-size: 10px;
`;

export const Favorite = styled.div<{ isFavorite: boolean }>`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  background: ${({ isFavorite }) =>
      isFavorite ? 'url(/favorite-red-icon.svg)' : 'url(/favorit.svg)'}
    no-repeat center;
  cursor: pointer;
  right: 2px;
  top: 2px;

  @media (max-width: ${laptopBreakpoint}) {
    right: -5px;
    top: -6px;
  }
`;

import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { laptopBreakpoint, tabletBreakpoint } from '../../../styles/variables';
import { SlideType } from '.';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div<{
  load: boolean;
  bgColor: string;
  type: SlideType;
}>`
  background: ${({ load, bgColor }) => (load ? 'transparent' : bgColor)};
  @media (max-width: ${laptopBreakpoint}) {
    background-color: ${({ type, bgColor }) =>
      type === 'ribbon' ? '#000' : bgColor};
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
`;

export const City = styled.p`
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 10px;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding-top: 23px;
    text-align: center;
  }
`;

export const Title = styled.div<{
  empty: boolean;
  bgColor: string;
  mobileTitleWidth: boolean;
}>`
  margin-bottom: ${({ empty }) => (empty ? 0 : '55px')};
  color: ${({ bgColor }) => (bgColor === '#000' ? '#fff' : '#000')};
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    width: ${({ mobileTitleWidth }) => (mobileTitleWidth ? '150px' : 'auto')};
    margin: 0 auto;
    margin-bottom: 25px;
    color: ${({ bgColor }) => (bgColor === '#000' ? '#fff' : '#000')};
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const Content = styled.div<{
  noPadding: boolean;
  bgWithIcons: boolean;
  pt: number;
  pb: number;
  noAllPadding: boolean;
}>`
  padding: ${({ noAllPadding }) => (noAllPadding ? 0 : '0 140px')};
  padding-top: ${({ pt }) => pt + 'px'};
  padding-bottom: ${({ pb }) => pb + 'px'};
  background: ${({ bgWithIcons }) =>
      bgWithIcons ? `url("/master-slider-bg.png")` : 'transparent'}
    no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0;
    padding-left: ${({ noPadding }) => (noPadding ? '' : '15px')};
  }
`;

export const Favorite = styled.div<{ isFavorite: string }>`
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
`;

export const SwiperWrap = styled.div<{ pl: number }>`
  width: 100%;

  .swiper {
    padding: 5px 0 5px 5px;

    @media (max-width: ${laptopBreakpoint}) {
      padding: 5px;
      padding-left: ${({ pl }) => pl + 'px'};
    }
  }
`;

export const Item = styled.div`
  width: 220px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 100%;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Image = styled(Avatar)`
  width: 140px;
  height: 140px;
  margin-bottom: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100px;
    height: 100px;
  }
`;

export const BottomGoodWrapper = styled.div`
  padding: 12px 10px;
  background: #ffffff;
  border: 1px solid #ededed;
  border-top: none;
  border-radius: 5px;
  min-height: 186px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000;
  word-break: break-word;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`;

export const Specializations = styled.p`
  color: #727272;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 18px;
`;

export const MasterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
    align-items: center;
  }
`;

export const ShowAllWrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    /* display: none; */
  }
`;

export const ShowAll = styled.div<{ bgColor: string }>`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 176px;
    height: 28px;
    margin: 0 auto;
    margin-top: 33px;
    border: 1px solid ${({ bgColor }) => (bgColor === '#000' ? '#fff' : '#000')};
    border-radius: 50px;
    color: ${({ bgColor }) => (bgColor === '#000' ? '#fff' : '#000')};
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
    cursor: pointer;
  }
`;

export const BottomMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    a {
      display: flex;
      align-items: center;
      padding: 17px 21px;
      margin-top: 48px;
      background-color: #f2f0f0;
    }
  }
`;

export const MasterShareWrap = styled.div`
  padding: 10px;
  position: absolute;
  top: 142px;
  right: 4px;
  @media (max-width: ${laptopBreakpoint}) {
    top: 105px;
  }
`;

export const ButtonWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding-bottom: 110px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 50px;
    padding-bottom: 50px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 90%;
      padding: 0;
    }
  }
`;

export const ButtonWrapBrandLanding = styled.div`
  max-width: 335px;
  margin-top: 68px;
`;

export const SeeAllMain = styled.div`
  height: calc(100% - 10px);
  margin-right: 6px;
`;
export const SeeAllGoods = styled.div`
  width: 175px;
  height: 175px;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  margin-top: 5px;
  background: #f3f3f3;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    background: url('/see-all-googs2.png') no-repeat bottom;
    width: 100%;
    height: 100%;

    @media (max-width: ${laptopBreakpoint}) {
      background-size: contain;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 115px;
    height: 115px;
  }
`;
export const SeeAllBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  height: 100px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const SeeAllText = styled.p`
  color: #000;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  z-index: 1;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 5px;
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  }
`;

export const SeeAllBodyText = styled.div`
  font-size: 14px;
  line-height: 27px;
`;

export const TickIconWrap = styled.div`
  display: flex;
  align-items: center;
  width: 8px;
  height: 8px;
  margin-left: 5px;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #fff;
  margin-left: 10px;
`;

export const ChangeCity = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

export const TickIcon = styled(LazyImage)`
  height: auto;
  width: 100%;
`;

export const TitleIconWrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

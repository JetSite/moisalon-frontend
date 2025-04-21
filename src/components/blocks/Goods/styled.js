import styled from 'styled-components';

import { laptopBreakpoint } from '../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 60px;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;
`;

export const Good = styled.div`
  width: 175px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TopGoodWrapper = styled.div`
  height: 175px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

export const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background: url('/favorit.svg') no-repeat center;
  cursor: pointer;
  right: 12px;
  top: 12px;
`;

export const ActionPercentBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12px;
  left: 0;
  width: 36px;
  height: 20px;
  background-color: #ff0033;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;

export const SwiperWrap = styled.div`
  max-width: 963px;
  width: 100%;
`;

export const Image = styled(LazyImage)`
  height: 100%;
  object-fit: contain;
  width: 100%;
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
  flex-grow: 1;
`;

export const Name = styled.p`
  font-size: 14px;
  line-height: 27px;
  font-weight: 600;
  text-align: center;
  color: #000;
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const OldPrice = styled.p`
  color: #e5e5e5;
  position: relative;
  font-weight: 600;
  font-size: 14px;
  line-height: 27px;
  &:after {
    content: '';
    position: absolute;
    background: #e5e5e5;
    height: 2px;
    width: 100%;
    top: calc(50% - 1px);
    left: 0;
  }
`;

export const NewPrice = styled.p`
  font-size: 14px;
  line-height: 27px;
  color: #ff0033;
  font-weight: 600;
`;

export const AllGoods = styled.div`
  width: 176px;
  height: calc(100% - 10px);
  margin-top: 5px;
  background: #000000;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    background: url('/all-goods.svg') no-repeat bottom;
    width: 124px;
    height: 124px;
    bottom: 21px;
    left: 50%;
    margin-left: -62px;
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/all-romb.svg') no-repeat bottom;
    background-size: cover;
    width: 31px;
    height: 31px;
    top: 72px;
    left: 12px;
  }
`;

export const AllIcon = styled.div`
  position: absolute;
  background: url('/all-img.svg') no-repeat bottom;
  background-size: cover;
  width: 70px;
  height: 81px;
  top: 16px;
  right: 10px;
`;

export const AllText = styled.p`
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  line-height: 25px;
`;

export const Plus = styled.div`
  width: 56px;
  height: 56px;
  background: #f0f0f0;
  position: relative;
  border-radius: 100%;
  margin-right: 24px;
  &:after {
    content: '';
    position: absolute;
    width: 22px;
    height: 1px;
    background: #000;
    top: 50%;
    left: 50%;
    margin-left: -11px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 22px;
    background: #000;
    top: 50%;
    margin-top: -11px;
    left: 50%;
  }
`;

export const BottomText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  line-height: 25px;
`;

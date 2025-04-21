import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div<{ cabinet: boolean }>`
  margin-top: ${props => (props.cabinet ? '0' : '60px')};
  margin-bottom: ${props => (props.cabinet ? '0' : '60px')};
  padding: ${props => (props.cabinet ? '0' : '0 140px')};

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: ${props => (props.cabinet ? '0' : '30px')};
    padding: ${props => (props.cabinet ? '0' : '0 20px')};
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemToggle = styled.div<{ disabled: boolean; toggle: boolean }>`
  width: 100%;
  position: relative;
  transition: 0.3s;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 0;
  font-weight: 500;
  color: ${props => (props.disabled ? '#e2e2e2' : '#000')};
  &:before {
    display: ${props => (props.disabled ? 'none' : 'block')};
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    background: url('/arrow-next-2.svg') no-repeat center;
    background-size: contain;
    right: 0;
    transition: 0.3s;
    top: 50%;
    transform: ${props =>
      props.toggle ? 'rotate(90deg) translateX(-50%)' : 'translateY(-50%)'};
  }
`;

export const Title = styled.p<{ cabinet: boolean }>`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    display: ${props => (props.cabinet ? 'none' : 'block')};
    margin-bottom: 20px;
    font-size: 24px;
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
`;

export const SwiperWrap = styled.div`
  width: 100%;
`;

export const WrapperItem = styled.div<{ cabinet: boolean }>`
  height: ${props => (props.cabinet ? '100%' : '85%')};
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 0px 7px 1px rgba(237, 237, 237, 0.8);
  border: 1px solid #ededed;
  border-radius: 5px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 370px;
  }
`;

export const TopGoodWrapper = styled.div`
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  justify-content: flex-end;
  @media (max-width: ${laptopBreakpoint}) {
    width: 161px;
    margin: 0 auto;
  }
`;

export const Image = styled(LazyImage)`
  height: 90%;
  object-fit: contain;
  width: 90%;
`;

export const Favorite = styled.div`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const BottomGoodWrapper = styled.div`
  padding: 22px 10px;
  background: #ffffff;
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
  line-height: 20px;
  font-weight: 500;
  text-align: center;
  color: #000;
`;

export const Price = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  margin-bottom: 25px;
`;

export const OldPrice = styled.p`
  color: #a1a1a1;
  position: absolute;
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  right: -100%;
  top: 4px;
  &:after {
    content: '';
    position: absolute;
    background: #a1a1a1;
    height: 2px;
    width: 100%;
    top: calc(50% - 2px);
    left: 0;
  }
`;

export const NewPrice = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #ff0033;
  font-weight: 600;
  position: relative;
`;

export const Empty = styled.div`
  font-size: 18px;
  line-height: 30px;
`;

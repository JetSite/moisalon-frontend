import styled from 'styled-components';
import { laptopBreakpoint } from '../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0;
  }
`;

export const Content = styled.div`
  padding: 0 140px;
  width: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 31px;
  padding-bottom: 16px;
  margin-bottom: 44px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const TopImage = styled.div<{ photoUrl?: string }>`
  max-width: 1440px;
  width: 100%;
  height: 610px;
  position: relative;
  margin: 0 auto;
  background: ${({ photoUrl }) => `url(${photoUrl})`} no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    height: 310px;
  }
`;

export const Icon = styled(LazyImage)`
  height: auto;
  width: auto;
  margin-right: 13px;
`;

export const OnlineBooking = styled.span<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  width: 295px;
  height: 55px;
  position: absolute;
  top: 170px;
  right: 138px;
  background: #ff0033;
  box-shadow: ${({ disabled }) =>
    disabled ? 'none' : '  0px 16px 32px rgba(255, 0, 51, 0.3)'};
  border-radius: 43px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  ${({ disabled }) => disabled && 'background: gray;'}
  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? 'none' : ' 0px 16px 32px rgba(255, 0, 51, 0.7)'};
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    width: 216px;
    height: 35px;
    top: 30px;
    left: 50%;
    margin-left: -108px;
  }
`;

export const SalonDescription = styled.div`
  max-width: 624px;
  margin-top: 46px;
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    margin-top: 26px;
    margin-bottom: 12px;
  }
`;

export const InfoBlock = styled.div`
  width: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    min-height: initial;
    flex-direction: column;
  }
`;

export const InfoBlockContent = styled.div`
  display: flex;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  max-width: 411px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`;

export const Title = styled.p`
  margin-top: 20px;
  margin-bottom: 64px;
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  padding-bottom: 16px;
  border-bottom: 0.5px solid #a1a1a1;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
    margin-bottom: 24px;
    padding-bottom: 6px;
    font-size: 20px;
    line-height: 36px;
  }
`;

export const PriceLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Time = styled.p`
  font-size: 18px;
`;

export const Price = styled.p`
  font-size: 18px;
  flex-shrink: 0;
`;

export const Dotted = styled.div`
  border-bottom: 1px dashed rgba(80, 80, 80, 0.3);
  width: 100%;
  margin: 0 10px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Text = styled.p`
  font-size: 18px;
  margin-left: 8px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    margin-left: 0;
  }
`;

export const IconCircle = styled(LazyImage)`
  height: auto;
  width: auto;
  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 8px;
  }
`;

export const ButtonRequest = styled.span<{ disabled?: boolean }>`
  background: #ff0033;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: #fff;
  display: flex;
  width: 240px;
  height: 55px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  ${({ disabled }) => disabled && 'background: gray;'}
`;

export const InfoItem = styled.div`
  width: 266px;

  &:not(:last-child) {
    margin-right: 130px;
  }
`;

export const InfoItemTitle = styled.p`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 18px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`;

export const InfoItemTitleWide = styled(InfoItemTitle)`
  width: 266px;
  margin-bottom: 0;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
  }
`;

export const InfoItemHorisontal = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-bottom: 14px;
  }
`;

export const InfoItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const ItemWide = styled(Item)`
  width: 50%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const MobilePhotosBlock = styled.div`
  width: 100%;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
`;

export const PhotoWrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 170px;
    height: 170px;
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

export const Photo = styled(LazyImage)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const BottomButtons = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
`;

export const DesktopBlock = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

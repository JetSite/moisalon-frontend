import { Skeleton } from '@material-ui/lab';
import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.section`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin: 0 auto;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`;

export const TitlePage = styled.h2`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 17px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: none;
  }
`;

export const Subtitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 49px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 17px;
  }
`;

export const Item = styled.div`
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 40px;
  padding-left: 21px;
  margin-bottom: 19px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #f8f8f8;
  &:hover {
    border: 1px solid #000000;
    background: #fff;
  }
  @media (max-width: ${laptopBreakpoint}) {
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 25px;
    padding-left: 11px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  margin-left: 41px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 11px;
  }
`;

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    margin-bottom: 3px;
  }
`;

export const Type = styled.p`
  font-size: 18px;
  line-height: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 11px;
    line-height: 17px;
  }
`;

export const Avatar = styled(LazyImage)`
  width: 56px;
  height: 56px;
  border-radius: 100%;
`;

export const SkeletonWrap = styled(Skeleton)`
  height: 150px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 100px;
  }
`;

export const ReviewsWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const Review = styled.div`
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 40px;
  margin-bottom: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 25px;
  }
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ReviewsName = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

export const ReviewsText = styled.p`
  font-size: 14px;
  line-height: 27px;
`;

export const Back = styled.p`
  font-size: 24px;
  line-height: 27px;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    color: #f03;
    font-size: 16px;
  }
`;

export const ReviewsButton = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  height: 28px;
  margin-top: 54px;
  border: 1px solid #000;
  border-radius: 50px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
`;

import styled from 'styled-components';
import { laptopBreakpoint, red } from '../../../../../styles/variables';
import { IconStiled, TrashIcon } from 'src/components/ui/Icons/Trash';
import Link from 'next/link';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.section`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin: 0 auto;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const MobileWrapper = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
  }
`;

export const Item = styled(Link)`
  display: block;
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 40px;
  padding-left: 21px;
  margin-bottom: 19px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #f8f8f8;
  position: relative;
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
  object-fit: cover;
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 17px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 23px;
    text-transform: none;
  }
`;

export const SubTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 49px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 16px;
  padding: 0;
  border: none;
  margin: 0;
`;

export const TrashIconStyled = styled(TrashIcon)`
  opacity: 0.5;
  :hover {
    opacity: 0.7;
    fill: ${red};
  }
`;

export const ButtonStyled = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  height: 55px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 600;
  font-size: 18px;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-top: 80px;
  &:before {
    content: '';
    position: absolute;
    width: 29px;
    height: 29px;
    border-radius: 100%;
    border: 1px solid #000;
    left: 25px;
  }
  &:after {
    content: '';
    position: absolute;
    background: url('/plus-icon.svg') no-repeat center;
    width: 13px;
    height: 13px;
    left: 34px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    width: 100%;
    font-size: 14px;
    &:before {
      content: '';
      position: absolute;
      width: 19px;
      height: 19px;
      border-radius: 100%;
      border: 1px solid #000;
      left: 25px;
    }
    &:after {
      content: '';
      position: absolute;
      background: url('/plus-icon.svg') no-repeat center;
      width: 9px;
      height: 9px;
      left: 31px;
    }
  }
`;

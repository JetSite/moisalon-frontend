import styled from 'styled-components';
import {
  laptopBreakpoint,
  red,
  tabletBreakpoint,
} from '../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Content = styled.div`
  padding: 136px 140px 0 140px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${tabletBreakpoint}) {
    padding-top: 70px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 20px;
  }
`;

export const FormWrapper = styled.div`
  max-width: 505px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Input = styled.input`
  margin-top: 53px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 18px;
  outline: none;
  &:focus {
    outline: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`;

export const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  color: #797979;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`;

export const CheckboxWrapper = styled.div`
  height: 21px;
  margin-top: 28px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export const Checkbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + p {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + p::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/tick-checkbox.png") no-repeat center` : ''};
  }
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
  }
`;

export const RegisterType = styled.div`
  max-width: 576px;
`;

export const ButtonWrapper = styled.div`
  max-width: 335px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const ButtonMobileWrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    padding: 0 20px;
  }
`;

export const NotAuthorized = styled.div`
  max-width: 400px;
  margin-bottom: 40px;
  line-height: 26px;
  color: ${red};

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 18px;
  }
`;

export const BottomWrapper = styled.div`
  background: #f2f0f0;
`;

export const BottomContent = styled.div`
  max-width: 1440px;
  padding: 150px 140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${tabletBreakpoint}) {
    padding: 70px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    padding: 20px;
  }
`;

export const Left = styled.div`
  max-width: 580px;
  @media (max-width: ${tabletBreakpoint}) {
    max-width: 330px;
    margin-right: 20px;
  }
  @media (max-width: ${tabletBreakpoint}) {
    max-width: 100%;
    margin-right: 0;
  }
`;

export const ImageWrap = styled.div``;

export const Image = styled(LazyImage)`
  height: auto;
  width: auto;
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  max-width: 473px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

export const TitleBottom = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 50px;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 27px;
    line-height: 38px;
    margin-bottom: 25px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 22px;
    line-height: 31px;
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 40px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 21px;
  }
`;

export const Items = styled.div``;

export const ButtonWrap = styled.div`
  margin-top: 100px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 45px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 100%;
      padding: 0;
    }
  }
`;

export const Item = styled.div`
  padding-left: 50px;
  position: relative;
  font-size: 14px;
  line-height: 27px;
  margin-bottom: 30px;
  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #000;
    transform: rotate(45deg);
  }
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 13px;
    line-height: 21px;
    &:before {
      width: 15px;
      height: 15px;
    }
  }
`;

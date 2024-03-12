import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
  red,
} from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  background: #f2f0f0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: #f2f0f0;
`;

export const Content = styled.div`
  padding: 136px 140px 0 140px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 40px 20px;
  }
`;

export const FormWrapper = styled.div`
  max-width: 505px;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 66%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 335px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: auto;
    max-width: 100%;
  }
`;

export const Input = styled.input`
  margin-top: 53px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  background: #f2f0f0;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 18px;
  outline: none;
  &:focus {
    outline: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 90px;
    margin-bottom: 29px;
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
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${(props) =>
      props.checked ? `url("/tick-checkbox.png") no-repeat center` : ""};
  }
`;

export const Title = styled.h2`
  color: ${red};
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: left;

  @media (max-width: ${tabletBreakpoint}) {
    max-width: 74%;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
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
  background: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
  }
`;

export const BottomContent = styled.div`
  max-width: 1440px;
  padding: 150px 140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    padding-bottom: 60px;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const Left = styled.div`
  max-width: 580px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const ImageWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Image = styled.img`
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  max-width: 473px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const TitleBottom = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 50px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 30px;
    font-size: 24px;
    line-height: 36px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Desc = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 16px;
    line-height: 26px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Items = styled.div``;

export const ButtonWrap = styled.div`
  margin-top: 100px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 60px;
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
    content: "";
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #000;
    transform: rotate(45deg);

    @media (max-width: ${tabletBreakpoint}) {
      width: 18px;
      height: 18px;
      top: 3px;
    }

    @media (max-width: ${laptopBreakpoint}) {
    }
  }

  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 15px;
    padding-left: 40px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding-left: 40px;
  }
`;

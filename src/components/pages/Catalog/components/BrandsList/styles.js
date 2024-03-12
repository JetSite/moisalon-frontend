import styled from "styled-components";
import Button from "../../../../ui/Button";
import { laptopBreakpoint, red } from "../../../../../../styles/variables";

export const Wrapper = styled.div``;

export const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 0 20px;
  }
`;

export const ContentBottom = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px 72px 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 72px 20px;
  }
`;

export const Title = styled.h2`
  margin-bottom: 36px;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  color: #fff;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 24px;
    line-height: 38px;
  }
`;

export const ListContent = styled.div`
  text-align: center;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  flex-wrap: wrap;
  gap: 73px 20px;
  margin-top: 38px;

  @media (max-width: 740px) {
    display: flex;
    justify-content: flex-start;
    gap: 38px 20px;
  }
`;

export const BrandWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 175px;
  height: 265px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 103px;
    height: 161px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 176px;
  padding: 0 27px;
  background: #fff;
  transition: box-shadow 0.3s ease-in-out;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  ${BrandWrap}:hover & {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 103px;
    padding: 0 15px;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const Price = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  transition: color 0.3s ease-in-out;

  ${BrandWrap}:hover & {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 11px;
    font-weight: 400;
    line-height: 17px;
  }
`;

export const ButtonStyled = styled(Button)`
  @media (max-width: ${laptopBreakpoint}) {
    min-width: 102px;
  }
`;

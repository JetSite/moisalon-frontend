import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  max-width: 690px;
  width: 100%;
  margin-bottom: 115px;
`;

export const ImageWrap = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 411px;
  margin-bottom: 38px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 200px;
    margin-bottom: 28px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Title = styled.p`
  font-size: 40px;
  line-height: 55px;
  font-weight: 500;
  margin-bottom: 22px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 30px;
    line-height: 45px;
    margin-bottom: 16px;
  }
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #f03;
  margin-bottom: 46px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    margin-bottom: 26px;
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`;

export const SaleData = styled.div``;

export const Date = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const Promo = styled.div`
  margin-left: 150px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-top: 16px;
  }
`;

export const PromoText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const Desc = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;
  margin-top: 62px;
  margin-bottom: 62px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 32px;
    margin-bottom: 32px;
  }
`;

export const ButtonWrap = styled.div`
  width: 350px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

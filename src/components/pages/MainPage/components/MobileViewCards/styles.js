import styled from "styled-components";
import { laptopBreakpoint, red } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    display: flex;
    padding: 0 20px 16px 20px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CardWrap = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 11px;
  flex-shrink: 0;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 6px 14px;
  min-width: 88px;
  min-height: 90px;
  border: 1px solid;
  border-color: ${({ active }) => (active ? red : "#ededed")};
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: ${laptopBreakpoint}) {
    padding: 10px 5px 0 5px;
  }
`;

export const CardTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
  }
`;

export const CardIconMaster = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-star.svg") no-repeat center;
`;

export const CardIconSalon = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-crown.svg") no-repeat center;
`;

export const CardIconBrand = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-heart.svg") no-repeat center;
`;

export const CardIconBusiness = styled.div`
  width: 27px;
  height: 27px;
  background: url("/mobile-business.svg") no-repeat center;
`;

export const CardIconActions = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-actions.svg") no-repeat center;
`;

export const CardIconShop = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-shop.svg") no-repeat center;
`;

export const CardIconAdvices = styled.div`
  width: 25px;
  height: 22px;
  background: url("/mobile-advice.svg") no-repeat center;
`;

export const CardQuantity = styled.p`
  color: #a1a1a1;
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
`;

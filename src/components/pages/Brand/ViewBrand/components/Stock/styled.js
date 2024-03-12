import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 60px;
  padding: 0 140px;
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

export const SwiperWrap = styled.div`
  width: 100%;
`;

export const StockBlock = styled.div`
  display: flex;
`;

export const BlockLink = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
`;

export const MainStockBrand = styled.div`
  width: 65%;
  margin-right: 11px;
  background: #F0F0F0;
  padding: 40px 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StockBrand = styled.div`
  display: flex;
  justify-content: space-between;
  background: #F0F0F0;
  height: calc(100% - 10px);
  margin-left: 11px;
  padding: 20px 27px;

  &:first-child {
    margin-bottom: 11px;
  }

  &:last-child {
    margin-top: 11px;
  }
`;

export const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55%;
  height: 100%;
`;

export const DescriptionTitle = styled.h4`
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  color: #000000;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 27px;
  color: #000000;
`;

export const MainImage = styled.div`
  width: 272px;
  height: 272px;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 55%;
`;

export const Image = styled.div`
  width: 137px;
  height: 137px;
`;

export const GoOver = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-decoration-line: underline;
  color: #FF0033;
  cursor: pointer;
`;

export const SecondTitle = styled.h5`
  font-weight: 500;
  font-size: 25px;
  line-height: 35px;
  text-transform: uppercase;
  color: #000000;
`;





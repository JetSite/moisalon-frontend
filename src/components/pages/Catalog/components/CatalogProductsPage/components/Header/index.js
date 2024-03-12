import styled from "styled-components";
import { useState } from "react";
import { laptopBreakpoint } from "../../../../../../../../styles/variables";

const Wrapper = styled.div`
  margin-bottom: 80px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
  }
`;
const Top = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;
const Title = styled.p`
  font-size: 48px;
  font-weight: 500;
  margin-right: 20px;
  text-transform: uppercase;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    margin: 0;
    text-align: center;
  }
`;
const Country = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 11px;
    text-align: center;
  }
`;
const TextItem = styled.p`
  font-size: 14px;
  line-height: 27px;
  margin-top: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    line-height: 25px;
  }
`;
const Items = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

const WrapperItem = styled.div`
  margin-right: 150px;
  max-width: 335px;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const TitleItem = styled.p`
  font-weight: 600;
  font-size: 18px;
  position: relative;
  padding-right: 20px;
  transition: 0.3s;
  ${WrapperItem}:hover & {
    color: #f03;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    font-size: 14px;
  }
  &:before {
    width: 10px;
    height: 10px;
    position: absolute;
    content: "";
    background: url("/arrow-back.svg") no-repeat;
    background-size: contain;
    transition: 0.3s;
    transform: ${(props) =>
      props.toggle ? "rotate(270deg)" : "rotate(180deg)"};
    right: 0;
    top: 6px;
  }
`;

const Item = ({ title, text }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <WrapperItem onClick={() => setToggle(!toggle)}>
      <TitleItem toggle={toggle}>{title}</TitleItem>
      {toggle ? <TextItem>{text}</TextItem> : null}
    </WrapperItem>
  );
};

const Header = ({ brand }) => {
  return (
    <Wrapper>
      <Top>
        <Title>{brand?.name}</Title>
        <Country>{brand?.country}</Country>
      </Top>
      {brand?.minimalOrderPrice || brand?.termsDeliveryPrice ? (
        <Items>
          {brand?.minimalOrderPrice ? (
            <Item
              title={"Минимальная сумма заказа"}
              text={`от ${
                Number(brand?.minimalOrderPrice)?.toLocaleString() || 0
              } ₽`}
            />
          ) : null}
          {brand?.termsDeliveryPrice ? (
            <Item title={"Условия заказа"} text={brand?.termsDeliveryPrice} />
          ) : null}
        </Items>
      ) : null}
    </Wrapper>
  );
};

export default Header;

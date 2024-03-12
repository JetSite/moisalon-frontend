import styled from "styled-components";
import Button from "../../../../ui/Button";
import { useRouter } from "next/router";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";
import { cyrToTranslit } from "../../../../../utils/translit";
import { useContext } from "react";
import { CityContext } from "../../../../../searchContext";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 170px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 70px;
  }
`;
const Content = styled.div`
  display: flex;
  padding: 0 140px;
  justify-content: space-between;
  margin-bottom: 175px;
  @media (max-width: ${tabletBreakpoint}) {
    padding: 0 70px;
    margin-bottom: 70px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`;

const Left = styled.div`
  max-width: 596px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${tabletBreakpoint}) {
    max-width: 330px;
    margin-right: 20px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
    margin-right: 0px;
  }
`;
const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 40px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 25px;
    font-size: 27px;
    line-height: 38px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 22px;
    line-height: 31px;
  }
`;
const Text = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 40px;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 16px;
    line-height: 25px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 21px;
  }
`;

const Right = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`;

const Photo = styled.img`
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
  }
`;

const ContentItems = styled.div`
  margin-bottom: 15px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-bottom: 45px;
  }
`;

const ContentItem = styled.div`
  max-width: 400px;
  padding-left: 40px;
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
  }
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 13px;
    line-height: 21px;
    margin-bottom: 20px;
    &:before {
      width: 15px;
      height: 15px;
    }
  }
`;

const ButtonWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 100%;
      padding: 0;
    }
  }
`;

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: wrap;
  }
`;

const Item = styled.div`
  width: 25%;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #000000;
  border-top: 1px solid #000000;
  border-right: 1px solid #000000;
  &:last-child {
    border-right: none;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 50%;
    padding: 14px 24px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    &:first-child {
      border-bottom: none;
    }
    &:nth-child(2) {
      border-bottom: none;
      border-right: none;
    }
  }
`;

const ItemTitle = styled.p`
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 10px;
  text-align: center;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 33px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 28px;
  }
`;

const ItemText = styled.p`
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 14px;
    line-height: 23px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 13px;
    line-height: 18px;
  }
`;

const FastSearch = () => {
  const [city] = useContext(CityContext);
  const router = useRouter();
  return (
    <Wrapper>
      <Content>
        <Left>
          <div>
            <Title>Быстрый подбор комфортного рабочего места</Title>
            <Text>
              Творите, где и когда удобно — платформа МОЙ помогает мастерам
              находить рабочие места и кабинеты, принимать посетителей в хороших
              условиях и платить только за использованное время.{" "}
            </Text>
            <ContentItems>
              <ContentItem>
                Выбирайте рабочее место по удобному адресу и с нужным
                оборудованием.
              </ContentItem>
              <ContentItem>Оказывайте услуги вашим клиентам.</ContentItem>
              <ContentItem>Увеличивайте свой доход.</ContentItem>
            </ContentItems>
          </div>
          <ButtonWrap>
            <Button
              onClick={() => router.push(`/${cyrToTranslit(city)}/rent`)}
              size="medium"
              variant="red"
              font="medium"
            >
              Найти кабинет
            </Button>
          </ButtonWrap>
        </Left>
        <Right>
          <Photo src="/master-landing-fast.jpg" />
        </Right>
      </Content>
      <Items>
        <Item>
          <ItemTitle>1200+</ItemTitle>
          <ItemText>проверенных салонов на платформе</ItemText>
        </Item>
        <Item>
          <ItemTitle>2200+</ItemTitle>
          <ItemText>актуальных рабочих мест уже в базе</ItemText>
        </Item>
        <Item>
          <ItemTitle>150</ItemTitle>
          <ItemText>рублей — средняя стоимость часа аренды</ItemText>
        </Item>
        <Item>
          <ItemTitle>7</ItemTitle>
          <ItemText>минут — среднее время подбора кабинета</ItemText>
        </Item>
      </Items>
    </Wrapper>
  );
};

export default FastSearch;

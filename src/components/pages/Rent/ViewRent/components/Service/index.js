import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";
import { MainContainer } from "../../../../../../styles/common";

const Wrapper = styled.div`
  padding: 0 140px;
  padding-top: 70px;
  margin-bottom: 70px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 56px 20px;
    margin-bottom: 0px;
    padding-bottom: 10px;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  padding-bottom: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    padding-bottom: 16px;
    padding-top: 16px;
  }
`;

const Content = styled.div`
  width: 100%;
  border-top: 1px solid #a2a2a2;
  padding-top: 35px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 32%;
  margin-bottom: 4px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  margin-left: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`;

const Icon = styled.img``;

const Service = ({ services }) => {
  return (
    <MainContainer id="service">
      <Wrapper>
        <Title>Сервис для посетителей</Title>
        <Content>
          {services?.map((item) => (
            <Item key={item.id}>
              <Icon src="/service-rent-icon.svg" />
              <Text>{item?.title}</Text>
            </Item>
          ))}
        </Content>
      </Wrapper>
    </MainContainer>
  );
};

export default Service;

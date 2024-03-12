import MainLayout from "../../../layouts/MainLayout";
import { MainContainer } from "../../../styles/common";
import styled from "styled-components";
import { useMedia } from "use-media";
import { laptopBreakpoint, red } from "../../../../styles/variables";
import Cross from "./Cross";

const Wrapper = styled.div`
  padding: 120px 140px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 50px 20px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`;

const Left = styled.div`
  width: 215px;
  display: flex;
  justify-content: center;

  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    margin: 20px auto;
    position: relative;
  }
`;

const Right = styled.div`
  max-width: 800px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    text-align: center;
  }
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    line-height: 25px;
  }
`;

const TextLink = styled.span`
  font-weight: 700;
  text-decoration: underline;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    line-height: 25px;
  }
`;

const ButtonWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 100%;
    }
  }
`;

const FailPaymentPage = () => {
  const mobileMedia = useMedia({ maxWidth: 768 });
  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Content>
            {mobileMedia ? <Title>К сожалению платеж не прошел</Title> : null}
            <Left>
              <Cross />
            </Left>
            <Right>
              {!mobileMedia ? (
                <Title>К сожалению платеж не прошел</Title>
              ) : null}
              <Text>
                Возможно данные указаны некорректно или недостаточно средств на
                карте. Свяжитесь с нами любым удобным способом и мы вам поможем
              </Text>
              {/* <ButtonWrap>
                <Button
                  onClick={() => {
                    handleCloseSuccess();
                  }}
                  variant="red"
                >
                  Продолжить
                </Button>
              </ButtonWrap> */}
            </Right>
          </Content>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default FailPaymentPage;

import Link from 'next/link';
import MainLayout from '../../../layouts/MainLayout';
import { MainContainer } from '../../../styles/common';
import styled from 'styled-components';
import { useMedia } from 'use-media';
import { laptopBreakpoint, red } from '../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

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
  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    margin: 70px auto;
    position: relative;
    &:after {
      background: #f8f8f8;
      content: '';
      width: 200px;
      height: 200px;
      position: absolute;
      left: 100%;
      margin-left: -165px;
      border-radius: 100%;
      z-index: 0;
      top: -50px;
    }
    img {
      position: relative;
      width: 100%;
      z-index: 1;
    }
  }
`;

const Right = styled.div`
  max-width: 800px;
  padding-left: 40px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
    padding-left: 0;
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

const SuccessPaymentPage = () => {
  const mobileMedia = useMedia({ maxWidth: 768 });
  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Content>
            {mobileMedia ? <Title>СПАСИБО!</Title> : null}
            <Left>
              <LazyImage src="/successPopup.svg" alt="image" />
            </Left>
            <Right>
              {!mobileMedia ? <Title>Спасибо за ваш заказ!</Title> : null}
              <Text>
                Менеджер бренда в ближайшее время свяжется с вами. Информацию о
                заказе вы всегда можете посмотреть в{' '}
                <Link
                  href={{
                    pathname: '/masterCabinet',
                    query: { section: 'orders' },
                  }}
                >
                  <TextLink>личном кабинете.</TextLink>
                </Link>
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

export default SuccessPaymentPage;

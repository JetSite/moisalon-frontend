import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { useRouter } from 'next/router'
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'

import Line from '../../../SalonLanding/components/Line'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrapper = styled.div`
  background: #e5e5e5;
  position: relative;
`

const Content = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0 100px;
  position: relative;
  z-index: 1;
  &:after {
    position: absolute;
    top: 81px;
    left: 100px;
    content: '';
    width: 64px;
    height: 62px;
    background: url('/master-landing-start.svg') no-repeat center;
  }
  @media (max-width: ${tabletBreakpoint}) {
    padding: 0 70px;
    flex-direction: column-reverse;
    &:after {
      display: none;
    }
  }
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const Left = styled.div`
  max-width: 477px;
  margin-top: 143px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 70px;
    position: relative;
    z-index: 1;
  }
`

const Right = styled.div`
  max-width: 593px;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

const ImageWrap = styled.div`
  @media (max-width: ${tabletBreakpoint}) {
    width: 280px;
  }
`

const Image = styled.img`
  @media (max-width: ${tabletBreakpoint}) {
    width: 100%;
  }
`

const Title = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 50px;
  margin-top: 190px;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 70px;
    font-size: 27px;
    line-height: 38px;
    margin-bottom: 25px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 22px;
    line-height: 31px;
  }
`

const Items = styled.div`
  margin-bottom: 70px;
`

const ButtonWrap = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 100%;
      padding: 0;
    }
  }
`

const Item = styled.div`
  padding-left: 40px;
  position: relative;
  font-size: 14px;
  line-height: 27px;
  margin-bottom: 30px;
  &:before {
    position: absolute;
    content: '';
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
    &:before {
      width: 15px;
      height: 15px;
    }
  }
`

const Bottom = styled.div`
  margin-top: -17px;
  position: relative;
  @media (max-width: ${tabletBreakpoint}) {
    margin-top: -12px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: -11px;
  }
`

const WithPlatform = () => {
  const { city } = useAuthStore(getStoreData)
  const router = useRouter()
  return (
    <Wrapper>
      <Content>
        <Left>
          <ImageWrap>
            <Image src="/master-landing-man.png" />
          </ImageWrap>
        </Left>
        <Right>
          <Title>
            С платформой МОЙ вы качественно измените подход к работе:
          </Title>
          <Items>
            <Item>Будете принимать клиентов в лучших салонах города.</Item>
            <Item>Сэкономите до 40–60% выручки на оплате аренды.</Item>
            <Item>Освободите время для профессионального развития.</Item>
            <Item>Увеличите свой доход за счет притока новых клиентов.</Item>
          </Items>
          <ButtonWrap>
            <Button
              style={{ padding: 0 }}
              onClick={() => router.push(`/${cyrToTranslit(city)}/rent`)}
              size="medium"
              variant="red"
              font="medium"
            >
              Выбрать рабочее место
            </Button>
          </ButtonWrap>
        </Right>
      </Content>
      <Bottom>
        <Line
          text="Полная свобода творчества и новые клиенты."
          border="#000"
          bg="#e5e5e5"
          length="1180"
        />
      </Bottom>
    </Wrapper>
  )
}

export default WithPlatform

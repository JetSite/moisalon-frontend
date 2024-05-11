import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { useRouter } from 'next/router'
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'
import Link from 'next/link'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Wrapper = styled.div`
  height: 874px;
  position: relative;
  background: url('/master-landing-main.jpg') no-repeat center;
  background-size: cover;
`

const Top = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 135px;
  margin-right: 135px;
  position: relative;
  margin-bottom: 35px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 20px;
    margin-right: 20px;
  }
  &:before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    top: 0;
    right: 0;
    background: #ff0033;
    transform: rotate(45deg);
  }
`
const Desc = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
  margin-left: 135px;
  max-width: 415px;
  margin-bottom: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 20px;
    padding-right: 20px;
  }
`

const Logo = styled.img``
const Logotype = styled.img``

const LogotypeWrap = styled.div`
  margin: 0 auto;
  text-align: center;
  @media (max-width: ${tabletBreakpoint}) {
    max-width: 365px;
    img {
      width: 100%;
    }
  }
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 200px;
  }
`

const ButtonWrap = styled.div`
  margin: 0 auto;
  text-align: center;
  @media (max-width: ${laptopBreakpoint}) {
    button {
      width: 90%;
    }
  }
`

const Items = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    flex-wrap: wrap;
  }
`
const Item = styled.div`
  width: 25%;
  padding: 24px 34px;
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  border-top: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 14px;
    line-height: 21px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 50%;
    padding: 14px 24px;
  }
`

const Title = styled.h1`
  margin-top: 60px;
  margin-bottom: 70px;
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  @media (max-width: ${tabletBreakpoint}) {
    font-size: 30px;
    line-height: 40px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 24px;
    line-height: 34px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`

const Main = () => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <Top>
        <Link href={`/${city.citySlug}`}>
          <Logo src="/master-landing-logo.svg" />
        </Link>
      </Top>
      <Desc>
        Выбирайте из лучших вариантов в вашем городе и ведите бизнес комфортно
      </Desc>
      <LogotypeWrap>
        <Logotype src="/master-landing-main-logo.svg" />
      </LogotypeWrap>
      <Title>
        новый формат аренды <br />
        рабочих мест ДЛЯ БЬЮТИ-МАСТЕРОВ
      </Title>
      <ButtonWrap>
        <Button
          onClick={() => router.push(`/${cyrToTranslit(city)}/rent`)}
          size="medium"
          variant="red"
          font="medium"
        >
          Арендовать
        </Button>
      </ButtonWrap>
      <Items>
        <Item>
          30+ фильтров для детального <br /> подбора кабинета
        </Item>
        <Item>
          Парикмахерам, косметологам <br /> и 20+ мастерам
        </Item>
        <Item>
          Персональный график <br /> приема клиентов
        </Item>
        <Item>
          4000+ специалистов <br /> уже с нами
        </Item>
      </Items>
    </Wrapper>
  )
}

export default Main

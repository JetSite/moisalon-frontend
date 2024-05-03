import { useRouter } from 'next/router'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../../../styles/common'
import {
  Wrapper,
  LeftBlock,
  Title,
  Text,
  RightBlock,
  ImageWrap,
  Image,
} from './styles'
import Button from '../../../../ui/Button'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const RegInvite = () => {
  const { push } = useRouter()
  const { me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  return (
    <MainContainer>
      <Wrapper>
        <LeftBlock>
          <Title>
            Собрали ваших покупателей на одной платформе — просто предложите им
            свою продукцию
          </Title>
          <Text>
            Бьюти-платформа МОЙ объединяет представителей индустрии красоты:
            мастера находят здесь рабочие места, а салоны сдают кабинеты в
            аренду. Ежемесячно на платформу заходят 14 000+ пользователей,
            заинтересованных в закупках профессиональной косметики. Предлагаем
            присоединиться к МОЙ и продавать продукцию мелким и крупным оптом.
            Вы найдете новых постоянных покупателей в лице мастеров, управляющих
            и владельцев салонов красоты.
          </Text>
          <MobileHidden>
            <Button
              onClick={() => push(isLoggedIn ? '/masterCabinet' : '/login')}
              size="mediumNoPadding"
              variant="red"
              font="medium"
              mt="63"
            >
              Присоединиться
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              onClick={() => push(isLoggedIn ? '/masterCabinet' : '/login')}
              size="fullWidth"
              variant="red"
              font="medium"
              mt="43"
            >
              Присоединиться
            </Button>
          </MobileVisible>
        </LeftBlock>
        <RightBlock>
          <ImageWrap>
            <Image
              src="/master-landing-login.jpg"
              alt="register invite image"
            />
          </ImageWrap>
        </RightBlock>
      </Wrapper>
    </MainContainer>
  )
}

export default RegInvite

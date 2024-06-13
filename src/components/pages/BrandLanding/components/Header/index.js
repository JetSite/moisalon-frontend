import Link from 'next/link'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import {
  Wrapper,
  Content,
  LogoSmallWrap,
  LogoSmall,
  LogoSmallText,
  LogoBigWrap,
  LogoBig,
  LogoBigText,
  ButtonWrap,
  Features,
  FeaturesItem,
} from './styles'
import Button from '../../../../ui/Button'
import { useRouter } from 'next/router'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Header = ({ setOpenPopup }) => {
  const router = useRouter()
  const { city, me } = useAuthStore(getStoreData)
  const isLoggedIn = me?.info !== undefined && me?.info !== null
  return (
    <Wrapper>
      <Content>
        <LogoSmallWrap>
          <Link href={`/${city.slug}`}>
            <LogoSmall src="/for-salon-logo-small.png" alt="logo-big" />
          </Link>
        </LogoSmallWrap>
        <LogoSmallText>
          Реализуйте профессиональную косметику и другие товары для мастеров и
          салонов
        </LogoSmallText>
        <LogoBigWrap>
          <Link href={`/${city.slug}`}>
            <LogoBig src="/logo-white.svg" alt="logo-big" />
          </Link>
        </LogoBigWrap>
        <LogoBigText>
          Откройте новый канал <br /> продаж с платформой МОЙ
        </LogoBigText>
        <MobileHidden>
          <ButtonWrap>
            <Button
              // onClick={() => setOpenPopup(true)}
              onClick={() =>
                router.push(isLoggedIn ? '/masterCabinet' : '/login')
              }
              size="mediumNoPadding"
              variant="red"
              font="medium"
            >
              Обсудить сотрудничество
            </Button>
          </ButtonWrap>
        </MobileHidden>
        <MobileVisible>
          <ButtonWrap>
            <Button
              // onClick={() => setOpenPopup(true)}
              onClick={() =>
                router.push(isLoggedIn ? '/masterCabinet' : '/login')
              }
              size="fullWidth"
              variant="red"
              font="medium"
            >
              Обсудить сотрудничество
            </Button>
          </ButtonWrap>
        </MobileVisible>
      </Content>
      <Features>
        <FeaturesItem>
          14 000+ посетителей <br /> ежемесячно
        </FeaturesItem>
        <FeaturesItem>
          Персональная страница <br /> бренда
        </FeaturesItem>
        <FeaturesItem>
          Рост доходов компании <br />с первого месяца
        </FeaturesItem>
        <FeaturesItem>
          Лояльная аудитория <br /> покупателей
        </FeaturesItem>
      </Features>
    </Wrapper>
  )
}

export default Header

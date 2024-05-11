import Link from 'next/link'
import { useRouter } from 'next/router'
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
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const Header = () => {
  const { push } = useRouter()
  const { city } = useAuthStore(getStoreData)
  return (
    <Wrapper>
      <Content>
        <LogoSmallWrap>
          <Link href={`/${city.citySlug}`}>
            <LogoSmall src="/for-salon-logo-small.png" alt="logo-big" />
          </Link>
        </LogoSmallWrap>
        <LogoSmallText>
          Бьюти-платформа МОЙ поможет привлечь мастеров без вложений в рекламу
        </LogoSmallText>
        <LogoBigWrap>
          <Link href={`/${city.citySlug}`}>
            <LogoBig src="/logo-white.svg" alt="logo-big" />
          </Link>
        </LogoBigWrap>
        <LogoBigText>
          Зарабатывайте больше, сдавая <br /> в аренду свободные рабочие места
        </LogoBigText>
        <MobileHidden>
          <ButtonWrap>
            <Button
              onClick={() => push('/createLessorSalon')}
              size="medium"
              variant="red"
              font="medium"
            >
              Сдать в аренду
            </Button>
          </ButtonWrap>
        </MobileHidden>
        <MobileVisible>
          <ButtonWrap>
            <Button
              onClick={() => push('/createLessorSalon')}
              size="fullWidth"
              variant="red"
              font="medium"
            >
              Сдать в аренду
            </Button>
          </ButtonWrap>
        </MobileVisible>
      </Content>
      <Features>
        <FeaturesItem>
          Полная <br /> загруженность салона
        </FeaturesItem>
        <FeaturesItem>
          Персональный график <br /> приема клиентов
        </FeaturesItem>
        <FeaturesItem>
          Рост клиентской базы <br /> без инвестиций
        </FeaturesItem>
        <FeaturesItem>
          От 10 000 р. <br /> дополнительной прибыли
        </FeaturesItem>
      </Features>
    </Wrapper>
  )
}

export default Header

import Link from 'next/link'
import Button from '../../../ui/Button'
import { MobileVisible, MobileHidden } from '../../../../styles/common'
import {
  TopWrap,
  Top,
  Bottom,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
  MainTitle,
  Text,
  TopText,
  TopImage,
  TopMobileImage,
  BottomImage,
  RedOval,
  GrayRectangle,
  WhiteArrow,
  Rectangle,
  OneIcon,
  Star,
  RedCircle,
  BlackCircle,
  RedHook,
} from '../styles'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const AboutProject = () => {
  const { me } = useAuthStore(getStoreData)

  return (
    <>
      <TopWrap>
        <Top>
          <TopLeft>
            <MainTitle>о проекте</MainTitle>
            <TopText>
              МОЙ – beauty-платформа, объединившая и создавшая условия для
              взаимодействия мастеров, салонов красоты, брендов и клиентов в
              одном месте.
            </TopText>
            <MobileHidden>
              <Link href={me?.info ? '/masterCabinet' : '/login'}>
                <Button size="medium" variant="red" font="medium">
                  Присоединиться
                </Button>
              </Link>
            </MobileHidden>
          </TopLeft>
          <TopRight>
            <MobileHidden>
              <TopImage />
            </MobileHidden>
            <MobileVisible>
              <TopMobileImage />
            </MobileVisible>
          </TopRight>
        </Top>
      </TopWrap>
      <Bottom>
        <BottomLeft>
          <BottomImage />
        </BottomLeft>
        <BottomRight>
          <Text>
            Это экосистема, в которой есть всё и для всех представителей
            beauty-сферы: помещения, мастера, профессиональная косметика и
            оборудование, клиенты, своё комьюнити и каналы продвижения.
          </Text>
          <RedOval />
          <GrayRectangle />
        </BottomRight>
        <MobileVisible>
          <Rectangle />
          <OneIcon />
          <Star />
          <RedCircle />
          <RedHook />
          <WhiteArrow />
          <BlackCircle />
        </MobileVisible>
      </Bottom>
    </>
  )
}

export default AboutProject

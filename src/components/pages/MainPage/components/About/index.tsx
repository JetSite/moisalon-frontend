import { useRouter } from 'next/router'
import Link from 'next/link'
import { MainContainer } from '../../../../../styles/common'
import Button from '../../../../ui/Button'
import {
  Wrapper,
  Title,
  Info,
  Content,
  InfoItem,
  InfoItemTitle,
  InfoItemText,
  Bottom,
  Left,
  Right,
  BottomContentLeft,
  BottomContentTitle,
  BottomContentText,
  BottomContentRight,
  RombIcon,
  ButtonWrapper,
  MobileLogo,
  MobileAssetMaster,
  MobileAssetSalon,
  MobileAssetBusiness,
  IBgImages,
} from './styled'
import goalIdObjects from '../../../../../lib/goalIdObjects'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { FC } from 'react'

const About: FC = () => {
  const { me } = useAuthStore(getStoreData)
  let leftImage: IBgImages
  let rightImage: IBgImages
  let leftImageWidth
  let rightImageWidth
  let leftImageHeight
  let rightImageHeight
  let leftImageTop
  let rightImageTop
  const router = useRouter()
  const type = router.pathname.substring(1)
  if (type == '') {
    leftImage = 'leftMain'
    leftImageWidth = 337
    leftImageHeight = 400
    leftImageTop = 401
    rightImage = 'rightMain'
    rightImageWidth = 423
    rightImageHeight = 358
    rightImageTop = 329
  } else if (type == 'master') {
    leftImage = 'leftMaster'
    leftImageWidth = 630
    leftImageHeight = 426
    leftImageTop = 426
    rightImage = 'rightMaster'
    rightImageWidth = 490
    rightImageHeight = 407
    rightImageTop = 353
  } else {
    leftImage = 'left'
    leftImageWidth = 381
    leftImageHeight = 452
    leftImageTop = 452
    rightImage = 'right'
    rightImageWidth = 432
    rightImageHeight = 358
    rightImageTop = 326
  }

  const { regMaster, moreInfoMaster, regSalon, moreInfoSalon } = goalIdObjects(
    router.pathname,
  )

  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <RombIcon />
          <Title>О платформе</Title>
          <MobileLogo />
          <Info>
            <InfoItem>
              <InfoItemTitle>Свободные мастера</InfoItemTitle>
              <InfoItemText>
                Здесь профессионалы индустрии красоты и здоровья заявляют о себе
              </InfoItemText>
              <MobileAssetMaster />
            </InfoItem>
            <InfoItem>
              <InfoItemTitle>Более 2000 салонов</InfoItemTitle>
              <InfoItemText>
                Каждый день к нам присоединяются новые мастера и партнёры
              </InfoItemText>
              <MobileAssetSalon />
            </InfoItem>
            <InfoItem>
              <InfoItemTitle>География — весь мир</InfoItemTitle>
              <InfoItemText>
                Открывайте новые бизнес-возможности, где бы вы ни находились
              </InfoItemText>
              <MobileAssetBusiness />
            </InfoItem>
          </Info>
        </Content>
        <Bottom>
          <Left>
            <BottomContentLeft
              image={leftImage}
              imageWidth={leftImageWidth}
              imageHeight={leftImageHeight}
              imageTop={leftImageTop}
            >
              <BottomContentTitle>Вы – мастер?</BottomContentTitle>
              <BottomContentText>
                Расскажите о себе, бронируйте удобное место рядом с клиентом в
                подходящее вам время. Укажите свои навыки в анкете – и добро
                пожаловать в сообщество!
              </BottomContentText>
            </BottomContentLeft>
            <ButtonWrapper>
              <Link href={me?.info ? '/createMaster' : '/login'}>
                <Button
                  size="fullWidth"
                  variant="red"
                  onClick={() => {
                    ;(window as any).dataLayer.push({
                      event: 'event',
                      eventProps: {
                        category: 'click',
                        action: regMaster,
                      },
                    })
                  }}
                >
                  Зарегистрироваться как мастер
                </Button>
              </Link>
              <noindex>
                <Link href="/for_master" target="_blank" rel="nofollow">
                  <Button
                    size="fullWidth"
                    variant="darkTransparent"
                    onClick={() => {
                      ;(window as any).dataLayer.push({
                        event: 'event',
                        eventProps: {
                          category: 'click',
                          action: moreInfoMaster,
                        },
                      })
                    }}
                  >
                    Больше информации
                  </Button>
                </Link>
              </noindex>
            </ButtonWrapper>
          </Left>
          <Right>
            <BottomContentRight
              image={rightImage}
              imageWidth={rightImageWidth}
              imageHeight={rightImageHeight}
              imageTop={rightImageTop}
            >
              <BottomContentTitle>вы – владелец салона?</BottomContentTitle>
              <BottomContentText>
                Расскажите о своем салоне, рабочих местах и возможностях — и
                начните получать заявки от мастеров. Повышайте рейтинг и
                привлекайте больше крутых профессионалов.
              </BottomContentText>
            </BottomContentRight>
            <ButtonWrapper>
              <Link href={me?.info ? '/createSalon' : '/login'}>
                <Button
                  size="fullWidth"
                  variant="red"
                  onClick={() => {
                    ;(window as any).dataLayer.push({
                      event: 'event',
                      eventProps: {
                        category: 'click',
                        action: regSalon,
                      },
                    })
                  }}
                >
                  Зарегистрироваться как салон
                </Button>
              </Link>
              <noindex>
                <Link href="/for_salon" target="_blank" rel="nofollow">
                  <Button
                    size="fullWidth"
                    variant="darkBorder"
                    onClick={() => {
                      ;(window as any).dataLayer.push({
                        event: 'event',
                        eventProps: {
                          category: 'click',
                          action: moreInfoSalon,
                        },
                      })
                    }}
                  >
                    Больше информации
                  </Button>
                </Link>
              </noindex>
            </ButtonWrapper>
          </Right>
        </Bottom>
      </MainContainer>
    </Wrapper>
  )
}

export default About

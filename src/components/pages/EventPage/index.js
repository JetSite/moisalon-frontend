import { useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Ribbon from '../../pages/MainPage/components/Ribbon'
import Button from '../../ui/Button'
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from '../../../styles/common'
import {
  Wrapper,
  Content,
  Left,
  ImageWrap,
  Image,
  Right,
  Title,
  DatePromoWrap,
  DateWrap,
  Date,
  Address,
  Promo,
  EventInfo,
  EventConditions,
  CountdownWrap,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import Countdown from '../../blocks/Countdown'
import { cyrToTranslit } from '../../../utils/translit'
import ChatMessagePopup from '../../ui/ChatMessagePopup'
import { PHOTO_URL } from '../../../variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const EventPage = ({ event, beautyCategories, beautyAllContent }) => {
  const router = useRouter()
  const { city, me } = useAuthStore(getStoreData)
  const [chatMessagePopup, setChatMessagePopup] = useState(false)

  const originInfo = item => {
    switch (item?.origin) {
      case 'MASTER':
        return {
          originType: 'Мастер',
          originName: item.masterOrigin?.name,
          customTitle: `у мастера ${item.masterOrigin?.name}`,
          buttonLink: 'master',
          originLink: `/${cyrToTranslit(
            item?.masterOrigin?.addressFull?.city || city,
          )}/master/${item?.originId}`,
        }
      case 'SALON':
        return {
          originType: 'Салон',
          originName: item.salonOrigin?.name,
          customTitle: `в салоне ${item.salonOrigin?.name}`,
          buttonLink: 'salon',
          originLink: `/${cyrToTranslit(
            item?.salonOrigin?.address?.city || city,
          )}/salon/${item?.originId}`,
        }
      case 'BRAND':
        return {
          originType: 'Бренд',
          originName: item.brandOrigin?.name,
          customTitle: `у бренда ${item.brandOrigin?.name}`,
          buttonLink: 'brand',
          originLink: `/${cyrToTranslit(
            item?.brandOrigin?.addressFull?.city || city,
          )}/brand/${item?.originId}`,
        }
    }
  }

  const eventButtonHandler = () => {
    if (event.originId) {
      router.push(`${originInfo(event).originLink}`)
    } else {
      setChatMessagePopup(true)
    }
  }

  return (
    <MainLayout>
      <ChatMessagePopup
        open={chatMessagePopup}
        setChatMessagePopup={setChatMessagePopup}
        me={me}
        userId={event.ownerId}
        buttonText="Записаться"
        successText="Заявка отправлена"
      />
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <BackButton
            type="Все мероприятия"
            // name={originInfo(event).originName}
            onlyType
            link={'/events'}
          />
          <Content>
            <Left>
              <ImageWrap>
                <Image
                  alt="photo"
                  src={`${PHOTO_URL}${event?.photoId}/original`}
                />
              </ImageWrap>
              <CountdownWrap>
                <Countdown
                  titleStart="До начала мероприятия"
                  titleEnd="До окончания мероприятия"
                  text="Мероприятие завершено"
                  dateStart={event?.dateStart}
                  dateEnd={event?.dateEnd}
                  align="right"
                />
              </CountdownWrap>
            </Left>
            <Right>
              <MobileHidden>
                <Title>
                  {event?.title}
                  {/* {originInfo(event).customTitle} */}
                </Title>
                {/* <Subtitle>
                  {originInfo(event).originType} {originInfo(event).originName}
                </Subtitle> */}
              </MobileHidden>
              <MobileVisible>
                {/* <Link href={originInfo(event).originLink} passHref>
                  <Subtitle>
                    {originInfo(event)?.originType}{" "}
                    {originInfo(event)?.originName}
                  </Subtitle>
                </Link> */}
                <Title>{event.title}</Title>
              </MobileVisible>
              <DatePromoWrap>
                <DateWrap>
                  <Date>
                    Дата начала:&nbsp;
                    {moment(event?.dateStart).format('DD MMMM YYYY HH:MM')}
                  </Date>
                  <Date>
                    Дата окончания:&nbsp;
                    {moment(event?.dateEnd).format('DD MMMM YYYY HH:MM')}
                  </Date>
                </DateWrap>
                {event?.promo ? (
                  <Promo>
                    Промокод <br />
                    {event?.promo}
                  </Promo>
                ) : null}
              </DatePromoWrap>
              {event?.address ? (
                <Address>Адрес:&nbsp;{event.address}</Address>
              ) : null}
              <EventInfo
                dangerouslySetInnerHTML={{
                  __html: event.desc,
                }}
              />
              {event?.conditions ? (
                <EventConditions>{event?.conditions}</EventConditions>
              ) : null}
              <MobileHidden>
                <Button
                  onClick={eventButtonHandler}
                  size="mediumNoPadding"
                  variant="red"
                  font="medium"
                  mt="70"
                >
                  Посетить мероприятие
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  onClick={eventButtonHandler}
                  size="mediumNoPadding"
                  variant="red"
                  font="popUp"
                >
                  Посетить мероприятие
                </Button>
              </MobileVisible>
            </Right>
          </Content>
        </Wrapper>
      </MainContainer>
      <Ribbon
        title="Бьюти-лента"
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
      />
    </MainLayout>
  )
}

export default EventPage

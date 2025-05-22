import { FC } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Ribbon from '../MainPage/components/Ribbon'
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
  EventInfo,
  CountdownWrap,
} from './styles'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Countdown from '../../blocks/Countdown'

import { PHOTO_URL } from '../../../api/variables'

import { IEvent } from 'src/types/event'
import ReactMarkdown from 'react-markdown'
import formatTime from 'src/utils/newUtils/formatTime'
import { IBeautyCategories, IFeed } from '@/types/feed'

export interface IEventPageProps {
  event: IEvent
  beautyCategories: IBeautyCategories[]
  beautyAllContent: IFeed[]
}

const EventPage: FC<IEventPageProps> = ({
  event,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <MainLayout>
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
                  src={`${PHOTO_URL}${event?.cover.url}`}
                  width={350}
                  height={350}
                />
              </ImageWrap>
              <CountdownWrap>
                <Countdown
                  timeEnd={event.timeEnd}
                  timeStart={event.timeStart}
                  titleStart="До начала мероприятия"
                  titleEnd="До окончания мероприятия"
                  text="Мероприятие завершено"
                  dateStart={event.dateStart}
                  dateEnd={event.dateEnd}
                  align="right"
                />
              </CountdownWrap>
            </Left>
            <Right>
              <MobileHidden>
                <Title>{event?.title}</Title>
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
                    {format(event?.dateStart, 'dd MMMM yyyy', {
                      locale: ru,
                    }) +
                      ' ' +
                      formatTime(event.timeStart)}
                  </Date>
                  <Date>
                    Дата окончания:&nbsp;
                    {format(event?.dateEnd, 'dd MMMM yyyy', {
                      locale: ru,
                    }) +
                      ' ' +
                      formatTime(event.timeEnd)}
                  </Date>
                </DateWrap>
                {/* {event?.promo ? (
                  <Promo>
                    Промокод <br />
                    {event?.promo}
                  </Promo>
                ) : null} */}
              </DatePromoWrap>
              {event?.address ? (
                <Address>Адрес:&nbsp;{event.address}</Address>
              ) : null}
              <EventInfo>
                <ReactMarkdown>
                  {event.fullDescription || event.shortDescription}
                </ReactMarkdown>
              </EventInfo>
              {/* {event?.conditions ? (
                <EventConditions>{event?.conditions}</EventConditions>
              ) : null} */}
              <MobileHidden>
                <Button
                  // onClick={eventButtonHandler}
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
                  // onClick={eventButtonHandler}
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

import React, { useState, useEffect, FC, MouseEvent } from 'react'
import Link from 'next/link'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Ribbon from '../MainPage/components/Ribbon'
import RatingEdit from '../../ui/RatingEdit'
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
  Subtitle,
  DateWrap,
  DatePromoWrap,
  Date as DateText,
  EducationInfo,
  EducationPrice,
  CountdownWrap,
  Rating,
  Count,
  Favorite,
} from './styles'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Countdown from '../../blocks/Countdown'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import { PHOTO_URL } from '../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IEducation } from 'src/types/education'
import EducationReviews from './components/EducationReviews'
import ReactMarkdown from 'react-markdown'
import { IBeautyCategories, IFeed } from '@/types/feed'

export interface EducationPageProps {
  education: IEducation
  beautyCategories: IBeautyCategories[]
  beautyAllContent: IFeed[]
}

const EducationPage: FC<EducationPageProps> = ({
  education: educationData,
  beautyCategories,
  beautyAllContent,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)
  const { city } = useAuthStore(getStoreData)
  const [education, setEducation] = useState<IEducation>(educationData)

  useEffect(() => {
    const isInStorage = inStorage('educations', {
      id: education.id,
      title: education.title,
      amount: education.amount,
      photo: education.cover,
      dateStart: education.dateStart,
      dateEnd: education.dateEnd,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  useEffect(() => {
    setEducation(educationData)
  }, [educationData])

  const addFavorite = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('educations', {
      id: education.id,
      title: education.title,
      amount: education.amount,
      photo: education.cover,
      dateStart: education.dateStart,
      dateEnd: education.dateEnd,
    })
    setIsFavorit(!isFavorite)
  }

  const originInfo = (item: IEducation) => {
    if (item.master) {
      return {
        originType: 'Мастер',
        originName: item.master?.name,
        customTitle: `у мастера ${item.master?.name}`,
        buttonLink: 'master',
        originLink: `/${city.slug}/master/${item?.master?.id}`,
        originUserId: item?.user?.id,
      }
    }
    if (item.salon) {
      return {
        originType: 'Салон',
        originName: item.salon?.name,
        customTitle: `в салоне ${item.salon?.name}`,
        buttonLink: 'salon',
        originLink: `/${city.slug}/salon/${item?.salon?.id}`,
        originUserId: item?.user?.id,
      }
    }
    if (item.brand) {
      return {
        originType: 'Бренд',
        originName: item.brand?.name,
        customTitle: `у бренда ${item.brand?.name}`,
        buttonLink: 'brand',
        originLink: `/${city.slug}/brand/${item?.brand?.id}`,
        originUserId: item?.user?.id,
      }
    }
    return null
  }

  const handleChangeRating = (num: number) => {
    console.log(num)

    // createScore({
    //   variables: {
    //     value: num,
    //     id: education?.id,
    //   },
    // })
  }

  return (
    <MainLayout>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <BackButton
            type="Все обучающие курсы"
            name={originInfo(education)?.originName}
            link={'/educations'}
          />
          <Content>
            <Left>
              <ImageWrap>
                <Image
                  alt="photo"
                  src={`${PHOTO_URL}${education.cover.url}`}
                  width={350}
                  height={350}
                />
                <Favorite
                  isFavorite={isFavorite}
                  onClick={e => addFavorite(e)}
                />
              </ImageWrap>
              <CountdownWrap>
                <Countdown
                  timeEnd={education.timeEnd}
                  timeStart={education.timeStart}
                  titleStart="До начала обучения"
                  titleEnd="До окончания обучения"
                  text="Обучение закончилось"
                  dateStart={education.dateStart}
                  dateEnd={education.dateEnd}
                  align="right"
                />
              </CountdownWrap>
              <Rating>
                <RatingEdit
                  handleChangeRating={handleChangeRating}
                  rating={education.averageScore || 0}
                  newRating={education.numberScore || 0}
                />
                <Count>{Math.round(education?.numberScore) || 0}</Count>
              </Rating>
            </Left>
            <Right>
              <MobileHidden>
                <Title>
                  {education.title}&nbsp;
                  {originInfo(education)?.customTitle || ''}
                </Title>
                <Link href={originInfo(education)?.originLink || ''} passHref>
                  <Subtitle>
                    {originInfo(education)?.originType}{' '}
                    {originInfo(education)?.originName}
                  </Subtitle>
                </Link>
              </MobileHidden>
              <MobileVisible>
                <Link href={originInfo(education)?.originLink || ''} passHref>
                  <Subtitle>
                    {originInfo(education)?.originType}{' '}
                    {originInfo(education)?.originName}
                  </Subtitle>
                </Link>
                <Title>{education.title}</Title>
              </MobileVisible>
              <DatePromoWrap>
                <DateWrap>
                  <DateText>
                    Дата и время начала:&nbsp;
                    {format(education.dateStart, 'dd MMMM yyyy HH:mm', {
                      locale: ru,
                    })}
                  </DateText>
                  <DateText>
                    Дата и время окончания:&nbsp;
                    {format(education.dateEnd, 'dd MMMM yyyy HH:mm', {
                      locale: ru,
                    })}
                  </DateText>
                </DateWrap>
                {/* {education?.promo ? (
                  <Promo>
                    Промокод <br />
                    {education?.promo}
                  </Promo>
                ) : null} */}
              </DatePromoWrap>
              <EducationInfo>
                <ReactMarkdown>{education.fullDescription || ''}</ReactMarkdown>
              </EducationInfo>
              <EducationPrice>
                Стоимость:&nbsp;
                {education.amount}
              </EducationPrice>
              {/* {education?.conditions ? (
                <EducationConditions>
                  {education?.conditions}
                </EducationConditions>
              ) : null} */}
              <MobileHidden>
                <Button
                  size="mediumNoPadding"
                  variant="red"
                  font="medium"
                  mt="70"
                >
                  Записаться на курс
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button size="mediumNoPadding" variant="red" font="popUp">
                  Записаться на курс
                </Button>
              </MobileVisible>
            </Right>
          </Content>
        </Wrapper>
        <EducationReviews
          educationID={education.id}
          reviews={educationData.reviews}
        />
      </MainContainer>
      <Ribbon
        title="Бьюти-лента"
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
      />
    </MainLayout>
  )
}

export default EducationPage

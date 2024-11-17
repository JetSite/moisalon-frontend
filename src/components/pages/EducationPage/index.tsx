import React, { useState, useEffect, FC } from 'react'
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
  Date,
  Promo,
  EducationInfo,
  EducationConditions,
  EducationPrice,
  CountdownWrap,
  Rating,
  Count,
  Favorite,
} from './styles'
import moment from 'moment'
import 'moment/locale/ru'
import Countdown from '../../blocks/Countdown'
import { cyrToTranslit } from '../../../utils/translit'
import {
  favoritesInStorage,
  inStorage,
} from '../../../utils/favoritesInStorage'
import ChatMessagePopup from '../../ui/ChatMessagePopup'
import { educationReviews } from '../../../_graphql-legacy/education/educationReviews'
import { useMutation, useQuery } from '@apollo/client'
import { scoreEducation } from '../../../_graphql-legacy/education/scoreEducation'
import { createScopesEducation } from '../../../_graphql-legacy/education/createScoreEducation'
import { educationSearchById } from '../../../_graphql-legacy/education/educationSearchById'
import { PHOTO_URL } from '../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IEducation } from 'src/types/education'
import { getEducationById } from 'src/api/graphql/education/queries/getEducationById'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import EducationReviews from './components/EducationReviews'
import ReactMarkdown from 'react-markdown'

interface EducationPageProps {
  educationData: IEducation
  beautyCategories: any
  beautyAllContent: any
}

const EducationPage: FC<EducationPageProps> = ({
  educationData,
  beautyCategories,
  beautyAllContent,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)
  const { city, me } = useAuthStore(getStoreData)
  const [chatMessagePopup, setChatMessagePopup] = useState(false)
  const [reviews, setReviews] = useState(educationData.reviews)
  const [education, setEducation] = useState<IEducation>(educationData)
  const [loadingReview, setLoadingReview] = useState<boolean>(false)

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

  const addFavorite = (e: any) => {
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

  const { refetch: refetchReviews } = useQuery(getEducationById, {
    variables: { id: education?.id },
    skip: true,
    onCompleted: res => {
      const normalisedData = flattenStrapiResponse(res?.data?.education)
      setReviews(normalisedData.reviews)
    },
  })

  const { refetch: refetchEducation } = useQuery(getEducationById, {
    variables: { id: education?.id },
    skip: true,
    onCompleted: res => {
      const normalisedData = flattenStrapiResponse(res?.data?.education)
      setEducation(normalisedData)
    },
  })

  const [createScore] = useMutation(createScopesEducation, {
    onCompleted: () => {
      refetchEducation()
    },
  })

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
  }

  const handleChangeRating = (num: any) => {
    createScore({
      variables: {
        value: num,
        id: education?.id,
      },
    })
  }

  return (
    <MainLayout>
      <ChatMessagePopup
        open={chatMessagePopup}
        setChatMessagePopup={setChatMessagePopup}
        userId={originInfo(education)?.originUserId || null}
        buttonText="Записаться"
        successText="Заявка на запись отправлена"
        originData={education.master || education.salon}
        origin={education.master ? 'MASTER' : 'SALON'}
      />
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
                <Image alt="photo" src={`${PHOTO_URL}${education.cover.url}`} />
                <Favorite
                  isFavorite={isFavorite}
                  onClick={e => addFavorite(e)}
                />
              </ImageWrap>
              <CountdownWrap>
                <Countdown
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
                  <Date>
                    Дата и время начала:&nbsp;
                    {moment(education.dateStart).format('DD MMMM YYYY HH:MM')}
                  </Date>
                  <Date>
                    Дата и время окончания:&nbsp;
                    {moment(education.dateEnd).format('DD MMMM YYYY HH:MM')}
                  </Date>
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
                  onClick={() => setChatMessagePopup(true)}
                  size="mediumNoPadding"
                  variant="red"
                  font="medium"
                  mt="70"
                >
                  Записаться на курс
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  onClick={() => setChatMessagePopup(true)}
                  size="mediumNoPadding"
                  variant="red"
                  font="popUp"
                >
                  Записаться на курс
                </Button>
              </MobileVisible>
            </Right>
          </Content>
        </Wrapper>
        <EducationReviews educationID={education.id} reviews={reviews} />
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

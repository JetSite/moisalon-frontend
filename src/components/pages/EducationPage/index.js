import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import MainLayout from '../../../layouts/MainLayout'
import SearchBlock from '../../blocks/SearchBlock'
import BackButton from '../../ui/BackButton'
import Ribbon from '../../pages/MainPage/components/Ribbon'
import RatingEdit from '../../ui/RatingEdit/index.tsx'
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
import { CityContext, MeContext } from '../../../searchContext'
import ChatMessagePopup from '../../ui/ChatMessagePopup'
import { educationReviews } from '../../../_graphql-legacy/education/educationReviews'
import EducationReviews from './components/EducationReviews'
import { useMutation, useQuery } from '@apollo/client'
import { scoreEducation } from '../../../_graphql-legacy/education/scoreEducation'
import { createScopesEducation } from '../../../_graphql-legacy/education/createScoreEducation'
import { educationSearchById } from '../../../_graphql-legacy/education/educationSearchById'
import { PHOTO_URL } from '../../../variables'

const EducationPage = ({
  educationData,
  beautyCategories,
  beautyAllContent,
  dataReviews,
  dataScoreRes,
}) => {
  const [isFavorite, setIsFavorit] = useState(false)
  const [city] = useContext(CityContext)
  const [me] = useContext(MeContext)
  const [chatMessagePopup, setChatMessagePopup] = useState(false)
  const [reviews, setReviews] = useState(dataReviews)
  const [education, setEducation] = useState(educationData)
  const [dataScore, setDataScore] = useState(dataScoreRes)

  useEffect(() => {
    const isInStorage = inStorage('educations', {
      id: education.id,
      title: education.title,
      amount: education.amount,
      photoId: education.photoId,
      dateStart: education.dateStart,
      dateEnd: education.dateEnd,
    })
    setIsFavorit(!!isInStorage)
  }, [])

  useEffect(() => {
    setReviews(dataReviews)
    setDataScore(dataScoreRes)
    setEducation(educationData)
  }, [educationData, dataReviews, dataScoreRes])

  const addFavorite = e => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('educations', {
      id: education.id,
      title: education.title,
      amount: education.amount,
      photoId: education.photoId,
      dateStart: education.dateStart,
      dateEnd: education.dateEnd,
    })
    setIsFavorit(!isFavorite)
  }
  const { refetch: refetchReviews } = useQuery(educationReviews, {
    variables: { id: education?.id },
    skip: true,
    onCompleted: res => {
      setReviews(res.comments)
    },
  })

  const { refetch: refetchScore } = useQuery(scoreEducation, {
    variables: { id: education?.id },
    skip: true,
    onCompleted: res => {
      setDataScore(res.scoreEducation)
    },
  })

  const { refetch: refetchEducation } = useQuery(educationSearchById, {
    variables: { id: education?.id },
    skip: true,
    onCompleted: res => {
      setEducation(res.edu)
    },
  })

  const [createScore] = useMutation(createScopesEducation, {
    onCompleted: () => {
      refetchEducation()
      refetchScore()
    },
  })

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
          originUserId: item?.masterOrigin?.userId,
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
          originUserId: item?.salonOrigin?.ownerId,
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
          originUserId: item?.brandOrigin?.ownerId,
        }
    }
  }

  const handleChangeRating = num => {
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
        me={me}
        userId={originInfo(education)?.originUserId}
        buttonText="Записаться"
        successText="Заявка на запись отправлена"
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
                <Image
                  alt="photo"
                  src={`${PHOTO_URL}${education.photoId}/original`}
                />
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
                  userValue={dataScore?.value || 0}
                  count={Math.round(education?.averageScore)}
                  me={me}
                />
                <Count>{Math.round(education?.numberScore) || 0}</Count>
              </Rating>
            </Left>
            <Right>
              <MobileHidden>
                <Title>
                  {education.title}&nbsp;
                  {originInfo(education).customTitle}
                </Title>

                <Link href={originInfo(education).originLink} passHref>
                  <Subtitle>
                    {originInfo(education).originType}{' '}
                    {originInfo(education).originName}
                  </Subtitle>
                </Link>
              </MobileHidden>
              <MobileVisible>
                <Link href={originInfo(education).originLink} passHref>
                  <Subtitle>
                    {originInfo(education).originType}{' '}
                    {originInfo(education).originName}
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
                {education?.promo ? (
                  <Promo>
                    Промокод <br />
                    {education?.promo}
                  </Promo>
                ) : null}
              </DatePromoWrap>
              <EducationInfo
                dangerouslySetInnerHTML={{
                  __html: education.desc,
                }}
              />
              <EducationPrice>
                Стоимость:&nbsp;
                {new Intl.NumberFormat('ru-RU').format(education.amount)}&nbsp;
                руб.
              </EducationPrice>
              {education?.conditions ? (
                <EducationConditions>
                  {education?.conditions}
                </EducationConditions>
              ) : null}

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
        <EducationReviews
          data={reviews}
          me={me}
          id={education?.id}
          refetchReviews={refetchReviews}
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

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { reviewsForBrand } from '../../../../../_graphql-legacy/brand/reviewsForBrand'
import { reviewsForMaster } from '../../../../../_graphql-legacy/master/reviewsForMaster'
import { reviewsForSalon } from '../../../../../_graphql-legacy/salon/reviewsForSalon'
import {
  Wrapper,
  TitlePage,
  Subtitle,
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  ReviewsWrapper,
  Review,
  ReviewTop,
  ReviewsName,
  ReviewsText,
  ReviewsButton,
  Back,
  SkeletonWrap,
} from './styles'
import Stars from '../../../../ui/Stars'
import nameRedact from '../../../../../utils/nameRedact'
import { PHOTO_URL } from '../../../../../variables'

const CabinetReviews = ({ reviews, loading }) => {
  const [offset, setOffset] = useState(4)

  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <ReviewsWrapper>
      {reviews?.length > 0 ? (
        <>
          {reviews?.slice(0, offset).map(item => (
            <Review key={item.id}>
              <ReviewTop>
                <ReviewsName>{nameRedact(item.name)}</ReviewsName>
                <Stars count={5} />
              </ReviewTop>
              <ReviewsText>{item.description}</ReviewsText>
            </Review>
          ))}
          {reviews?.length > offset ? (
            <ReviewsButton onClick={() => setOffset(offset + 4)}>
              Смотреть раннее
            </ReviewsButton>
          ) : null}
        </>
      ) : (
        <Subtitle>У профиля нет отзывов</Subtitle>
      )}
    </ReviewsWrapper>
  )
}

const CabinetListReviews = ({ me }) => {
  const salons = me?.salons
  const master = me?.master
  const brands = me?.userBrands

  const [id, setId] = useState('')
  const [type, setType] = useState(null)
  const [activeProfile, setActiveProfile] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  const { data: reviewsBrand, refetch: refetchBrand } = useQuery(
    reviewsForBrand,
    {
      skip: true,
      variables: {
        originId: id,
      },
      onCompleted: res => {
        setReviews(res?.reviewsForBrand)
        setLoading(false)
      },
    },
  )

  const { data: reviewsMaster, refetch: refetchMaster } = useQuery(
    reviewsForMaster,
    {
      skip: true,
      variables: {
        originId: id,
      },
      onCompleted: res => {
        setReviews(res?.reviewsForMaster)
        setLoading(false)
      },
    },
  )

  const { data: reviewsSalon, refetch: refetchSalon } = useQuery(
    reviewsForSalon,
    {
      skip: true,
      variables: {
        originId: id,
      },
      onCompleted: res => {
        setReviews(res?.reviewsForSalon)
        setLoading(false)
      },
    },
  )

  useEffect(() => {
    if (type === 'master' && id) {
      setLoading(true)
      setReviews([])
      refetchMaster({
        variables: {
          originId: id,
        },
      })
    }
    if (type === 'salon' && id) {
      setLoading(true)
      setReviews([])
      refetchSalon({
        variables: {
          originId: id,
        },
      })
    }
    if (type === 'brand' && id) {
      setLoading(true)
      setReviews([])
      refetchBrand({
        variables: {
          originId: id,
        },
      })
    }
  }, [type, id])

  return (
    <Wrapper>
      <TitlePage>Отзывы клиентов</TitlePage>
      <Subtitle>Нажмите на профиль для просмотра его отзывов</Subtitle>
      {!master?.id && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {master?.id && !activeProfile ? (
        <Item
          onClick={() => {
            setType('master')
            setId(master?.id)
            setActiveProfile(master)
          }}
        >
          <Container>
            <Avatar
              alt="avatar"
              src={master?.photo?.url || 'empty-photo.svg'}
            />
            <Content>
              <Name>{master?.name}</Name>
              <Type>Профиль мастера</Type>
            </Content>
          </Container>
        </Item>
      ) : null}
      {salons?.length && !activeProfile
        ? salons.map(item => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType('salon')
                  setId(item?.id)
                  setActiveProfile(item)
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={item?.logo?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.lessor
                        ? 'Профиль салона арендодателя'
                        : 'Профиль салона'}
                    </Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {brands?.length && !activeProfile
        ? brands.map(item => (
            <div key={item.id}>
              <Item
                onClick={() => {
                  setType('brand')
                  setId(item?.id)
                  setActiveProfile(item)
                }}
              >
                <Container>
                  <Avatar
                    alt="avatar"
                    src={
                      item?.logoId
                        ? `${PHOTO_URL}${item?.logoId}/original`
                        : 'empty-photo.svg'
                    }
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>Профиль бренда</Type>
                  </Content>
                </Container>
              </Item>
            </div>
          ))
        : null}
      {type === 'master' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={master?.photo?.url || 'empty-photo.svg'}
              />
              <Content>
                <Name>{master?.name}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews reviews={reviews} loading={loading} />
        </>
      ) : null}
      {type === 'salon' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={activeProfile?.logo?.url || 'empty-photo.svg'}
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews reviews={reviews} loading={loading} />
        </>
      ) : null}
      {type === 'brand' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
            }}
          >
            Назад
          </Back>
          <Item>
            <Container>
              <Avatar
                alt="avatar"
                src={
                  activeProfile?.logoId
                    ? `${PHOTO_URL}${activeProfile?.logoId}/original`
                    : 'empty-photo.svg'
                }
              />
              <Content>
                <Name>{activeProfile?.name}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews reviews={reviews} loading={loading} />
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetListReviews

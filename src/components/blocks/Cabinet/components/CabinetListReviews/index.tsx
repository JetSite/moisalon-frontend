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
  Back,
} from './styles'
import { PHOTO_URL } from '../../../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'
import { CabinetReviews } from './CabinetReviews'

const CabinetListReviews = () => {
  const { me, loading: loading } = useAuthStore(getStoreData)
  const salons = me?.owner?.salons
  const master = me?.owner?.masters
  const brands = me?.owner?.brand
  const reviews = me?.reviews

  const [id, setId] = useState<IID>('')
  const [type, setType] = useState<string | null>(null)
  const [activeProfile, setActiveProfile] = useState<
    IMaster | ISalon | IBrand | null
  >(null)

  // const { data: reviewsBrand, refetch: refetchBrand } = useQuery(
  //   reviewsForBrand,
  //   {
  //     skip: true,
  //     variables: {
  //       originId: id,
  //     },
  //     onCompleted: res => {
  //       setReviews(res?.reviewsForBrand)
  //       setLoading(false)
  //     },
  //   },
  // )

  // const { data: reviewsMaster, refetch: refetchMaster } = useQuery(
  //   reviewsForMaster,
  //   {
  //     skip: true,
  //     variables: {
  //       originId: id,
  //     },
  //     onCompleted: res => {
  //       setReviews(res?.reviewsForMaster)
  //       setLoading(false)
  //     },
  //   },
  // )

  // const { data: reviewsSalon, refetch: refetchSalon } = useQuery(
  //   reviewsForSalon,
  //   {
  //     skip: true,
  //     variables: {
  //       originId: id,
  //     },
  //     onCompleted: res => {
  //       setReviews(res?.reviewsForSalon)
  //       setLoading(false)
  //     },
  //   },
  // )

  // useEffect(() => {
  //   if (type === 'master' && id) {
  //     setLoading(true)
  //     setReviews([])
  //     refetchMaster({
  //       variables: {
  //         originId: id,
  //       },
  //     })
  //   }
  //   if (type === 'salon' && id) {
  //     setLoading(true)
  //     setReviews([])
  //     refetchSalon({
  //       variables: {
  //         originId: id,
  //       },
  //     })
  //   }
  //   if (type === 'brand' && id) {
  //     setLoading(true)
  //     setReviews([])
  //     refetchBrand({
  //       variables: {
  //         originId: id,
  //       },
  //     })
  //   }
  // }, [type, id])

  return (
    <Wrapper>
      <TitlePage>Отзывы клиентов</TitlePage>
      <Subtitle>Нажмите на профиль для просмотра его отзывов</Subtitle>
      {!master?.length && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {master && master[0].id && !activeProfile ? (
        <Item
          onClick={() => {
            setType('master')
            setId(master[0].id)
            setActiveProfile(master[0] as IMaster)
          }}
        >
          <Container>
            <Avatar
              alt="avatar"
              src={PHOTO_URL + master[0].masterPhoto.url || 'empty-photo.svg'}
            />
            <Content>
              <Name>{master[0].masterName}</Name>
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
                    src={PHOTO_URL + item?.salonCover?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.salonName}</Name>
                    <Type>
                      {item?.salonWorkplacesCount
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
                      item?.brandLogo
                        ? `${PHOTO_URL}${item?.brandLogo.url}`
                        : 'empty-photo.svg'
                    }
                  />
                  <Content>
                    <Name>{item?.brandName}</Name>
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
                src={
                  PHOTO_URL + (activeProfile as IMaster).masterPhoto.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IMaster).masterName}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews
            reviews={
              reviews?.filter(item => item.master?.id === activeProfile.id) ||
              []
            }
            loading={loading}
          />
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
                src={
                  PHOTO_URL + (activeProfile as ISalon).salonCover?.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as ISalon)?.salonName}</Name>
                <Type>Профиль салона</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews
            reviews={
              reviews?.filter(item => item.salons?.id === activeProfile.id) ||
              []
            }
            loading={loading}
          />
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
                  (activeProfile as IBrand)?.brandLogo
                    ? `${PHOTO_URL}${(activeProfile as IBrand).brandLogo.url}`
                    : 'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IBrand)?.brandName}</Name>
                <Type>Профиль бренда</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews
            reviews={
              reviews?.filter(item => item.brand?.id === activeProfile.id) || []
            }
            loading={loading}
          />
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetListReviews
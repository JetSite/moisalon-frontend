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
  const { user, loading: loading } = useAuthStore(getStoreData)
  const salons = user?.owner?.salons
  const masters = user?.owner?.masters
  const brands = user?.owner?.brands
  const reviews = user?.reviews

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
      {!masters?.length && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {masters && masters.length && !activeProfile
        ? masters.map(master => (
            <Item
              onClick={() => {
                setType('master')
                setId(master.id)
                setActiveProfile(master)
              }}
            >
              <Container>
                <Avatar
                  alt="avatar"
                  src={PHOTO_URL + master.photo?.url || 'empty-photo.svg'}
                />
                <Content>
                  <Name>{master.name}</Name>
                  <Type>Профиль мастера</Type>
                </Content>
              </Container>
            </Item>
          ))
        : null}
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
                    src={PHOTO_URL + item?.cover?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.workplacesCount
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
                      item?.logo
                        ? `${PHOTO_URL}${item?.logo.url}`
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
                src={
                  PHOTO_URL + (activeProfile as IMaster).photo.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IMaster).name}</Name>
                <Type>Профиль мастера</Type>
              </Content>
            </Container>
          </Item>
          <CabinetReviews reviews={activeProfile.reviews} loading={loading} />
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
                  PHOTO_URL + (activeProfile as ISalon).cover?.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as ISalon)?.name}</Name>
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
                  (activeProfile as IBrand)?.logo
                    ? `${PHOTO_URL}${(activeProfile as IBrand).logo.url}`
                    : 'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IBrand)?.name}</Name>
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

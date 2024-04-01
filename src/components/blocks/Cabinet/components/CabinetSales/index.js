import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
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
  SalesWrapper,
  Back,
  SkeletonWrap,
} from './styles'
import { currentSales } from '../../../../../_graphql-legacy/sales/currentSales'
import Button from '../../../../ui/Button'
import CreateSale from '../../../CreateSale'
import Sale from '../../../Sale'
import { MobileHidden, MobileVisible } from '../../../../../styles/common'
import { PHOTO_URL } from '../../../../../variables'

const CabinetSalesList = ({ sales, loading }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <SalesWrapper>
      {sales?.length > 0 ? (
        <>
          {sales?.map(item => (
            <Sale
              title={item.title}
              name={`${
                item?.origin.toLowerCase() === 'master'
                  ? 'Мастер'
                  : item.origin.toLowerCase() === 'salon'
                  ? 'Салон'
                  : item.origin.toLowerCase() === 'brand'
                  ? 'Бренд'
                  : ''
              } ${
                item?.masterOrigin?.name ||
                item?.salonOrigin?.name ||
                item?.brandOrigin?.name
              }`}
              promo={item.value}
              photoId={item.photoId}
              dateStart={item.dateStart}
              dateEnd={item.dateEnd}
            />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет акций</Subtitle>
      )}
    </SalesWrapper>
  )
}

const CabinetSales = ({ me }) => {
  const salons = me?.salons
  const master = me?.master
  const brands = me?.userBrands

  const [id, setId] = useState('')
  const [type, setType] = useState(null)
  const [activeProfile, setActiveProfile] = useState(null)
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [createSale, setCreateSale] = useState(false)

  const { data, refetch: refetchSales } = useQuery(currentSales, {
    skip: true,
    variables: {
      originId: id,
    },
    onCompleted: res => {
      setSales(res?.currentSales)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      setSales([])
      refetchSales({
        variables: {
          originId: id,
        },
      })
    }
  }, [type, id])

  return (
    <Wrapper>
      <TitlePage>Мои акции</TitlePage>
      <Subtitle>Нажмите на профиль для просмотра или создания акций</Subtitle>
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
              setCreateSale(false)
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
          {!createSale ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateSale(true)}
                >
                  Создать акцию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateSale(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать акцию
                </Button>
              </MobileVisible>
              <CabinetSalesList sales={sales} loading={loading} />
            </>
          ) : (
            <CreateSale
              refetch={refetchSales}
              type={type}
              activeProfile={activeProfile}
              setCreateSale={setCreateSale}
            />
          )}
        </>
      ) : null}
      {type === 'salon' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreateSale(false)
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
          {!createSale ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateSale(true)}
                >
                  Создать акцию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateSale(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать акцию
                </Button>
              </MobileVisible>
              <CabinetSalesList sales={sales} loading={loading} />
            </>
          ) : (
            <CreateSale
              refetch={refetchSales}
              type={type}
              activeProfile={activeProfile}
              setCreateSale={setCreateSale}
            />
          )}
        </>
      ) : null}
      {type === 'brand' && activeProfile ? (
        <>
          <Back
            onClick={() => {
              setActiveProfile(null)
              setCreateSale(false)
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
          {!createSale ? (
            <>
              <MobileHidden>
                <Button
                  size="width374WithoutPadding"
                  variant="darkTransparent"
                  font="medium"
                  onClick={() => setCreateSale(true)}
                >
                  Создать акцию
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  size="fullWidth"
                  onClick={() => setCreateSale(true)}
                  variant="darkTransparent"
                  font="small"
                >
                  Создать акцию
                </Button>
              </MobileVisible>
              <CabinetSalesList sales={sales} loading={loading} />
            </>
          ) : (
            <CreateSale
              refetch={refetchSales}
              type={type}
              activeProfile={activeProfile}
              setCreateSale={setCreateSale}
            />
          )}
        </>
      ) : null}
    </Wrapper>
  )
}

export default CabinetSales

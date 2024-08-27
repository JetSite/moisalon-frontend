import { useState, useEffect, FC } from 'react'
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
import { PHOTO_URL } from '../../../../../api/variables'
import { IUser } from 'src/types/me'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { IPromotions } from 'src/types/promotions'

interface PropsList {
  sales: IPromotions[]
  loading: boolean
  type: IPromotionsType
}

export type IPromotionsType = 'salon' | 'master' | 'brand' | null

const CabinetSalesList: FC<PropsList> = ({ sales, loading, type }) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <SalesWrapper>
      {sales?.length > 0 ? (
        <>
          {sales?.map(item => (
            <Sale type={type} item={item} key={item.id} />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет акций</Subtitle>
      )}
    </SalesWrapper>
  )
}

interface Props {
  user: IUser
}

const CabinetSales: FC<Props> = ({ user }) => {
  const { salons, masters, brands } = user.owner

  const [id, setId] = useState('')
  const [type, setType] = useState<IPromotionsType>(null)
  const [activeProfile, setActiveProfile] = useState<
    ISalon | IMaster | IBrand | null
  >(null)
  const [loading, setLoading] = useState(false)
  const [createSale, setCreateSale] = useState(false)

  return (
    <Wrapper>
      <TitlePage>Мои акции</TitlePage>
      <Subtitle>Нажмите на профиль для просмотра или создания акций</Subtitle>
      {!masters?.length && !salons?.length && !brands?.length ? (
        <Subtitle>У Вас нет профиля</Subtitle>
      ) : null}
      {masters?.length && !activeProfile
        ? masters?.map(master => (
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
                  src={PHOTO_URL + master?.photo?.url || 'empty-photo.svg'}
                />
                <Content>
                  <Name>{master?.name}</Name>
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
                    src={PHOTO_URL + item?.logo?.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{item?.name}</Name>
                    <Type>
                      {item?.rent
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
                  PHOTO_URL + (activeProfile as IMaster).photo?.url ||
                  'empty-photo.svg'
                }
              />
              <Content>
                <Name>{(activeProfile as IMaster).name}</Name>
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
              <CabinetSalesList
                type={type}
                sales={activeProfile.promotions}
                loading={loading}
              />
            </>
          ) : (
            <CreateSale
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
                src={
                  PHOTO_URL + (activeProfile as ISalon).logo?.url ||
                  'empty-photo.svg'
                }
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
              <CabinetSalesList
                type={type}
                sales={activeProfile.promotions}
                loading={loading}
              />
            </>
          ) : (
            <CreateSale
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
                  PHOTO_URL + (activeProfile as ISalon).logo?.url ||
                  'empty-photo.svg'
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
              <CabinetSalesList
                type={type}
                sales={activeProfile.promotions}
                loading={loading}
              />
            </>
          ) : (
            <CreateSale
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

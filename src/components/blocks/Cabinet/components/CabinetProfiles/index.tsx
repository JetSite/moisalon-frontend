import { useState } from 'react'
import Link from 'next/link'
import {
  Wrapper,
  Item,
  Title,
  SubTitle,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  Button,
  MobileWrapper,
} from './styles'
import CreateProfiles from '../CreateProfiles'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { cyrToTranslit } from '../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../api/variables'

const CabinetProfiles = () => {
  const { city, me } = useAuthStore(getStoreData)
  const salons = me?.owner?.salons
  const masters = me?.owner?.masters
  const brands = me?.owner?.brand
  const [openCreate, setOpenCreate] = useState(false)

  if (!me || !me.owner) return null

  return (
    <>
      <Wrapper>
        <Title>{me.info.username}</Title>
        <SubTitle>Пользователь </SubTitle>
        {masters?.length && masters[0].id ? (
          <Link
            href={`/${masters[0].city.citySlug || city?.citySlug}/master/${
              masters[0].id
            }`}
          >
            <Item>
              <Container>
                <Avatar
                  alt="avatar"
                  src={
                    PHOTO_URL + masters[0].masterPhoto.url || 'empty-photo.svg'
                  }
                />
                <Content>
                  <Name>{masters[0].masterName}</Name>
                  <Type>Профиль мастера</Type>
                </Content>
              </Container>
            </Item>
          </Link>
        ) : null}
        {!!salons && salons.length
          ? salons.map(item => (
              <div key={item.id}>
                <Link
                  href={
                    item.salonWorkplacesCount
                      ? `/${item.cities?.citySlug || city?.citySlug}/rent/${
                          item.id
                        }`
                      : `/${item.cities?.citySlug || city?.citySlug}/salon/${
                          item.id
                        }`
                  }
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={
                          PHOTO_URL + item?.salonLogo?.url || 'empty-photo.svg'
                        }
                      />
                      <Content>
                        <Name>{item.salonName}</Name>
                        <Type>
                          {item?.salonWorkplacesCount
                            ? 'Профиль салона арендодателя'
                            : 'Профиль салона'}
                        </Type>
                      </Content>
                    </Container>
                  </Item>
                </Link>
              </div>
            ))
          : null}
        {!!brands && brands.length
          ? brands.map(item => (
              <div key={item.id}>
                <Link
                  href={`/${item.city.citySlug || city?.citySlug}/brand/${
                    item.id
                  }`}
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={
                          item.brandLogo
                            ? `${PHOTO_URL}${item.brandLogo.url}`
                            : 'empty-photo.svg'
                        }
                      />
                      <Content>
                        <Name>{item.brandName}</Name>
                        <Type>Профиль бренда</Type>
                      </Content>
                    </Container>
                  </Item>
                </Link>
              </div>
            ))
          : null}
        {!openCreate ? (
          <Button onClick={() => setOpenCreate(true)}>Добавить профиль</Button>
        ) : (
          <CreateProfiles currentMe={me} />
        )}
      </Wrapper>
      <MobileWrapper>
        <CreateProfiles currentMe={me} />
      </MobileWrapper>
    </>
  )
}

export default CabinetProfiles

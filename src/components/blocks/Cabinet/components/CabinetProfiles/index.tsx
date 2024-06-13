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
  const { city, user } = useAuthStore(getStoreData)
  const salons = user?.owner?.salons
  const masters = user?.owner?.masters
  const brands = user?.owner?.brand
  const [openCreate, setOpenCreate] = useState(false)

  if (!user || !user.owner) return null

  return (
    <>
      <Wrapper>
        <Title>{user.info.username}</Title>
        <SubTitle>Пользователь </SubTitle>
        {!!masters && !!masters.length ? (
          <>
            {masters.map(item => (
              <Link
                key={item.id}
                href={`/${masters[0]?.city?.slug || city?.slug}/master/${
                  item.id
                }`}
              >
                <Item>
                  <Container>
                    <Avatar
                      alt="avatar"
                      src={
                        `${PHOTO_URL}${item?.photo?.url}` || 'empty-photo.svg'
                      }
                    />
                    <Content>
                      <Name>{item.name}</Name>
                      <Type>Профиль мастера</Type>
                    </Content>
                  </Container>
                </Item>
              </Link>
            ))}
          </>
        ) : null}
        {!!salons && salons.length
          ? salons.map(item => (
              <div key={item.id}>
                <Link
                  href={
                    item.workplacesCount
                      ? `/${item.cities?.slug || city?.slug}/rent/${item.id}`
                      : `/${item.cities?.slug || city?.slug}/salon/${item.id}`
                  }
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={PHOTO_URL + item?.logo?.url || 'empty-photo.svg'}
                      />
                      <Content>
                        <Name>{item.name}</Name>
                        <Type>
                          {item?.workplacesCount
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
                  href={`/${item.city.slug || city?.slug}/brand/${item.id}`}
                >
                  <Item>
                    <Container>
                      <Avatar
                        alt="avatar"
                        src={
                          item.logo
                            ? `${PHOTO_URL}${item.logo.url}`
                            : 'empty-photo.svg'
                        }
                      />
                      <Content>
                        <Name>{item.name}</Name>
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
          <CreateProfiles user={user} />
        )}
      </Wrapper>
      <MobileWrapper>
        <CreateProfiles user={user} />
      </MobileWrapper>
    </>
  )
}

export default CabinetProfiles

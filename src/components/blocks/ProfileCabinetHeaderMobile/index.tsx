import MenuCards from './components/MenuCards'
import {
  Wrapper,
  Info,
  Logo,
  Text,
  Title,
  Subtitle,
  ProfilesButton,
  Button,
  Item,
  Container,
  Avatar,
  Content,
  Name,
  Type,
  Wrap,
} from './styles'
import Link from 'next/link'
import { cyrToTranslit } from '../../../utils/translit'
import { PHOTO_URL } from '../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { Dispatch, FC, SetStateAction } from 'react'
import { ITab } from 'src/components/ui/TabsSlider'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'
import { IUser } from 'src/types/me'
import { ISetState } from 'src/types/common'

interface Props {
  setActiveTab: ISetState<string>
  tabs: IMasterCabinetTab[]
  toggle: boolean
  setToggle: ISetState<boolean>
  user: IUser | null
}

const CabinetHeaderMobile: FC<Props> = ({
  user,
  setActiveTab,
  tabs,
  toggle,
  setToggle,
}) => {
  const salons = user?.owner?.salons
  const master = user?.owner?.masters?.length ? user?.owner?.masters[0] : null
  const brands = user?.owner?.brand
  const { city } = useAuthStore(getStoreData)

  return (
    <Wrapper>
      <Info>
        <Logo
          url={
            user?.info?.avatar
              ? `${PHOTO_URL}${user?.info?.avatar.url}`
              : '/empty-photo.svg'
          }
        />
        <Text>
          <Title>{user?.info?.username}</Title>
          <Subtitle>Кабинет пользователя</Subtitle>
          {salons?.length || master?.id || brands?.length ? (
            <ProfilesButton toggle={toggle} onClick={() => setToggle(!toggle)}>
              Мои профили
            </ProfilesButton>
          ) : null}
        </Text>
      </Info>
      {master && toggle ? (
        <Wrap>
          {master.id ? (
            <Link
              href={`/${master.city.slug || city?.slug}/master/${master?.id}`}
            >
              <Item>
                <Container>
                  <Avatar
                    alt="avatar"
                    src={PHOTO_URL + master?.photo.url || 'empty-photo.svg'}
                  />
                  <Content>
                    <Name>{master?.name}</Name>
                    <Type>Профиль мастера</Type>
                  </Content>
                </Container>
              </Item>
            </Link>
          ) : null}
          {salons && salons.length
            ? salons.map(item => (
                <div key={item.id}>
                  <Link
                    href={
                      item.workplacesCount
                        ? `/${item.city?.slug || city?.slug}/rent/${item?.id}`
                        : `/${item.city?.slug || city?.slug}/salon/${item?.id}`
                    }
                  >
                    <Item>
                      <Container>
                        <Avatar
                          alt="avatar"
                          src={PHOTO_URL + item.logo?.url || 'empty-photo.svg'}
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
                  </Link>
                </div>
              ))
            : null}
          {brands && brands?.length
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
        </Wrap>
      ) : null}
      <Button
        onClick={() => {
          setActiveTab('profiles')
          setToggle(false)
        }}
      >
        Добавить профиль
      </Button>
      <MenuCards
        tabs={tabs}
        setToggle={setToggle}
        setActiveTab={setActiveTab}
      />
    </Wrapper>
  )
}

export default CabinetHeaderMobile

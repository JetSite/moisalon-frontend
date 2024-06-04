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
import { IMe } from 'src/types/me'
import { ISetState } from 'src/types/common'

interface Props {
  setActiveTab: ISetState<string>
  tabs: IMasterCabinetTab[]
  toggle: boolean
  setToggle: ISetState<boolean>
  me: IMe | null
}

const CabinetHeaderMobile: FC<Props> = ({
  me,
  setActiveTab,
  tabs,
  toggle,
  setToggle,
}) => {
  const salons = me?.owner?.salons
  const master = me?.owner?.masters[0]
  const brands = me?.owner?.brand
  const { city } = useAuthStore(getStoreData)

  return (
    <Wrapper>
      <Info>
        <Logo
          url={
            me?.info?.avatar
              ? `${PHOTO_URL}${me?.info?.avatar.url}`
              : '/empty-photo.svg'
          }
        />
        <Text>
          <Title>{me?.info?.username}</Title>
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
              href={`/${master.city.citySlug || city?.citySlug}/master/${
                master?.id
              }`}
            >
              <Item>
                <Container>
                  <Avatar
                    alt="avatar"
                    src={
                      PHOTO_URL + master?.masterPhoto.url || 'empty-photo.svg'
                    }
                  />
                  <Content>
                    <Name>{master?.masterName}</Name>
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
                      item.salonWorkplacesCount
                        ? `/${item.cities?.citySlug || city?.citySlug}/rent/${
                            item?.id
                          }`
                        : `/${item.cities?.citySlug || city?.citySlug}/salon/${
                            item?.id
                          }`
                    }
                  >
                    <Item>
                      <Container>
                        <Avatar
                          alt="avatar"
                          src={
                            PHOTO_URL + item.salonLogo?.url || 'empty-photo.svg'
                          }
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
                  </Link>
                </div>
              ))
            : null}
          {brands && brands?.length
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

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
import { PHOTO_URL } from '../../../variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const CabinetHeaderMobile = ({ me, setActiveTab, tabs, toggle, setToggle }) => {
  const salons = me?.salons
  const master = me?.master
  const brands = me?.userBrands
  const { city } = useAuthStore(getStoreData)

  return (
    <Wrapper>
      <Info>
        <Logo
          url={
            me?.info?.avatar
              ? `${PHOTO_URL}${me?.info?.avatar}/original`
              : '/empty-photo.svg'
          }
        />
        <Text>
          <Title>{me?.info?.displayName}</Title>
          <Subtitle>Кабинет пользователя</Subtitle>
          {salons?.length || master?.id || brands?.length ? (
            <ProfilesButton toggle={toggle} onClick={() => setToggle(!toggle)}>
              Мои профили
            </ProfilesButton>
          ) : null}
        </Text>
      </Info>
      {toggle ? (
        <Wrap>
          {master?.id ? (
            <Link
              href={`/${cyrToTranslit(
                master?.addressFull?.city || city,
              )}/master/${master?.seo?.slug || master?.id}`}
            >
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
            </Link>
          ) : null}
          {salons?.length
            ? salons.map(item => (
                <div key={item.id}>
                  <Link
                    href={
                      item?.lessor
                        ? `/${cyrToTranslit(
                            item?.address?.city || city,
                          )}/rent/${item?.seo?.slug || item?.id}`
                        : `/${cyrToTranslit(
                            item?.address?.city || city,
                          )}/salon/${item?.seo?.slug || item?.id}`
                    }
                  >
                    <Item>
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
                  </Link>
                </div>
              ))
            : null}
          {brands?.length
            ? brands.map(item => (
                <div key={item.id}>
                  <Link
                    href={`/${cyrToTranslit(
                      item?.addressFull?.city || city,
                    )}/brand/${item?.seo?.slug || item?.id}`}
                  >
                    <Item>
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

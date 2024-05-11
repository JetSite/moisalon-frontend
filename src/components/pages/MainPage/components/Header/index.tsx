import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLazyQuery } from '@apollo/client'
import {
  HeaderContent,
  Image,
  Nav,
  NavItemWrapper,
  Wrapper,
  WrappperMobile,
  NavItem,
  Links,
  HeaderMenu,
  LinkCitySelect,
  CitySelectText,
  LinkFavorites,
  LinkProfile,
  FakeWrapper,
  LinkSearch,
  ProfilePhotoWrap,
  ProfilePhoto,
  CartIconWrap,
  Count,
  LogoWrap,
  AdditionalNavWrapper,
  MoreIconWrap,
} from './styled'
import { red } from '../../../../../styles/variables'
import SearchIcon from './icons/SearchIcon'
import ProfileIcon from './icons/ProfileIcon'
import CartIcon from './icons/CartIcon'
import CityPingIcon from './icons/CityPingIcon'
import HeartIcon from './icons/HeartIcon'
import CitySelect from '../CitySelect/CitySelect'
import { useRouter } from 'next/router'
import ChangeCityPopup from '../../../../blocks/ChangeCityPopup/ChangeCityPopup'
import CookiePopup from '../../../../blocks/CookiePopup'
import SearchPopup from '../../../../ui/SearchPopup'
import MoreIcon from './icons/MoreIcon'
import AdditionalNav from './components/AdditionalNav'
import { cyrToTranslit } from '../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../api/variables'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useBaseStore from 'src/store/baseStore'
import { ICity } from 'src/types'
import { MobileHeader } from './components/MobileHeader'
import getMainPageHeaderLinks from './config'
import ym from 'react-yandex-metrika'
import { authConfig } from 'src/api/authConfig'

const activeLink = (path: string, link?: string[]) => {
  return link?.find(item => item === path)
}

const Header = ({ loading = false }) => {
  let cityInStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const [getCitiesList, { data: citiesData }] = useLazyQuery(getCities)
  const { me, city } = useAuthStore(getStoreData)
  const { setCity, setMe } = useAuthStore(getStoreEvent)
  const { products } = useBaseStore(getStoreData)

  const { cartItemTotal: quantity } = useAuthStore(getStoreData)
  const [cities, setCities] = useState<ICity[]>([])
  // const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
  //   skip: true,
  //   onCompleted: (res) => {
  //     setMe({
  //       info: res?.me?.info,
  //       master: res?.me?.master,
  //       locationByIp: res?.locationByIp,
  //       salons: res?.me?.salons,
  //       rentalRequests: res?.me?.rentalRequests,
  //     });
  //   },
  // });
  const b2bClient = !!me?.master?.id || !!me?.salons?.length
  // const { refetch: refetchCart } = useQuery(getCart, {
  //   skip: true,
  //   onCompleted: (res) => {
  //     setProductsGet(true);
  //     setProducts(res?.getCartB2b?.contents || []);
  //   },
  // });

  // const { refetch: refetchB2cCart } = useQuery(getB2cCart, {
  //   skip: true,
  //   onCompleted: (res) => {
  //     setProductsGet(true);
  //     setProducts(res?.getCart?.contents || []);
  //   },
  // });

  // useEffect(() => {
  //   if (!me) {
  //     refetch();
  //   }
  // }, [me]);

  // useEffect(() => {
  //   if (!productsGet) {
  //     if (!b2bClient) {
  //       // refetchB2cCart();
  //       refetchCart();
  //     } else {
  //       refetchCart();
  //     }
  //   }
  // }, [productsGet]);

  if (typeof window !== 'undefined' && window.localStorage) {
    cityInStorage = localStorage.getItem('citySalon')
  }

  const isLoggedIn = me?.info !== undefined && me?.info !== null

  const router = useRouter()

  const isAboutPage = router.pathname === '/about'

  const [openPopup, setPopupOpen] = useState<boolean>(!cityInStorage)

  // useEffect(() => {
  //   if (!b2bClient) {
  //     setQuantity(CountProduct(products));
  //   } else {
  //     setQuantity(CountProduct(products));
  //   }
  // }, [products]);

  useEffect(() => {
    if (citiesData) {
      const normalisedCities = flattenStrapiResponse(citiesData.cities?.data)
      setCities(normalisedCities as unknown as ICity[])
    } else {
      getCitiesList()
    }
  }, [citiesData])

  useEffect(() => {
    // if (me) {
    //   if (typeof window !== 'undefined' && window.localStorage) {
    //     if (!me?.info) {
    //       localStorage.setItem(
    //         'citySalon',
    //         me?.info?.city
    //           ? me.info.city
    //           : localStorage.getItem('citySalon')
    //           ? localStorage.getItem('citySalon')
    //           : me?.locationByIp
    //           ? me?.locationByIp?.data?.city
    //           : 'Москва',
    //       )
    //       setCity(
    //         me?.info?.city
    //           ? me.info.city
    //           : localStorage.getItem('citySalon')
    //           ? localStorage.getItem('citySalon')
    //           : me?.locationByIp
    //           ? me?.locationByIp?.data?.city
    //           : 'Москва',
    //       )
    //     } else {
    //       setCity(
    //         localStorage.getItem('citySalon')
    //           ? localStorage.getItem('citySalon')
    //           : me?.locationByIp
    //           ? me?.locationByIp?.data?.city
    //           : 'Москва',
    //       )
    //       localStorage.setItem(
    //         'citySalon',
    //         localStorage.getItem('citySalon')
    //           ? localStorage.getItem('citySalon')
    //           : me?.locationByIp
    //           ? me?.locationByIp?.data?.city
    //           : 'Москва',
    //       )
    //     }
    //   }
    // }
  }, [me])

  useEffect(() => {
    // if (!city) {
    //   setCity(
    //     me?.info?.city
    //       ? me.info.city
    //       : localStorage.getItem('citySalon')
    //       ? localStorage.getItem('citySalon')
    //       : me?.locationByIp
    //       ? me?.locationByIp?.data?.city
    //       : 'Москва',
    //   )
    // }
  }, [])

  const [fillFav, setFillFav] = useState(isAboutPage ? '#fff' : '#000')
  const [fillProfile, setFillProfile] = useState(isAboutPage ? '#fff' : '#000')
  const [fillSearch, setFillSearch] = useState(isAboutPage ? '#fff' : '#000')
  const [fillCart, setFillCart] = useState(isAboutPage ? '#fff' : '#000')
  const [fillMoreIcon, setFillMoreIcon] = useState(
    isAboutPage ? '#fff' : '#000',
  )
  const [showCitySelect, setShowCitySelect] = useState(false)
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false)
  const [showAdditionalNav, setShowAdditionalNav] = useState(false)
  const [showCatalogMenu, setShowCatalogMenu] = useState(false)
  const [showSearchPopup, setShowSearchPopup] = useState(false)
  // const { unreadMessagesCount } = useChat();

  const logoClickHandler = () => {
    router.push(`/${city.citySlug}`)
  }

  const searchIconClickHandler = () => {
    setShowSearchPopup(!showSearchPopup)
    setFillSearch(red)
  }

  return (
    <>
      <CookiePopup />
      {showSearchPopup ? (
        <SearchPopup
          showSearchPopup={showSearchPopup}
          setShowSearchPopup={setShowSearchPopup}
          fillProfile={fillProfile}
          fillFav={fillFav}
          fillCart={fillCart}
          setFillSearch={setFillSearch}
        />
      ) : null}
      <WrappperMobile>
        <MobileHeader
          me={me}
          quantity={quantity}
          loading={loading}
          isLoggedIn={isLoggedIn}
          setFillProfile={setFillProfile}
          setFillCart={setFillCart}
          setShowCitySelect={setShowCitySelect}
          defaultCity={city.citySlug}
          showHamburgerMenu={showHamburgerMenu}
          setShowHamburgerMenu={setShowHamburgerMenu}
          showSearchPopup={showSearchPopup}
          setShowSearchPopup={setShowSearchPopup}
        />
      </WrappperMobile>
      {showSearchPopup ? <FakeWrapper /> : null}
      <Wrapper showSearchPopup={showSearchPopup} isAboutPage={isAboutPage}>
        <HeaderContent>
          <HeaderMenu>
            <LogoWrap>
              <Image
                alt="logo"
                src={isAboutPage ? '/logo-white-header.svg' : '/logo.svg'}
                onClick={logoClickHandler}
              />
            </LogoWrap>
            <Nav>
              <NavItemWrapper>
                {getMainPageHeaderLinks(city.citySlug).navLinks.map(
                  (link, i) => (
                    <NavItem
                      key={i}
                      active={!!activeLink(router.pathname, link.pathArr)}
                      isAboutPage={isAboutPage}
                      // visible={!!link?.visible}
                    >
                      <Link href={link.link} target={link.target}>
                        {link.title}
                      </Link>
                    </NavItem>
                  ),
                )}
                <AdditionalNav
                  catalog
                  b2bClient={b2bClient}
                  isAboutPage={isAboutPage}
                  showAdditionalNav={showCatalogMenu}
                  setShowAdditionalNav={setShowCatalogMenu}
                  links={getMainPageHeaderLinks(city.citySlug).addCatalogLinks}
                />
              </NavItemWrapper>
            </Nav>
            <AdditionalNavWrapper>
              <MoreIconWrap
                onMouseEnter={() => setFillMoreIcon(red)}
                onMouseLeave={() =>
                  setFillMoreIcon(isAboutPage ? '#fff' : '#000')
                }
                onClick={() => setShowAdditionalNav(!showAdditionalNav)}
              >
                <MoreIcon
                  fill={fillMoreIcon}
                  showAdditionalNav={showAdditionalNav}
                />
              </MoreIconWrap>
              <AdditionalNav
                isAboutPage={isAboutPage}
                showAdditionalNav={showAdditionalNav}
                setShowAdditionalNav={setShowAdditionalNav}
                links={getMainPageHeaderLinks(city.citySlug).addNavLinks}
              />
            </AdditionalNavWrapper>
          </HeaderMenu>
          <Links>
            <LinkCitySelect onClick={() => setShowCitySelect(true)}>
              <CityPingIcon
                showCitySelect={showCitySelect}
                isAboutPage={isAboutPage}
              />
              <CitySelectText showCitySelect={showCitySelect}>
                {city.cityName}
              </CitySelectText>
            </LinkCitySelect>
            <LinkSearch
              onMouseMove={() => setFillSearch(red)}
              onMouseLeave={() =>
                setFillSearch(
                  isAboutPage ? '#fff' : showSearchPopup ? red : '#000',
                )
              }
            >
              <SearchIcon
                fill={fillSearch}
                searchIconClickHandler={searchIconClickHandler}
              />
            </LinkSearch>
            {isLoggedIn ? (
              <ProfilePhotoWrap onClick={() => router.push('/masterCabinet')}>
                <ProfilePhoto
                  src={
                    me?.info?.avatar
                      ? `${PHOTO_URL}${me?.info?.avatar.url}`
                      : '/empty-photo.svg'
                  }
                />
                {/* {unreadMessagesCount > 0 && (
                  <UnreadMessages>{unreadMessagesCount}</UnreadMessages>
                )} */}
              </ProfilePhotoWrap>
            ) : (
              <LinkProfile
                onMouseMove={() => setFillProfile(red)}
                onMouseLeave={() =>
                  setFillProfile(isAboutPage ? '#fff' : '#000')
                }
                onClick={() => {
                  console.log('li')

                  if (me === null) {
                    router.push(authConfig.notAuthLink)
                    return
                  }
                  ym('reachGoal', 'click_login_head')
                  ;(window as any).dataLayer.push({
                    event: 'event',
                    eventProps: {
                      category: 'click',
                      action: 'login_head',
                    },
                  })
                }}
              >
                <ProfileIcon fill={fillProfile} />
              </LinkProfile>
            )}

            <LinkFavorites
              onMouseMove={() => setFillFav(red)}
              onMouseLeave={() => setFillFav(isAboutPage ? '#fff' : '#000')}
              onClick={() => router.push('/favorites')}
            >
              <HeartIcon fill={fillFav} />
            </LinkFavorites>
            <CartIconWrap
              onMouseMove={() => setFillCart(red)}
              onMouseLeave={() => setFillCart(isAboutPage ? '#fff' : '#000')}
              onClick={() => {
                console.log('first')

                me?.info
                  ? router.push(`/cartB2b`)
                  : router.push(
                      {
                        pathname: '/login',
                        query: { error: 'notAuthorized' },
                      },
                      'login',
                    )
              }}
            >
              <CartIcon fill={fillCart} />
              {quantity != 0 ? (
                <Count
                  onClick={() => router.push(me?.info ? `/cartB2b` : '/login')}
                >
                  {quantity}
                </Count>
              ) : null}
            </CartIconWrap>
          </Links>
          <ChangeCityPopup
            openPopup={openPopup && !loading && !!me}
            me={me}
            setPopupOpen={setPopupOpen}
          />
        </HeaderContent>
      </Wrapper>
      <CitySelect
        setMe={setMe}
        showCitySelect={showCitySelect}
        setShowCitySelect={setShowCitySelect}
        setShowHamburgerMenu={setShowHamburgerMenu}
      />
    </>
  )
}

export default Header

import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
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
  MobileLogoLink,
  HamburgerMenuIcon,
  Line,
  HeaderMobile,
  LogoMobile,
  LeftMobile,
  RightMobile,
  LinkSearchMobile,
  CartIconWrap,
  Count,
  LogoWrap,
  AdditionalNavWrapper,
  MoreIconWrap,
  CloseBtn,
  UnreadMessages,
  MobileTitle,
} from './styled'
import { red } from '../../../../../styles/variables'
import SearchIcon from './icons/SearchIcon'
import ProfileIcon from './icons/ProfileIcon'
import StarIcon from './icons/StarIcon'
import CartIcon from './icons/CartIcon'
import CityPingIcon from './icons/CityPingIcon'
import HeartIcon from './icons/HeartIcon'
import CitySelect from '../CitySelect/CitySelect'
import { useRouter } from 'next/router'
import ChangeCityPopup from '../../../../blocks/ChangeCityPopup/ChangeCityPopup'
import HamburgerMenu from '../../../../ui/HamburgerMenu'
import { getCart } from '../../../../../_graphql-legacy/cart/getCart'
import CookiePopup from '../../../../blocks/CookiePopup'
import {
  CartContext,
  CityContext,
  MeContext,
  ProductsContext,
  ProductsGetStatusContext,
} from '../../../../../searchContext'
import CountProduct from '../../../../../utils/countProduct'
import CountProductB2c from '../../../../../utils/countProductB2c'
import SearchPopup from '../../../../ui/SearchPopup'
import { currentUserSalonsAndMasterQuery } from '../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import MoreIcon from './icons/MoreIcon'
import AdditionalNav from './components/AdditionalNav'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getB2cCart } from '../../../../../_graphql-legacy/cart/getB2cCart'
import { PHOTO_URL } from '../../../../../variables'
import { useChat } from '../../../../../chatContext'

const activeLink = (path, link) => {
  return link?.find(item => item === path)
}

const Header = ({ loading = false }) => {
  let cityInStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    cityInStorage = localStorage.getItem('citySalon')
  }

  const [me, setMe] = useContext(MeContext)
  const [productsGet, setProductsGet] = useContext(ProductsGetStatusContext)
  const [city, setCity] = useContext(CityContext)
  const [products, setProducts] = useContext(ProductsContext)
  const [quantity, setQuantity] = useContext(CartContext)
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

  // if (typeof window !== "undefined" && window.localStorage) {
  //   cityInStorage = localStorage.getItem("citySalon");
  // }

  const isLoggedIn = me?.info !== undefined && me?.info !== null

  const navLinks = [
    {
      title: 'Магазин',
      link: `/${cyrToTranslit(city)}/beautyFreeShop`,
      target: '_self',
      pathArr: ['/[city]/beautyFreeShop'],
    },
    {
      title: 'Сдать',
      link: isLoggedIn ? '/createLessorSalon' : '/login',
      target: '_self',
    },
    { title: 'Снять', link: `/${cyrToTranslit(city)}/rent`, target: '_self' },
    {
      title: 'Мастер',
      link: `/${cyrToTranslit(city)}/master`,
      target: '_self',
      pathArr: ['/[city]/master', '/[city]/master/[id]'],
    },
    {
      title: 'Салон',
      link: `/${cyrToTranslit(city)}/salon`,
      target: '_self',
      pathArr: ['/[city]/salon', '/[city]/salon/[id]'],
    },
  ]

  const addNavLinks = [
    {
      title: 'Бренд',
      link: `/${cyrToTranslit(city)}/brand`,
      target: '_self',
      pathArr: [
        '/[city]/brand',
        '/[city]/brand/[id]',
        '/[city]/brand/[id]/products',
      ],
    },
    {
      title: 'Услуги',
      link: `/${cyrToTranslit(city)}/services`,
      target: '_self',
    },
    { title: 'Акции', link: '/sales', target: '_self' },
    { title: 'Обучение', link: '/educations', target: '_self' },
    { title: 'Мероприятия', link: '/events', target: '_self' },
    { title: 'Вакансии', link: '/vacancies', target: '_self' },
    { title: 'Новости', link: '/advices', target: '_self' },
    {
      title: 'Тренды',
      link: '/trends',
      target: '_self',
    },
  ]

  const addCatalogLinks = [
    {
      title: 'B2B магазин',
      link: `/${cyrToTranslit(city)}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'B2C магазин',
      link: `/${cyrToTranslit(city)}/beautyFreeShop`,
      target: '_self',
    },
  ]

  const router = useRouter()

  const isAboutPage = router.pathname === '/about'

  const [openPopup, setPopupOpen] = useState(!cityInStorage)

  const handlePopupClose = () => {
    setPopupOpen(false)
  }

  // useEffect(() => {
  //   if (!b2bClient) {
  //     setQuantity(CountProduct(products));
  //   } else {
  //     setQuantity(CountProduct(products));
  //   }
  // }, [products]);

  useEffect(() => {
    if (me) {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (!me?.info) {
          localStorage.setItem(
            'citySalon',
            me?.info?.city
              ? me.info.city
              : localStorage.getItem('citySalon')
              ? localStorage.getItem('citySalon')
              : me?.locationByIp
              ? me?.locationByIp?.data?.city
              : 'Москва',
          )
          setCity(
            me?.info?.city
              ? me.info.city
              : localStorage.getItem('citySalon')
              ? localStorage.getItem('citySalon')
              : me?.locationByIp
              ? me?.locationByIp?.data?.city
              : 'Москва',
          )
        } else {
          setCity(
            localStorage.getItem('citySalon')
              ? localStorage.getItem('citySalon')
              : me?.locationByIp
              ? me?.locationByIp?.data?.city
              : 'Москва',
          )
          localStorage.setItem(
            'citySalon',
            localStorage.getItem('citySalon')
              ? localStorage.getItem('citySalon')
              : me?.locationByIp
              ? me?.locationByIp?.data?.city
              : 'Москва',
          )
        }
      }
    }
  }, [me])

  useEffect(() => {
    if (!city) {
      setCity(
        me?.info?.city
          ? me.info.city
          : localStorage.getItem('citySalon')
          ? localStorage.getItem('citySalon')
          : me?.locationByIp
          ? me?.locationByIp?.data?.city
          : 'Москва',
      )
    }
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
    router.push(`/${cyrToTranslit(city)}`)
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
          quantity={quantity}
          me={me}
          b2bClient={b2bClient}
          loading={loading}
          isLoggedIn={isLoggedIn}
          fillProfile={fillProfile}
          setFillProfile={setFillProfile}
          fillCart={fillCart}
          setFillCart={setFillCart}
          router={router}
          products={products}
          setShowCitySelect={setShowCitySelect}
          defaultCity={city}
          showHamburgerMenu={showHamburgerMenu}
          setShowHamburgerMenu={setShowHamburgerMenu}
          showSearchPopup={showSearchPopup}
          setShowSearchPopup={setShowSearchPopup}
          setFillSearch={setFillSearch}
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
                {navLinks.map((link, i) => (
                  <NavItem
                    key={i}
                    active={activeLink(router.pathname, link.pathArr)}
                    isAboutPage={isAboutPage}
                    visible={link?.visible}
                  >
                    <Link href={link.link} target={link.target}>
                      {link.title}
                    </Link>
                  </NavItem>
                ))}
                <AdditionalNav
                  catalog
                  b2bClient={b2bClient}
                  isAboutPage={isAboutPage}
                  showAdditionalNav={showCatalogMenu}
                  setShowAdditionalNav={setShowCatalogMenu}
                  links={addCatalogLinks}
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
                links={addNavLinks}
              />
            </AdditionalNavWrapper>
          </HeaderMenu>
          <Links>
            {me ? (
              <LinkCitySelect onClick={() => setShowCitySelect(true)}>
                <CityPingIcon
                  showCitySelect={showCitySelect}
                  isAboutPage={isAboutPage}
                />
                <CitySelectText showCitySelect={showCitySelect}>
                  {city}
                </CitySelectText>
              </LinkCitySelect>
            ) : null}
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
                      ? `${PHOTO_URL}${me?.info?.avatar}/original`
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
                  if (me === null) {
                    return
                  }
                  ym('reachGoal', 'click_login_head')
                  window.dataLayer.push({
                    event: 'event',
                    eventProps: {
                      category: 'click',
                      action: 'login_head',
                    },
                  })
                  router.push('/login')
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
              onClick={() =>
                me?.info
                  ? router.push(`/cartB2b`)
                  : router.push(
                      {
                        pathname: '/login',
                        query: { error: 'notAuthorized' },
                      },
                      'login',
                    )
              }
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
            openPopup={openPopup && !loading && me}
            handlePopupClose={handlePopupClose}
            setMeInfo={setMe}
            me={me}
            setPopupOpen={setPopupOpen}
          />
        </HeaderContent>
      </Wrapper>
      <CitySelect
        me={me}
        setMeInfo={setMe}
        showCitySelect={showCitySelect}
        setShowCitySelect={setShowCitySelect}
        setShowHamburgerMenu={setShowHamburgerMenu}
      />
    </>
  )
}

export default Header

export const MobileHeader = ({
  isLoggedIn,
  setFillProfile,
  setFillCart,
  router,
  me,
  loading = false,
  setShowCitySelect,
  defaultCity,
  showHamburgerMenu,
  setShowHamburgerMenu,
  quantity,
  showSearchPopup,
  setShowSearchPopup,
  b2bClient,
}) => {
  useEffect(() => {
    if (router.query?.q === 'search') {
      setShowSearchPopup(true)
    }
  }, [router.query])
  const [city, setCity] = useContext(CityContext)

  return (
    <>
      <HamburgerMenu
        loading={loading}
        showHamburgerMenu={showHamburgerMenu}
        setShowHamburgerMenu={setShowHamburgerMenu}
        setShowCitySelect={setShowCitySelect}
        defaultCity={defaultCity}
      />
      <HeaderMobile showSearchPopup={showSearchPopup}>
        <LeftMobile>
          {!showSearchPopup ? (
            <HamburgerMenuIcon
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            >
              <Line />
              <Line />
              <Line />
            </HamburgerMenuIcon>
          ) : (
            <CloseBtn
              show={showSearchPopup}
              onClick={() => setShowSearchPopup(false)}
            />
          )}
          <LinkSearchMobile
            onClick={() => setShowSearchPopup(!showSearchPopup)}
            showSearchPopup={showSearchPopup}
          >
            <SearchIcon fill={showSearchPopup ? red : '#000'} />
          </LinkSearchMobile>
          <LinkSearchMobile
            onClick={() => setShowCitySelect(true)}
            showSearchPopup={showSearchPopup}
          >
            <CityPingIcon />
          </LinkSearchMobile>
        </LeftMobile>
        <LogoMobile>
          <MobileLogoLink>
            <Link
              href={`/${cyrToTranslit(city)}`}
              onClick={() => setActiveLink('')}
            >
              <Image alt="logo" src="/logo.svg" />
            </Link>
          </MobileLogoLink>
        </LogoMobile>
        <RightMobile>
          <LinkProfile onClick={() => router.push('/favorites')}>
            <HeartIcon fill="#000" />
          </LinkProfile>
          {isLoggedIn ? (
            <ProfilePhotoWrap onClick={() => router.push('/masterCabinet')}>
              <ProfilePhoto
                src={
                  me?.info?.avatar
                    ? `${PHOTO_URL}${me?.info?.avatar}/original`
                    : '/empty-photo.svg'
                }
              />
            </ProfilePhotoWrap>
          ) : (
            <LinkProfile
              onMouseMove={() => setFillProfile(red)}
              onMouseLeave={() => setFillProfile('#000')}
              onClick={() => router.push('/login')}
            >
              <ProfileIcon fill="#000" />
            </LinkProfile>
          )}
          <CartIconWrap
            onMouseMove={() => setFillCart(red)}
            onMouseLeave={() => setFillCart('#000')}
            onClick={() =>
              router.push(
                me?.info
                  ? `/cartB2b`
                  : {
                      pathname: '/login',
                      query: { error: 'notAuthorized' },
                    },
              )
            }
          >
            <CartIcon fill="#000" />
            {quantity != 0 ? (
              <Count
                onClick={() => router.push(me?.info ? `/cartB2b` : '/login')}
              >
                {quantity}
              </Count>
            ) : null}
          </CartIconWrap>
        </RightMobile>
      </HeaderMobile>
      <MobileTitle>Платформа для мастеров и салонов</MobileTitle>
    </>
  )
}

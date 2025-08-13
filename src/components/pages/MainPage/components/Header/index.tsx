import { useState } from 'react'
import Link from 'next/link'
import * as Styled from './styled'
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
import { PHOTO_URL } from '../../../../../api/variables'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { MobileHeader } from './components/MobileHeader'
import getMainPageHeaderLinks from './config'
import ym from 'react-yandex-metrika'
import { authConfig } from 'src/api/authConfig'
import { getCookie } from 'cookies-next'

const activeLink = (path: string, link?: string[]) => {
  return link?.find(item => item === path)
}

const Header = ({ loading = false }) => {
  const cityCookie = getCookie(authConfig.cityKeyName)
  const { user, city } = useAuthStore(getStoreData)
  const router = useRouter()
  const isAboutPage = router.pathname === '/about'
  const [openPopup, setPopupOpen] = useState<boolean>(!cityCookie)
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
  const quantity =
    user?.owner.cart?.cartContent?.reduce(
      (acc, item) => acc + item.quantity,
      0,
    ) || 0

  const searchIconClickHandler = () => {
    setShowSearchPopup(!showSearchPopup)
    setFillSearch(red)
  }

  return (
    <>
      <Styled.Header>
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
        <Styled.WrappperMobile>
          <MobileHeader
            user={user}
            quantity={quantity}
            loading={loading}
            isLoggedIn={!!user?.info}
            setFillProfile={setFillProfile}
            setFillCart={setFillCart}
            setShowCitySelect={setShowCitySelect}
            defaultCity={city.name || ''}
            showHamburgerMenu={showHamburgerMenu}
            setShowHamburgerMenu={setShowHamburgerMenu}
            showSearchPopup={showSearchPopup}
            setShowSearchPopup={setShowSearchPopup}
          />
        </Styled.WrappperMobile>
        {showSearchPopup ? <Styled.FakeWrapper /> : null}
        <Styled.Wrapper
          showSearchPopup={showSearchPopup}
          isAboutPage={isAboutPage}
        >
          <Styled.HeaderContent>
            <Styled.HeaderMenu>
              <Styled.LogoWrap shallow href={`/${city.slug}`}>
                <Styled.Image
                  alt="logo"
                  src={isAboutPage ? '/logo-white-header.svg' : '/logo.svg'}
                />
              </Styled.LogoWrap>
              <Styled.Nav>
                <Styled.NavItemWrapper>
                  {getMainPageHeaderLinks(city.slug, !!user?.info).navLinks.map(
                    (link, i) => (
                      <Styled.NavItem
                        key={i}
                        active={!!activeLink(router.pathname, link.pathArr)}
                        disable={link.disabled}
                        isAboutPage={isAboutPage}
                        // visible={!!link?.visible}
                      >
                        {link.disabled ? (
                          <p>{link.title}</p>
                        ) : (
                          <Link href={link.link} target={link.target}>
                            {link.title}
                          </Link>
                        )}
                      </Styled.NavItem>
                    ),
                  )}
                  <AdditionalNav
                    catalog
                    isAboutPage={isAboutPage}
                    showAdditionalNav={showCatalogMenu}
                    setShowAdditionalNav={setShowCatalogMenu}
                    links={getMainPageHeaderLinks(city.slug).addCatalogLinks}
                  />
                </Styled.NavItemWrapper>
              </Styled.Nav>
              <Styled.AdditionalNavWrapper>
                <Styled.MoreIconWrap
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
                </Styled.MoreIconWrap>
                <AdditionalNav
                  isAboutPage={isAboutPage}
                  showAdditionalNav={showAdditionalNav}
                  setShowAdditionalNav={setShowAdditionalNav}
                  links={getMainPageHeaderLinks(city.slug).addNavLinks}
                />
              </Styled.AdditionalNavWrapper>
            </Styled.HeaderMenu>
            <Styled.Links>
              <Styled.LinkCitySelect
                onClick={() => setShowCitySelect(!showCitySelect)}
              >
                <CityPingIcon
                  showCitySelect={showCitySelect}
                  isAboutPage={isAboutPage}
                />
                <Styled.CitySelectText showCitySelect={showCitySelect}>
                  {city.name}
                </Styled.CitySelectText>
              </Styled.LinkCitySelect>
              <Styled.LinkSearch
                onClick={searchIconClickHandler}
                onMouseMove={() => setFillSearch(red)}
                onMouseLeave={() =>
                  setFillSearch(
                    isAboutPage ? '#fff' : showSearchPopup ? red : '#000',
                  )
                }
              >
                <SearchIcon fill={fillSearch} />
              </Styled.LinkSearch>
              {user?.info ? (
                <Styled.ProfilePhotoWrap href="/masterCabinet">
                  <Styled.ProfilePhoto
                    src={
                      user?.info?.avatar
                        ? `${PHOTO_URL}${user?.info?.avatar.url}`
                        : '/empty-photo.svg'
                    }
                  />
                  {/* {unreadMessagesCount > 0 && (
                <UnreadMessages>{unreadMessagesCount}</UnreadMessages>
              )} */}
                </Styled.ProfilePhotoWrap>
              ) : (
                <Styled.LinkProfile
                  href={authConfig.notAuthLink}
                  onMouseMove={() => setFillProfile(red)}
                  onMouseLeave={() =>
                    setFillProfile(isAboutPage ? '#fff' : '#000')
                  }
                  onClick={() => {
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
                </Styled.LinkProfile>
              )}

              <Styled.LinkFavorites
                // disabled
                // onClick={e => e.preventDefault()}
                href="/favorites"
                onMouseMove={() => setFillFav(red)}
                onMouseLeave={() => setFillFav(isAboutPage ? '#fff' : '#000')}
              >
                <HeartIcon fill={fillFav} />
              </Styled.LinkFavorites>
              <Styled.CartIconWrap
                shallow
                href={`/cart`}
                onMouseMove={() => setFillCart(red)}
                onMouseLeave={() => setFillCart(isAboutPage ? '#fff' : '#000')}
              >
                <CartIcon fill={fillCart} />
                {quantity != 0 ? <Styled.Count>{quantity}</Styled.Count> : null}
              </Styled.CartIconWrap>
            </Styled.Links>
            <ChangeCityPopup
              openPopup={openPopup && !loading && !!user}
              setPopupOpen={setPopupOpen}
            />
          </Styled.HeaderContent>
        </Styled.Wrapper>
        <CitySelect
          showCitySelect={showCitySelect}
          setShowCitySelect={setShowCitySelect}
          setShowHamburgerMenu={setShowHamburgerMenu}
        />
      </Styled.Header>
      <Styled.HeaderPadding />
    </>
  )
}

export default Header

import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import * as Styled from '../styled'
import { red } from '../../../../../../styles/variables'
import SearchIcon from '../icons/SearchIcon'
import ProfileIcon from '../icons/ProfileIcon'
import CartIcon from '../icons/CartIcon'
import CityPingIcon from '../icons/CityPingIcon'
import HeartIcon from '../icons/HeartIcon'
import HamburgerMenu from '../../../../../ui/HamburgerMenu'
import { cyrToTranslit } from '../../../../../../utils/translit'
import { PHOTO_URL } from '../../../../../../api/variables'

import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { IMe, IUser } from 'src/types/me'
import { useRouter } from 'next/router'
import { ISetState } from 'src/types/common'

interface Props {
  isLoggedIn: boolean
  setFillProfile: ISetState<string>
  setFillCart: ISetState<string>
  user: IUser | null
  loading: boolean
  setShowCitySelect: ISetState<boolean>
  defaultCity: string
  showHamburgerMenu: boolean
  setShowHamburgerMenu: ISetState<boolean>
  quantity: number
  showSearchPopup: boolean
  setShowSearchPopup: ISetState<boolean>
}

export const MobileHeader: FC<Props> = ({
  isLoggedIn,
  setFillProfile,
  setFillCart,
  user,
  loading = false,
  setShowCitySelect,
  defaultCity,
  showHamburgerMenu,
  setShowHamburgerMenu,
  quantity,
  showSearchPopup,
  setShowSearchPopup,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  useEffect(() => {
    if (router.query?.q === 'search') {
      setShowSearchPopup(true)
    }
  }, [router.query])

  console.log(showSearchPopup)

  return (
    <>
      <HamburgerMenu
        loading={loading}
        showHamburgerMenu={showHamburgerMenu}
        setShowHamburgerMenu={setShowHamburgerMenu}
        setShowCitySelect={setShowCitySelect}
        defaultCity={defaultCity}
      />
      <Styled.HeaderMobile showSearchPopup={showSearchPopup}>
        <Styled.LeftMobile>
          {!showSearchPopup ? (
            <Styled.HamburgerMenuIcon
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            >
              <Styled.Line />
              <Styled.Line />
              <Styled.Line />
            </Styled.HamburgerMenuIcon>
          ) : (
            <Styled.CloseBtn
              show={showSearchPopup}
              onClick={() => setShowSearchPopup(false)}
            />
          )}
          <Styled.LinkSearchMobile
            onClick={() => {
              setShowSearchPopup(true)
            }}
          >
            <SearchIcon fill={showSearchPopup ? red : '#000'} />
          </Styled.LinkSearchMobile>
          <Styled.LinkSearchMobile onClick={() => setShowCitySelect(true)}>
            <CityPingIcon />
          </Styled.LinkSearchMobile>
        </Styled.LeftMobile>
        <Styled.LogoMobile>
          <Styled.MobileLogoLink>
            <Link
              href={`/${city.slug}`}
              // onClick={() => setActiveLink('')}
            >
              <Styled.Image alt="logo" src="/logo.svg" />
            </Link>
          </Styled.MobileLogoLink>
        </Styled.LogoMobile>
        <Styled.RightMobile>
          <Styled.LinkProfile
            shallow
            // disabled
            href="/favorites"
            // onClick={e => {
            //   if (true) {
            //     e.preventDefault()
            //   }
            // }}
          >
            <HeartIcon fill="#000" />
          </Styled.LinkProfile>
          {isLoggedIn ? (
            <Styled.ProfilePhotoWrap shallow href={'/masterCabinet'}>
              <Styled.ProfilePhoto
                src={
                  user?.info?.avatar
                    ? `${PHOTO_URL}${user?.info?.avatar.url}`
                    : '/empty-photo.svg'
                }
              />
            </Styled.ProfilePhotoWrap>
          ) : (
            <Styled.LinkProfile
              onMouseMove={() => setFillProfile(red)}
              onMouseLeave={() => setFillProfile('#000')}
              href="/login"
              shallow
            >
              <ProfileIcon fill="#000" />
            </Styled.LinkProfile>
          )}
          <Styled.CartIconWrap
            shallow
            href={`/cart`}
            onMouseMove={() => setFillCart(red)}
            onMouseLeave={() => setFillCart('#000')}
          >
            <CartIcon fill="#000" />
            {quantity != 0 ? <Styled.Count>{quantity}</Styled.Count> : null}
          </Styled.CartIconWrap>
        </Styled.RightMobile>
      </Styled.HeaderMobile>
      <Styled.MobileTitle>Платформа для мастеров и салонов</Styled.MobileTitle>
    </>
  )
}

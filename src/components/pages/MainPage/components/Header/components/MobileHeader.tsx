import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import Link from 'next/link'
import {
  Image,
  LinkProfile,
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
  CloseBtn,
  MobileTitle,
} from '../styled'
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
          >
            <SearchIcon fill={showSearchPopup ? red : '#000'} />
          </LinkSearchMobile>
          <LinkSearchMobile onClick={() => setShowCitySelect(true)}>
            <CityPingIcon />
          </LinkSearchMobile>
        </LeftMobile>
        <LogoMobile>
          <MobileLogoLink>
            <Link
              href={`/${city.slug}`}
              // onClick={() => setActiveLink('')}
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
                  user?.info?.avatar
                    ? `${PHOTO_URL}${user?.info?.avatar.url}`
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
                user?.info
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
                onClick={() => router.push(user?.info ? `/cartB2b` : '/login')}
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

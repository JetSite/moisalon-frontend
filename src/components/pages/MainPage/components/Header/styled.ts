import Link from 'next/link'
import styled from 'styled-components'
import { red, laptopBreakpoint } from '../../../../../styles/variables'

export const LogoWrap = styled(Link)`
  width: 83px;
  height: 100%;
  cursor: pointer;
`

export const Image = styled.img`
  @media (max-width: ${laptopBreakpoint}) {
    height: 100%;
  }
`

export const FakeWrapper = styled.div`
  height: 112px;
`

export const Wrapper = styled.div<{
  showSearchPopup: boolean
  isAboutPage: boolean
}>`
  background: #ffffff;
  padding-bottom: 41px;
  padding-top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;

  position: ${({ showSearchPopup }) => (showSearchPopup ? 'fixed' : 'sticky')};
  width: 100%;
  top: 0;
  z-index: 600;
  color: ${({ isAboutPage }) => (isAboutPage ? '#fff' : '#000')};
  background-color: ${({ isAboutPage }) => (isAboutPage ? '#000' : '#fff')};

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const WrappperMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    position: sticky;
    top: 0;
    z-index: 200;
    background-color: #fff;
  }
`

export const HeaderContent = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 140px;
  justify-content: space-between;
  align-items: center; /* Добавлено для вертикального выравнивания */
`

export const Nav = styled.nav`
  margin-left: 30px;
  position: relative;
  display: flex;
  gap: 20px;
  flex: 1 1 0%;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const HeaderMenu = styled.div`
  display: flex;
  flex: 1 1 0%;
  height: 43px;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const NavItemWrapper = styled.ul`
  display: flex;
  gap: 20px;
  flex: 1 1 0%;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

export const NavItem = styled.li<{
  visible?: boolean
  active?: boolean
  isAboutPage?: boolean
  disable?: boolean
}>`
  display: ${({ visible = true }) => (visible ? 'block' : 'none')};
  font-weight: 600;
  opacity: ${({ disable }) => (disable ? '0.4' : '1')};
  a {
    color: ${props =>
      props.active ? red : props.isAboutPage ? '#fff' : '#000'};
    transition: 0.3s;
    cursor: ${({ disable }) => (disable ? 'default' : 'pointer')};

    :hover {
      color: ${({ disable }) => (disable ? 'inhetit' : red)};
    }
  }
  p {
    color: ${props =>
      props.active ? red : props.isAboutPage ? '#fff' : '#000'};
    cursor: ${({ disable }) => (disable ? 'default' : 'pointer')};

    transition: 0.3s;
    :hover {
      color: ${({ disable }) => (disable ? 'inhetit' : red)};
    }
  }
`

export const Links = styled.nav`
  display: flex;
  gap: 20px;
  max-width: 390px;
  flex: 1 1 0%;
  justify-content: space-between;
  margin-left: auto; /* Добавлено для выравнивания справа */

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }
`

export const LinkItem = styled(Link)``

export const TextLink = styled.p`
  margin-left: 14px;
  font-size: 14px;
  line-height: 27px;
`

export const LinkWrap = styled.div<{ mr?: string }>`
  margin-right: ${props => (props.mr ? props.mr : '50px')};
  cursor: pointer;
  transition: 0.3s;
  :last-child {
    margin-right: 0;
  }
  :hover {
    ${TextLink} {
      color: ${red};
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: ${props => (props.mr ? props.mr : '32px')};
  }
`

export const CityItem = styled.div`
  display: flex;
  align-items: flex-end;
`

export const LinkItemA = styled.a`
  display: flex;
  align-items: flex-end;
`

export const CitySelectText = styled.p<{ showCitySelect: boolean }>`
  margin-right: 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  color: ${({ showCitySelect }) => (showCitySelect ? red : '#000')};
`

export const LinkCitySelect = styled.div`
  height: 23px;
  display: flex;
  justify-content: flex-end;
  column-gap: 17px;
  cursor: pointer;

  &:hover {
    ${CitySelectText} {
      transition: all 0.3s ease-in-out;
      color: ${red};
    }

    svg {
      path {
        transition: all 0.3s ease-in-out;
        stroke: ${red};
      }
      circle {
        transition: all 0.3s ease-in-out;
        fill: ${red};
      }
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const LinkFavorites = styled(Link)<{
  disabled?: boolean
}>`
  height: 23px;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'default')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  :hover {
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const LinkSearch = styled.button`
  height: 23px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  :disabled {
    opacity: 0.8;
    cursor: default;
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const LinkSearchMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    height: 23px;
    cursor: pointer;
  }
`

export const LinkProfile = styled(Link)<{ disabled?: boolean }>`
  height: 23px;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'default')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  :hover {
    ${({ disabled }) => (!disabled ? red : '#000')};
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
  }
`

export const ProfilePhotoWrap = styled.a`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
  }
`

export const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
`

export const UnreadMessages = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: #fff;
  font-size: 12px;
  background: ${red};
  border-radius: 100%;
`

export const MobileLogoLink = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    justify-content: center;
    height: 32px;
    margin-top: -10px;
  }
`

export const HamburgerMenuIcon = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    min-width: 22px;
    height: 19px;
  }
`

export const Line = styled.span`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 22px;
    height: 3px;
    background: #000;

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`

export const HeaderMobile = styled.div<{ showSearchPopup: boolean }>`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    position: ${({ showSearchPopup }) =>
      showSearchPopup ? 'static' : 'sticky'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 50px;
    padding: 27px 20px 0 20px;
    z-index: 10;
  }
`

export const LogoMobile = styled.div`
  display: flex;
  justify-content: center;
`

export const LeftMobile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  max-width: 125px;
`

export const RightMobile = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  max-width: 125px;
`

export const CartIconWrap = styled(Link)`
  position: relative;
  cursor: pointer;
`

export const Count = styled.div`
  position: absolute;
  min-width: 16px;
  min-height: 16px;
  background: #f03;
  border-radius: 100%;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -6px;
  top: -7px;
`

export const AdditionalNavWrapper = styled.div`
  position: relative;
  top: -8px;
  cursor: pointer;
`

export const AdditionalNavContent = styled.div<{
  showAdditionalNav?: boolean
  catalog?: boolean
}>`
  display: ${({ showAdditionalNav }) => (showAdditionalNav ? 'flex' : 'none')};
  position: absolute;
  top: 35px;
  left: ${props => (props.catalog ? 'initial' : '-2px')};
  right: ${props => (props.catalog ? '0' : 'initial')};
  /* display: flex; */
  flex-direction: column;
  padding: 32px 62px 0 42px;
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  cursor: default;

  /* opacity: ${({ showAdditionalNav }) => (showAdditionalNav ? 1 : 0)}; */
  li {
    list-style: none;
    margin-bottom: 32px;
  }
`

export const MoreIconWrap = styled.div``

export const CloseBtn = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  width: 23px;
  height: 23px;
  background: #fff url('/mobile-close-icon.svg') no-repeat center;
  background-size: contain;
`

export const MobileTitle = styled.h2`
  margin: 10px 0;
  color: #808080;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`

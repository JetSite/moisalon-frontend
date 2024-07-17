import Link from 'next/link'
import styled from 'styled-components'
import { red, laptopBreakpoint } from '../../../../../styles/variables'

export const LogoWrap = styled.div`
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

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 140px;
`

export const Nav = styled.nav`
  margin-left: 30px;
  position: relative;
  top: -5px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  height: 43px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const NavItemWrapper = styled.ul`
  display: flex;
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
  margin-right: 30px;
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

export const Links = styled.div`
  display: flex;
  align-items: flex-start;

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
  margin-right: 50px;
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

export const LinkFavorites = styled.div`
  height: 23px;
  margin-right: 50px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const LinkSearch = styled.div`
  height: 23px;
  margin-right: 50px;
  cursor: pointer;

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

export const LinkProfile = styled.div`
  height: 23px;
  margin-right: 50px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
  }
`

export const ProfilePhotoWrap = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 50px;
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

export const CartIconWrap = styled.div`
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

import styled from 'styled-components'
import { red } from '../../../styles/variables'

export const Backdrop = styled.div<{ showHamburgerMenu?: boolean }>`
  display: ${({ showHamburgerMenu }) => (showHamburgerMenu ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`

export const Wrapper = styled.div<{ showHamburgerMenu?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 67%;
  min-height: 100vh;
  height: 100vh;
  padding: 27px 22px 85px 22px;
  overflow: scroll;
  background-color: #fff;
  transform: ${({ showHamburgerMenu }) =>
    showHamburgerMenu ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

export const HamburgerMenuIcon = styled.div`
  display: block;
  height: 19px;
  margin-right: 26px;
`

export const CloseIcon = styled.img`
  width: 100%;
`

export const LogoMobile = styled.div`
  display: flex;
  justify-content: center;
`

export const Search = styled.div``

export const MobileLogoLink = styled.div`
  display: flex;
  justify-content: center;
  height: 32px;
  margin-top: -10px;
`

export const Icons = styled.div`
  display: flex;
`

export const Image = styled.img`
  height: 100%;
`

export const Navigation = styled.nav`
  padding-top: 30px;
  flex-grow: 1;
`

export const LinksWrap = styled.ul``

export const LinkWrap = styled.li<{ visible?: boolean; active?: boolean }>`
  display: ${({ visible = true }) => (visible ? 'block' : 'none')};
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;

  a {
    color: ${({ active }) => (active ? red : '#000')};
  }
`

export const LinkWrapRed = styled(LinkWrap)`
  cursor: pointer;
  color: ${red};
`

export const ChangeCity = styled.div`
  height: 23px;
  display: flex;
  align-items: center;
`

export const TickIconWrap = styled.div`
  display: flex;
  align-items: center;
  width: 8px;
  height: 8px;
  margin-left: 5px;
`

export const TickIcon = styled.img`
  width: 100%;
`

export const Text = styled.p`
  margin-left: 14px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`

export const Divider = styled.p``

export const ProfileBlock = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 100%;
  overflow: hidden;
`

export const ProfileAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ProfileName = styled.p`
  font-weight: 600;
`

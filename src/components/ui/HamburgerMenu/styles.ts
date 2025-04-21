import styled from 'styled-components';
import { red } from '../../../styles/variables';
import Link from 'next/link';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Backdrop = styled.div<{ showHamburgerMenu?: boolean }>`
  display: ${({ showHamburgerMenu }) => (showHamburgerMenu ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Wrapper = styled.div<{ showHamburgerMenu?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 67%;
  max-width: 360px;
  min-height: 100vh;
  height: 100vh;
  padding: 27px 22px 40px 22px;
  overflow: scroll;
  background-color: #fff;
  transform: ${({ showHamburgerMenu }) =>
    showHamburgerMenu ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const HamburgerMenuIcon = styled.button`
  display: block;
  height: 19px;
  margin-right: 26px;
  cursor: pointer;
`;

export const CloseIcon = styled(LazyImage)`
  height: auto;
  width: auto;
  width: 100%;
`;

export const LogoMobile = styled.div`
  display: flex;
  justify-content: center;
`;

export const Search = styled(Link)``;

export const MobileLogoLink = styled.div`
  display: flex;
  justify-content: center;
  height: 32px;
  margin-top: -10px;
`;

export const Icons = styled.div`
  display: flex;
`;

export const Image = styled(LazyImage)`
  height: auto;
  width: auto;
  height: 100%;
`;

export const Navigation = styled.nav`
  padding-top: 30px;
  flex-grow: 1;
`;

export const LinksWrap = styled.ul``;

export const LinkWrap = styled.li<{
  visible?: boolean;
  active?: boolean;
  disable?: boolean;
}>`
  display: ${({ visible = true }) => (visible ? 'block' : 'none')};
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
  opacity: ${({ disable }) => (disable ? '0.4' : '1')};

  a {
    color: ${({ active }) => (active ? red : '#000')};
    cursor: ${({ disable }) => (disable ? 'default' : 'pointer')};

    :hover {
      color: ${({ disable }) => (disable ? 'inhetit' : red)};
    }
  }
  p {
    color: ${({ active }) => (active ? red : '#000')};
    cursor: ${({ disable }) => (disable ? 'default' : 'pointer')};

    :hover {
      color: ${({ disable }) => (disable ? 'inhetit' : red)};
    }
  }
`;

export const LinkWrapRed = styled(LinkWrap)`
  cursor: pointer;
  color: ${red};
`;

export const ChangeCity = styled.button`
  height: 23px;
  display: flex;
  align-items: center;
`;

export const TickIconWrap = styled.div`
  display: flex;
  align-items: center;
  width: 8px;
  height: 8px;
  margin-left: 5px;
`;

export const TickIcon = styled(LazyImage)`
  height: auto;
  width: 100%;
`;

export const Text = styled.p`
  margin-left: 14px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

export const Divider = styled.p``;

export const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 100%;
  overflow: hidden;
`;

export const ProfileAvatarImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileName = styled.p`
  font-weight: 600;
`;

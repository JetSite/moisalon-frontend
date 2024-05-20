import styled from 'styled-components'

import {
  laptopBreakpoint,
  red,
  tabletBreakpoint,
} from '../../../styles/variables'

export const Wrapper = styled.div<{
  loading?: boolean
  noMobileFooter?: boolean
}>`
  background: #000;
  padding-top: ${props => (props.loading ? '15px' : 0)};
  @media (max-width: ${laptopBreakpoint}) {
    display: ${props => (props.noMobileFooter ? 'none' : 'block')};
  }
`

export const Content = styled.div`
  padding: 0 140px;
  padding-bottom: 60px;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 0 70px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Logo = styled.img`
  margin-bottom: 55px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Info = styled.div`
  max-width: 336px;
  width: 100%;
`

export const CustomLink = styled.a`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  display: block;
`

export const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const MenuColumn = styled.div`
  margin-right: 60px;
`

export const MenuItem = styled.p`
  font-size: 14px;
  color: #fff;
  line-height: 25px;
  font-weight: 500;
  display: block;
`

export const Mobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MobileItemApple = styled.div`
  width: 184px;
  height: 54px;
  background: url('/app-store-icon.svg') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    height: 34px;
  }
`

export const MobileItemGoogle = styled.div`
  width: 173px;
  height: 50px;
  background: url('/google-store-icon.svg') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    height: 34px;
  }
`

export const Socials = styled.div`
  display: flex;
  width: 100%;

  a {
    width: 33px;
    margin-right: 20px;
    height: 33px;
    transform: perspective(1px) translateZ(0);
    backface-visibility: hidden;
    border-radius: 50%;
    display: block;
    &:hover {
      transition: all 0.2s ease-in-out;
      box-shadow: 0 0 12px #fff;
      transform: scale(1.1);
    }

    @media (max-width: ${laptopBreakpoint}) {
      width: 23px;
      height: 23px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    width: 50%;
  }
`

export const SocialFb = styled.div`
  height: 100%;
  background: url('/socials-fb-icon.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const SocialInst = styled.div`
  height: 100%;
  background: url('/socials-inst-icon.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const SocialYou = styled.div`
  height: 100%;
  background: url('/socials-you-icon.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const SocialVk = styled.div`
  height: 100%;
  background: url('/socials-vk-icon.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const SocialWs = styled.div`
  height: 100%;
  background: url('/socials-whatsapp-icon.svg') no-repeat center;
  background-size: contain;
  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const SocialTg = styled.div`
  height: 100%;
  background: url('/socials-telegram-icon.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 23px;
    height: 23px;
  }
`

export const LogoMobile = styled.img`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    height: 32px;
  }
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 210px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const BottomMobile = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    flex-direction: column;
  }
`

export const BottomTitle = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  @media (max-width: ${laptopBreakpoint}) {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 33px;
  margin-top: 66px;
  margin-bottom: 37px;
`

export const ContactsWrapper = styled.div`
  width: 100%;
  margin-top: 37px;
`

export const ContactsItem = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 37px;
  }
`

export const Left = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 55%;
  }
`

export const Right = styled.div`
  width: 32%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: row;
    width: 45%;
  }
`

export const Center = styled.div`
  width: 22%;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Phone = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  a {
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${red};
    }
  }
`

export const Text = styled.p`
  font-weight: 500;
  color: #fff;
  font-size: 14px;
  line-height: 25px;
  a {
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${red};
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 15px;
    a {
      color: #fff;
    }
  }
`

export const Copyright = styled.p`
  margin-top: 37px;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  a {
    color: #fff;
  }
`

export const NavFooter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`
export const NavFooterItem = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 35px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 57px;
    margin-bottom: 34px;
    font-size: 10px;
    line-height: 14px;
  }
`

export const LawText = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  a {
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${red};
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

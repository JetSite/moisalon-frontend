import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'

export const Wrapper = styled.div<{ url: string }>`
  padding: 0 140px;
  background-image: ${({ url }) => 'url(' + PHOTO_URL + url + ')'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const BackButtonWrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Count = styled.p`
  font-size: 10px;
`

export const More = styled.p`
  text-decoration: underline;
  cursor: pointer;
`

export const WebSite = styled.a`
  display: block;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #ff0033;
  margin-top: 16px;
  margin-bottom: 25px;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: 21px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`

export const Socials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 45px;
  position: relative;
  z-index: 2;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 15px;
  }
`

export const Phone = styled.a<{ active: boolean }>`
  width: 55px;
  display: block;
  height: 55px;
  background: ${props =>
    props.active
      ? 'url(/phone-active.svg) no-repeat center'
      : 'url(/phone-disabled.svg) no-repeat center'};
  background-size: contain;
  cursor: ${props => (props.active ? 'pointer' : 'initial')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    background: ${props =>
      props.active
        ? 'url(/phone-active.svg) no-repeat center'
        : 'url(/phone-disabled.svg) no-repeat center'};
    background-size: contain;
  }
`

export const HiddenSocials = styled.div<{ showSocials: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: ${props => (props.showSocials ? '75px' : '0px')};
  opacity: ${props => (props.showSocials ? 1 : 0)};
  transition: 0.5s;
  @media (max-width: ${laptopBreakpoint}) {
    left: 0;
    bottom: ${props => (props.showSocials ? '-75px' : '0px')};
  }
`

export const ActiveSocials = styled.div<{ active: boolean }>`
  width: 55px;
  height: 55px;
  background: ${props =>
    props.active
      ? 'url(/email-active.svg) no-repeat center'
      : 'url(/email-disabled.svg) no-repeat center'};
  background-size: contain;
  cursor: ${props => (props.active ? 'pointer' : 'initial')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    background: ${props =>
      props.active
        ? 'url(/email-active.svg) no-repeat center'
        : 'url(/email-disabled.svg) no-repeat center'};
    position: relative;
    background-size: contain;
    z-index: 2;
  }
`

export const Telegram = styled.a<{ showSocials: boolean }>`
  width: 55px;
  height: 55px;
  background: url('/master-socials-tg.svg') no-repeat center;
  background-size: contain;
  margin-right: 20px;
  cursor: pointer;
  display: ${props => (props.showSocials ? 'block' : 'none')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    margin-right: 5px;
    background-size: contain;
  }
`

export const WhatsApp = styled.a<{ showSocials: boolean }>`
  width: 55px;
  height: 55px;
  background: url('/master-socials-what.svg') no-repeat center;
  background-size: contain;
  margin-right: 20px;
  cursor: pointer;
  display: ${props => (props.showSocials ? 'block' : 'none')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    margin-right: 5px;
    background-size: contain;
  }
`

export const ChatIcon = styled.a<{ showSocials: boolean }>`
  width: 55px;
  height: 55px;
  margin-right: 20px;
  background: url('/email.svg') no-repeat center;
  background-size: contain;
  cursor: pointer;
  display: ${props => (props.showSocials ? 'block' : 'none')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    margin-right: 5px;
    background-size: contain;
  }
`

export const SocialsWrapper = styled.div`
  position: relative;
`

export const Viber = styled.a<{ showSocials: boolean }>`
  width: 55px;
  height: 55px;
  background: url('/master-socials-viber.svg') no-repeat center;
  background-size: contain;
  cursor: pointer;
  display: ${props => (props.showSocials ? 'block' : 'none')};
  transition: 0.3s;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);

  &:hover {
    transform: scale(1.07);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
    background-size: contain;
  }
`

export const Logo = styled.div<{ background: string }>`
  width: 173px;
  height: 173px;
  background: ${props => props.background};
  margin-right: 57px;
  margin-left: 57px;
  border-radius: 100%;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 89px;
    height: 89px;
    margin-right: 21px;
    margin-left: 21px;
    background-position: center;
  }
`

export const NameWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const NameContent = styled.div`
  display: inline-block;
  position: relative;
`

export const Name = styled.h1`
  position: relative;
  text-transform: uppercase;
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;
  display: inline;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Favorite = styled.div<{ isFavorite: boolean }>`
  position: absolute;
  right: 10px;
  background: ${({ isFavorite }) =>
      isFavorite
        ? 'url(/favorite-red-icon.svg)'
        : 'url(/favorite-grey-icon.svg)'}
    no-repeat center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  top: 50%;
  right: -45px;
  margin-top: -10px;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    right: 0;
    margin-left: 10px;
  }
`

export const Bell = styled.div`
  position: absolute;
  right: 10px;
  background: url('/bell-icon.svg') no-repeat center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  top: 50%;
  right: -85px;
  margin-top: -10px;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    right: 0;
    margin-left: 10px;
  }
`

export const Activities = styled.div`
  width: 70%;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin: 0 auto;
  margin-bottom: 23px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-bottom: 16px;
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  }
`

export const Rating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 56px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 19px;
  }
`

const Item = styled.div<{ backgroundImage: string }>`
  background: ${props => `${props.backgroundImage} no-repeat center`};
  background-size: cover;
  width: 100%;
  height: 381px;
`

const ImageDefault = styled.div`
  background: #fff;
  width: 100%;
  height: 381px;
`

export const SkeletonCircle = styled.div`
  display: inline-block;
  width: 173px;
  height: 173px;
  margin: 0 57px;
  border-radius: 50%;
  background-color: rgba(34, 34, 34, 0.11);

  @media (max-width: ${laptopBreakpoint}) {
    width: 89px;
    height: 89px;
    margin: 0 21px;
    background-color: rgba(34, 34, 34, 0.11);
  }
`

export const EditButton = styled.div`
  background: #f0f0f0;
  border-radius: 50px;
  width: 397px;
  height: 35px;
  margin: 0 auto;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 28px;
  margin-bottom: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    width: 100%;
    max-width: 320px;
    height: 28px;
  }
`

import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  padding-top: 100px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    padding: 0 20px;
  }
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  border-bottom: 0.5px solid #a2a2a2;
  margin-bottom: 45px;

  @media (max-width: ${laptopBreakpoint}) {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 11px;
  }
`

export const ContentWrapper = styled.div`
  width: 47%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const BlurPhone = styled.p`
  display: inline;
  background: #000000;
  background: -webkit-linear-gradient(to right, #000000 0%, #ffffff 72%);
  background: -moz-linear-gradient(to right, #000000 0%, #ffffff 72%);
  background: linear-gradient(to right, #000000 0%, #ffffff 72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const ContentWrapperElement = styled.div`
  width: 47%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const ContentWrapperFlex = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

export const Title = styled.h2`
  font-weight: 600;
  font-size: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Bottom = styled.div`
  margin-bottom: 80px;
`

export const PhoneNumber = styled.a`
  font-size: 18px;
  line-height: 30px;
  display: block;
  color: #000;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const PhoneNumberClose = styled.p`
  font-size: 18px;
  line-height: 30px;
  display: block;
  color: #000;
  text-decoration: underline;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Email = styled.a`
  font-size: 18px;
  line-height: 30px;
  display: block;
  color: #000;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ff0033;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Address = styled.a`
  font-size: 18px;
  line-height: 30px;
  color: #000;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

export const Content = styled.div`
  display: inline-flex;
  width: 47%;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
    flex-direction: column;
    width: 100%;
  }
`

export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

export const SocialsWrapper = styled.div`
  height: 23px;
  margin-left: 118px;
  display: flex;

  noindex {
    &:not(:last-child) {
      margin-right: 18px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`

export const SocialIcon = styled.div`
  width: 23px;
  height: 23px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 18px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const VKIcon = styled(SocialIcon)`
  background: url('/vk-icon.svg') no-repeat center;
  background-size: contain;

  &:hover {
    transform: scale(1.1);
  }
`

export const OKIcon = styled(SocialIcon)`
  background: url('/ok-icon.svg') no-repeat center;
  background-size: contain;

  &:hover {
    transform: scale(1.1);
  }
`

export const TGIcon = styled(SocialIcon)`
  background: url('/tg-icon.svg') no-repeat center;
  background-size: contain;
  &:hover {
    transform: scale(1.1);
  }
`

export const WSIcon = styled(SocialIcon)`
  background: url('/whatsapp-icon.svg') no-repeat center;
  background-size: contain;
  &:hover {
    transform: scale(1.1);
  }
`

export const VBIcon = styled(SocialIcon)`
  background: url('/vb-icon.svg') no-repeat center;
  background-size: contain;
  &:hover {
    transform: scale(1.1);
  }
`

export const YTIcon = styled(SocialIcon)`
  background: url('/yt-icon.svg') no-repeat center;
  background-size: contain;

  &:hover {
    transform: scale(1.1);
  }
`

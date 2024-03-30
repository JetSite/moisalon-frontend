import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { lighten } from 'polished'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-bottom: 60px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 500px;
  margin-top: 50px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column-reverse;
    min-height: initial;
  }
`

export const Info = styled.div`
  max-width: 292px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
    margin-top: 20px;
  }
`

export const ImageContent = styled.div`
  max-width: 843px;
  width: 100%;
  position: relative;
`

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    max-height: 300px;
  }
`

export const OnlineBooking = styled.a`
  position: absolute;
  cursor: pointer;
  width: 295px;
  height: 55px;
  background: #ff0033;
  box-shadow: 0px 16px 32px rgba(255, 0, 51, 0.3);
  border-radius: 43px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 28px;
  right: 12px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 16px 32px rgba(255, 0, 51, 0.7);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 180px;
    height: 35px;
    top: 10px;
    font-size: 10px;
    right: 10px;
  }
`

export const Icon = styled.img`
  margin-right: 13px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 8px;
    flex-shrink: 0;
  }
`

export const SalonInfo = styled.div`
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 10px;
  }
`

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 17px;
`

export const SalonInfoRight = styled.div`
  margin-bottom: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
  }
`

export const Name = styled.h1`
  font-weight: 600;
  font-size: 26px;
  line-height: 38px;
  text-transform: uppercase;
  margin-bottom: 4px;
  word-break: break-word;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 18px;
  }
`

export const Socials = styled.div`
  display: flex;
`

export const SocialButton = styled.a`
  display: block;
  width: 23px;
  height: 23px;
  cursor: pointer;
  margin-right: 12px;
`

export const SocialFb = styled(SocialButton)`
  background: url('/brand-fb-icon.svg') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialInst = styled(SocialButton)`
  background: url('/brand-in-icon.svg') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialVk = styled(SocialButton)`
  background: url('/brand-vk-icon.svg') no-repeat center;
  background-size: cover;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`

export const ReviewsScore = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 35px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
  }
`

export const CountReviews = styled.p`
  margin-left: 24px;
  font-size: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

export const City = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 35px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
    align-items: center;
  }
`

export const CityText = styled.p`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 24px;
  margin-left: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

export const Phones = styled.div`
  margin-bottom: 35px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 6px;
  }
`

export const PhoneWrap = styled.div`
  display: flex;
`

export const Working = styled.div`
  display: flex;
  margin-bottom: 35px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
    align-items: center;
  }
`

export const Phone = styled.a`
  font-size: 18px;
  line-height: 24px;
  margin-left: 2px;
  color: #000;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

export const ButtonOnline = styled.a`
  width: 100%;
  height: 55px;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  background: #ff0033;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

export const EditButton = styled.div`
  background: #f0f0f0;
  border-radius: 50px;
  width: 47%;
  height: 35px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    width: 100%;
    max-width: 320px;
    height: 28px;
    margin-bottom: 18px;
  }
`

export const SocialsWrapper = styled.div`
  height: 23px;
  display: flex;
  margin-bottom: 35px;

  noindex {
    &:not(:last-child) {
      margin-right: 18px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 33px;
    margin-bottom: 6px;
  }
`

export const Rating = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const Count = styled.p`
  font-size: 10px;
`

export const EditButtonsWrapper = styled.div`
  width: 100%;
  max-width: 843px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-top: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    align-items: center;
  }
`

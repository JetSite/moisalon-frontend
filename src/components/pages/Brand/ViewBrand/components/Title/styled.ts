import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const ContentLeft = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 60%;
    display: grid;
    grid-template-rows: repeat(5, 25px);
  }
`

export const ContentRight = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    display: grid;
    grid-template-rows: repeat(5, 25px);
  }
`

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
    grid-row: 1 / 4;
  }
`

export const BrandName = styled.h1`
  display: inline-block;
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  text-transform: uppercase;
  color: #000000;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    word-break: break-all;
  }
`
export const InfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Count = styled.p`
  font-size: 10px;
  position: relative;
  top: 1px;
`

export const FavoriteAdnBellButton = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: cover;
  margin: 0 7px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 16px;
    height: 16px;
  }
`
export const Favorite = styled(FavoriteAdnBellButton)<{ isFavorite?: boolean }>`
  background: ${({ isFavorite }) =>
      isFavorite
        ? 'url(/favorite-red-icon.svg)'
        : 'url(/favorite-grey-icon.svg)'}
    no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
    margin-left: 0;
  }
`
export const Bell = styled(FavoriteAdnBellButton)`
  background: url('/bell-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const Notification = styled.div`
  display: flex;
  margin-left: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 2px;
  }
`

export const Socials = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 56px;
  a:not(:last-child) {
    margin-right: 25px;

    @media (max-width: ${laptopBreakpoint}) {
      margin-right: 10px;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 23px;
  }
`
export const SocialButton = styled.a`
  width: 36px;
  height: 36px;
  background-size: cover;
  display: inline-block;

  @media (max-width: ${laptopBreakpoint}) {
    height: 23px;
    width: 23px;
  }
`

export const SocialFb = styled(SocialButton)`
  background: url('/brand-fb-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialInst = styled(SocialButton)`
  background: url('/brand-in-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialYou = styled(SocialButton)`
  background: url('/band-yt-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialVk = styled(SocialButton)`
  background: url('/brand-vk-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`
export const SocialOk = styled(SocialButton)`
  background: url('/socials-vk-icon.svg') no-repeat center;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`

export const CountryName = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  color: #000000;
  width: 70%;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    grid-row: 4 / 5;
  }
`
export const Rating = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 56px;
  margin-top: 24px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    align-items: center;
  }
`
export const CountryBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
`
export const BrandWeb = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  color: #ff0033;

  @media (max-width: ${laptopBreakpoint}) {
    /* grid-row: 5 / 6; */
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
  }
`

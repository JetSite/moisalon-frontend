import styled from 'styled-components'
import { laptopBreakpoint, red } from '../../../styles/variables'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 97px;
  margin-bottom: 90px;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 28px;
    padding: 0 20px;
  }
`

export const BackWrapper = styled.div`
  margin-top: 17px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 28px;
    padding: 0 20px;
  }
`

export const Navigation = styled.div`
  width: 33.9%;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const NavList = styled.div`
  width: 100%;
  margin-top: 17px;
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const NavItem = styled.div`
  width: 54.7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const NavAdvicesList = styled.div`
  width: 78.2%;
  margin-top: 17px;
  margin-left: 16px;
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const NavAdviceItem = styled.div`
  position: relative;
  display: block;
  margin-bottom: 27px;
  color: ${({ active }) => (active ? red : '#000')};
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${red};
    text-decoration: underline;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Text = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Icon = styled.div`
  width: 10px;
  height: 12px;
  background: url('/services-tick.svg') no-repeat center;
  transform: ${({ opened }) => (opened ? 'rotate(90deg)' : 'rotate(0)')};
  transition: all 0.2s ease-in-out;

  ${NavItem}:hover & {
    background: url('/services-tick-red.svg') no-repeat center;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Content = styled.div`
  width: 59.2%;
  min-height: 90vh;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const AdvList = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const AdvItem = styled.div`
  position: relative;
  cursor: ${({ opened }) => (opened ? 'default' : 'pointer')};
  &:not(:last-child) {
    margin-bottom: 75px;
  }
  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const AdvImage = styled.div`
  width: 100%;
  min-height: 411px;
  background: ${({ photoUrl }) => `url(${photoUrl})`} no-repeat center;
  background-size: cover;
  border-radius: 5px;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    height: 200px;
  }
`

export const Favorite = styled.div`
  width: 20px;
  height: 20px;
  padding: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ isFavorite }) =>
      isFavorite ? 'url(/favorite-red-icon.svg)' : 'url(/favorit.svg)'}
    no-repeat center;
  background-size: 20px 20px;

  @media (max-width: ${laptopBreakpoint}) {
    top: 18px;
    right: 18px;
  }
`

export const AdvTitle = styled.h3`
  margin-top: 35px;
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 21px;
  }
`

export const AdvDescription = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const AdvShortDescription = styled(AdvDescription)`
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ReadMore = styled.span`
  margin-top: 10px;
  margin-left: 7px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    color: ${red};

    &:before {
      background: ${red};
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

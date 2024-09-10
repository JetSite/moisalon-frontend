import styled from 'styled-components'
import { red, laptopBreakpoint } from '../../../styles/variables'
import Link from 'next/link'

export const Wrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    display: block;
    width: 100%;
  }
`

export const Info = styled.div`
  display: flex;
  height: 152px;
  padding: 22px;
  color: #fff;
  background-color: ${red};
`

export const Logo = styled.div<{ url: string }>`
  flex-shrink: 0;
  width: 89px;
  height: 89px;
  margin-right: 21px;
  border-radius: 50%;
  background: ${({ url }) => (url ? `url(${url})` : '#fff')} no-repeat center;
  background-size: cover;
`

export const Text = styled.div``

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
`

export const Subtitle = styled.p`
  max-height: 70px;
  font-size: 12px;
  font-weight: 500;
  line-height: 25px;
  overflow: hidden;
`

export const CardsWrapper = styled.div`
  width: 100%;
  padding: 15px 20px;
  position: relative;
  top: -20px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Card = styled(Link)<{ disable?: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  opacity: ${props => (props.disable ? '0.3' : '')};
  flex-shrink: 0;
  justify-content: space-between;
  width: 120px;
  height: 90px;
  padding: 11px 8px 10px 7px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  &:not(:last-child) {
    margin-right: 10px;
  }
`

export const CardTitle = styled.h3`
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  overflow: hidden;
  word-break: break-word;
`

export const CardBottom = styled.div<{ quantity?: boolean }>`
  display: flex;
  justify-content: ${({ quantity }) =>
    quantity ? 'space-between' : 'flex-start'};
  width: 100%;
`

export const Icon = styled.img``

export const CardQuantity = styled.span`
  position: relative;
  top: 4px;
  color: #a1a1a1;
  font-size: 14px;
  font-weight: 500;
`

export const ProfilesButton = styled.div<{ toggle: boolean }>`
  position: relative;
  font-weight: 500;
  font-size: 14px;
  margin-top: 20px;
  color: #fff;
  &:before {
    position: absolute;
    content: '';
    width: 9px;
    height: 9px;
    background: url('/icon-arrow-bottom-white.svg') no-repeat center;
    background-size: contain;
    right: 0px;
    bottom: 2px;
    transform: ${props => (props.toggle ? 'rotate(360deg)' : 'rotate(270deg)')};
    transition: 0.3s;
  }
`

export const Button = styled.div`
  cursor: pointer;
  height: 55px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #000000;
  margin: 0 auto;
  top: -29px;
  background: #fff;
  &:before {
    content: '';
    position: absolute;
    width: 29px;
    height: 29px;
    border-radius: 100%;
    border: 1px solid #000;
    left: 25px;
    @media (max-width: 350px) {
      display: none;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background: url('/plus-icon.svg') no-repeat center;
    width: 13px;
    height: 13px;
    left: 34px;
    @media (max-width: 350px) {
      display: none;
    }
  }
`

export const Item = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  padding: 25px;
  padding-left: 11px;
  margin-bottom: 19px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #f8f8f8;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid #000000;
    background: #fff;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100%;
`

export const Content = styled.div`
  margin-left: 11px;
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 3px;
  line-height: 25px;
  word-break: break-word;
`

export const Type = styled.p`
  font-size: 11px;
  line-height: 17px;
`

export const Wrap = styled.ul`
  width: 80%;
  margin: 0 auto;
  top: -29px;
  position: relative;
`

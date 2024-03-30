import styled from 'styled-components'
import { red, laptopBreakpoint } from '../../../../../styles/variables'

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

export const Logo = styled.div`
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
  font-size: 14px;
  font-weight: 500;
  line-height: 25px;
  overflow: hidden;
`

export const CardsWrapper = styled.div`
  width: 100%;
  height: 95px;
  padding: 0 20px;
  position: absolute;
  bottom: -69px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  width: 90px;
  height: 90px;
  padding: 11px 8px 10px 8px;
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
  line-height: 20px;
  overflow-wrap: break-word;
`

export const CardBottom = styled.div`
  display: flex;
  justify-content: ${({ quantity }) => (quantity ? 'space-between' : 'center')};
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

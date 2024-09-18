import { laptopBreakpoint, mobileBreakpoint } from 'src/styles/variables'
import styled from 'styled-components'

export const WrapperMapBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  position: relative;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`

export const MobileCards = styled.div`
  width: 100%;
  background: #fff;
  padding: 0 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  overflow: scroll;
`

export const WrapperBack = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f03;
  cursor: pointer;
  padding: 20px 0;
`

export const MapItems = styled.div`
  height: 600px;
  padding: 10px 20px;
  padding-right: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    height: auto;
    padding: 0;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Back = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;
  color: #f03;
  margin-left: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

export const WrapCard = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    margin-bottom: 0;
  }
`

export const SalonCardWrapper = styled.div`
  width: 373px;
  height: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`

export const ScrollWrap = styled.div`
  width: 413px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

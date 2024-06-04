import styled from 'styled-components'

import { laptopBreakpoint } from './variables'

export const Container = styled.div`
  position: relative;
  background-color: white;
  margin: 34px 15px 0;
  border-radius: 10px 0 0;
  padding: 34px 17px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

export const MainContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0;
  }
`

export const FormField = styled.div`
  margin-bottom: 24px;
`

export const MobileHidden = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const MobileVisible = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

export const NoItemsText = styled.p`
  margin-top: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0;
    font-size: 13px;
    color: #bebebe;
    margin-bottom: 10px;
  }
`

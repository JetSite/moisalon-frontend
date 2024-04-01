import { Tabs } from '@material-ui/core'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Title = styled.h2`
  margin-top: 70px;
  margin-bottom: 40px;
  padding: 0 140px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 35px;
    padding: 0 20px;
    font-size: 20px;
  }
`

export const TabsWrapper = styled.div`
  margin-bottom: 74px;
  border-bottom: 1px solid #d8d8d8;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
  }
`

export const TabsStyled = styled(Tabs)`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;

    .MuiTabs-flexContainer {
      display: block;
      max-width: 50%;
      .MuiTab-root {
        margin-right: 15px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`

export const ContentWrapper = styled.div`
  margin-bottom: 150px;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Term = styled.dt`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

export const Description = styled.dd`
  margin: 0;
  line-height: 27px;
  letter-spacing: -0.04px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }

  p {
    margin: 30px 0;
  }

  ul {
    margin-left: 50px;

    @media (max-width: ${laptopBreakpoint}) {
      margin-left: 20px;
    }
  }

  ul li {
    list-style: disc;
    margin: 10px 0;
  }
`

export const TabTitle = styled.h4`
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.86px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    line-height: 30px;
  }
`

import styled from 'styled-components'
import { lighten } from 'polished'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div<{ masterPage: boolean }>`
  display: ${props => (props.masterPage ? 'block' : 'none')};
  padding-top: ${props => (props.masterPage ? '20px' : '0')};

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    margin-top: ${props => (props.masterPage ? '30px' : '0')};
    padding: 0 20px;
  }
`

export const NoServicesText = styled.p`
  margin-bottom: 60px;
`

export const Top = styled.div<{ masterPage: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => (props.masterPage ? '20px' : '70px')};
  padding-bottom: ${props => (props.masterPage ? '10px' : '40px')};
  border-bottom: ${props =>
    props.masterPage ? '1px solid #a2a2a2' : '0.5px solid #a2a2a2'};

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 24px;
    padding-bottom: 6px;
  }
`

export const TitleWrap = styled.div`
  display: flex;
`

export const Title = styled.p<{ masterPage: boolean }>`
  font-size: ${props => (props.masterPage ? '22px' : '30px')};
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Count = styled.p`
  color: #cdcdcd;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const PhoneButton = styled.a`
  margin-top: 50px;
  margin-bottom: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
  color: #fff;
  background-color: #f03;
  border: 1px solid #f03;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

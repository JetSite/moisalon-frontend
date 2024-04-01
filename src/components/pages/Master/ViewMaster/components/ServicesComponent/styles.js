import styled from 'styled-components'
import { lighten } from 'polished'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  padding-bottom: 34px;
  padding-top: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const NoServicesText = styled.p`
  margin-bottom: 60px;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;
  padding-bottom: 40px;
  border-bottom: 0.5px solid #a2a2a2;
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
`

export const Count = styled.p`
  color: #cdcdcd;
  font-size: 18px;
  font-weight: 600;
`

export const Content = styled.div`
  display: ${props => (props.masterPage ? 'block' : 'flex')};
  justify-content: space-between;
  column-gap: 40px;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

export const LeftColumn = styled.div`
  width: 50%;
`

export const RightColumn = styled.div`
  width: 50%;
`

export const PhoneButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 335px;
  color: #fff;
  background-color: #f03;
  border: 1px solid #f03;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

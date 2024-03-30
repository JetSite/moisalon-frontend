import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 690px;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 36px;
  }
`

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 90px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`

export const Form = styled.form``

export const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 108px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 60px;
  }
`

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`

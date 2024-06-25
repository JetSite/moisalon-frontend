import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import Button from '../../../../../ui/Button'

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
  }
`

export const WrapperSeats = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${laptopBreakpoint}) {
    gap: 20px;
  }
`

export const TitleRent = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const TextRent = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin-top: 18px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Text = styled.p`
  font-weight: 600;
  font-size: 20px;
  margin-top: 18px;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ButtonCustom = styled(Button)`
  width: 300px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 308px;
    font-size: 14px;
  }
`

import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    width: 311px;
    text-align: center;
  }
`

export const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
  text-align: ${({ align }) => align};
  @media (max-width: ${laptopBreakpoint}) {
    display: inline-block;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const customAlign = {
  left: 'flex-start',
  center: 'space-between',
  right: 'flex-end',
}

export const CountWrapper = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: ${({ align }) => customAlign[align]};
  @media (max-width: ${laptopBreakpoint}) {
    display: inline-flex;
  }
`

export const Value = styled.p`
  display: flex;
  justify-content: flex-end;
  width: 27px;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    width: 14px;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

export const Days = styled(Value)`
  width: 85px;
  justify-content: flex-end;

  @media (max-width: ${laptopBreakpoint}) {
    width: 50px;
  }
`

export const Dots = styled(Value)`
  width: 3px;
  justify-content: center;
  margin-left: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 4px;
  }
`

export const End = styled(Value)`
  margin-top: 14px;
  width: 100%;
  justify-content: flex-end;
  @media (max-width: ${laptopBreakpoint}) {
    display: inline-block;
    width: 147px;
    margin-top: 0;
    margin-left: 10px;
  }
`

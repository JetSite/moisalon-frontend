import styled from 'styled-components'
import { laptopBreakpoint, red } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  min-width: 170px;
  position: absolute;
  bottom: -230px;
  left: 0;
  padding: 20px 40px 20px 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  z-index: 600;

  @media (max-width: ${laptopBreakpoint}) {
    bottom: -180px;
  }
`

export const CityList = styled.ul``

export const CityItem = styled.li`
  list-style: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  cursor: pointer;
  :hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 35px;
  }
`

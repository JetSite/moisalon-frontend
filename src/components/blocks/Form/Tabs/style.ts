import { red, laptopBreakpoint } from '../../../../styles/variables'
import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Back = styled.div`
  background: url('/icon-back.svg') no-repeat center;
  position: absolute;
  width: 10px;
  height: 10px;
  background-size: contain;
  content: '';
  left: -20px;
  top: 50%;
  margin-top: -5px;
`

export const Tab = styled.div`
  cursor: pointer;
  position: relative;
  display: block;
`

export const Text = styled.div<{ active?: boolean }>`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  text-decoration: ${props => (props.active ? 'underline' : '')};
  transition: 0.5s;
  &:hover {
    color: #f03;
  }
`

export const TextRed = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  cursor: pointer;
  color: #f03;
`

export const Quantity = styled.div`
  position: relative;
  bottom: 2px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-left: 15px;
  color: #fff;
  background-color: ${red};
  border-radius: 50%;
  font-size: 9px;
  font-weight: 600;
  text-decoration: none;
`

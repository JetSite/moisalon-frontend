import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  margin-top: 50px;
  padding: 0 140px;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
  }
`

export const ScrollRef = styled.div`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: relative;
  top: -100px;
`

export const FilterWrap = styled.div<{ active: string }>`
  width: 516px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 34px;
  height: 34px;
  display: flex;
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    background: #f03;
    position: absolute;
    width: 172px;
    height: 100%;
    border-radius: 100px;
    top: 0px;
    transition: 0.3s;
    left: ${({ active }) =>
      active === 'all' ? '0px' : active === 'master' ? '172px' : '344px'};
    z-index: 1;
  }
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
    width: 256px;
    height: 28px;
    &:before {
      width: calc(256px / 3);
      left: ${props =>
        props.active === 'all'
          ? '0px'
          : props.active === 'master'
          ? 'calc(256px / 3)'
          : 'calc(254px - 255px / 3)'};
    }
  }
`

export const TextFilter = styled.div<{ active: boolean }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.084px;
  width: 172px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 0.3s;
  z-index: 2;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  @media (max-width: ${laptopBreakpoint}) {
    width: calc(256px / 3);
    font-size: 10px;
  }
`

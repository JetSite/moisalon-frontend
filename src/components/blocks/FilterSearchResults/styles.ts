import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div<{ view: 'list' | string }>`
  display: flex;
  width: 100%;
  justify-content: ${props =>
    props.view === 'list' ? 'space-between' : 'flex-end'};
  margin-bottom: 55px;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-bottom: 35px;
  }
`

export const FilterItem = styled.div<{ active: boolean; salon: boolean }>`
  min-width: 187px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${props => (props.active ? '1px solid #f03' : '1px solid #000')};
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  background: ${props => (props.active ? '#f03' : '#fff')};

  :not(:last-child) {
    margin-right: 16px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    min-width: 119px;
    height: 28px;
    margin-bottom: ${props => (props.salon ? '16px' : '31px')};
    padding-left: 21px;
    justify-content: flex-start;
  }
`

export const Text = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${props => (props.active ? '#fff' : '#000')};

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

export const FilterArrowWrap = styled.div<{ active: boolean }>`
  position: absolute;
  top: ${props => (props.active ? '12px' : '7px')};
  right: 13px;
  width: 13px;
  height: 13px;
  transition: 0.3s;
  transform: ${props => (props.active ? 'rotate(180deg)' : 'rotate(0)')};

  @media (max-width: ${laptopBreakpoint}) {
    top: 50%;
    margin-top: -10px;
    right: 9%;
    width: 11px;
  }
`

export const FilterArrow = styled.img`
  width: 100%;
`

export const Wrap = styled.div`
  display: flex;
`
export const FilterWrap = styled.div<{ active: boolean; disabled?: boolean }>`
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
    left: ${props => (props.active ? '0px' : '172px')};
    z-index: 1;
  }
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
    width: 256px;
    height: 28px;
    &:before {
      width: 128px;
      left: ${props => (props.active ? '0px' : '126px')};
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
  color: ${props => (props.active ? '#fff' : '#000')};
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
  }
`

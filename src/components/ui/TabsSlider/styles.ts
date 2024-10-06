import { lighten } from 'polished'
import styled from 'styled-components'

import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div<{ isSticky?: boolean }>`
  box-sizing: border-box;
  position: sticky;
  top: 80px;
  z-index: 100;
  background-color: #fff;
  box-shadow: ${({ isSticky }) =>
    isSticky
      ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      : 'none'};

  @media (max-width: ${laptopBreakpoint}) {
    top: 81px;
    padding: 10px 0;
    z-index: 100;
  }
`

export const Item = styled.a<{ active: boolean }>`
  display: flex;
  width: 173px;
  border: 1px solid;
  border-color: ${props => (props.active ? '#f03' : '#000')};
  border-radius: 50px;
  height: 36px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 25px;
  flex: 1;
  flex-shrink: 0;
  transition: 0.3s;
  background-color: ${props => (props.active ? '#f03' : '#fff')};
  p {
    color: ${props => (props.active ? '#fff' : '#000')};
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #f03;
    border: 1px solid #f03;
    p {
      color: #fff;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 97px;
    height: 28px;
    margin-right: 7px;
    flex-basis: 97px;
  }
`

export const Count = styled.div`
  font-size: 12px;
  height: 26px;
  width: 26px;
  background: #f0f0f0;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 7px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

export const Content = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 20px 140px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  noindex {
    flex: 1;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
  }
`

export const SwiperWrap = styled.div`
  width: 100%;
`

export const NavigationWrapper = styled.div`
  display: flex;
  max-width: 100px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 33px;
`

export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* margin-bottom: 34px; */
`

export const OnlineButton = styled.a`
  width: 173px;
  height: 36px;
  font-weight: 600;
  font-size: 12px;
  color: #fff;
  background: #ff0033;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
  @media (max-width: ${laptopBreakpoint}) {
    height: 28px;
    width: 97px;
    text-align: center;
    font-size: 10px;
    flex-shrink: 0;
  }
`

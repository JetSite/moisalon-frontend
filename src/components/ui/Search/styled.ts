import styled from 'styled-components'

import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;

  @media (max-width: ${laptopBreakpoint}) {
    height: 100px;
    flex-direction: column;
    margin-bottom: 22px;
  }
`

export const ClearIcon = styled.div`
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  background: url('/close-cross.svg') no-repeat center;
  background-size: contain;
  cursor: pointer;
  right: 20px;
  top: 50%;
  transform: translateY(-13px);
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const InputWrap = styled.div<{ noFilters: boolean }>`
  position: relative;
  flex-shrink: 0;
  margin-right: ${props => (props.noFilters ? '0' : '22px')};
  flex-grow: 1;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  -webkit-appearance: none;

  &:before {
    position: absolute;
    content: '';
    left: 20px;
    top: 17px;
    background: url('/search.svg') no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 20px;
    height: 22px;
  }
  /* &:after {
    position: absolute;
    content: "";
    right: 20px;
    top: 15px;
    background: url("/filter.svg") no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 22px;
    height: 25px;
  } */

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
    flex-grow: 0;
  }
`

export const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  outline: none;
  font-weight: 600;
  font-size: 18px;
  padding-left: 50px;
  padding-right: 50px;
  height: 56px;
  -webkit-appearance: none;
  ::-webkit-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  ::-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-ms-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  &[type='search'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  &[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
`

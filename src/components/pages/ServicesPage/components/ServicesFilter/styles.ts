import styled from 'styled-components'
import {
  red,
  laptopBreakpoint,
  mobileBreakpoint,
} from '../../../../../styles/variables'

export const Wrapper = styled.div`
  margin-bottom: 62px;
  display: flex;
  @media (max-width: ${laptopBreakpoint}) {
    column-gap: 20px;
  }
`

export const FilterItemWrapper = styled.div<{ isEmpty: boolean }>`
  width: 245px;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${({ isEmpty }) => (isEmpty ? 'none' : 'auto')};
  opacity: ${({ isEmpty }) => (isEmpty ? 0.5 : 1)};

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 300px;
  }
`

export const FilterColumn = styled.div`
  margin-right: 91px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`

export const Text = styled.p<{ active: boolean }>`
  color: ${({ active }) => (active ? '#000' : '#a1a1a1')};
  font-size: 14px;
  font-weight: 600;
  line-height: 27px;
  flex-grow: 1;
  transition: 0.3s;

  ${FilterItemWrapper}:hover & {
    color: #000;
  }

  @media (max-width: ${mobileBreakpoint}) {
    font-size: 12px;
  }
`

export const Count = styled.span<{ isEndElement: boolean }>`
  /* margin-right: ${({ isEndElement }) => (isEndElement ? '16px' : '5px')};
  color: #a1a1a1;
  font-size: 14px;
  position: relative; */
  display: flex;
  width: 15px;
  margin-right: ${({ isEndElement }) => (isEndElement ? '16px' : '5px')};
  color: #a1a1a1;
  font-size: 14px;
  justify-content: center;
  align-items: center;
`

export const Icon = styled.div`
  width: 11px;
  height: 11px;
  background: url('/arrow-next-2.svg') no-repeat center;
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const BackText = styled.p`
  position: absolute;
  top: -28px;
  left: 140px;
  color: #a1a1a1;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #000;
  }
`

export const ScrollDiv = styled.span`
  width: 0;
  height: 0;
  opacity: 0;
  position: relative;
  top: -220px;
`

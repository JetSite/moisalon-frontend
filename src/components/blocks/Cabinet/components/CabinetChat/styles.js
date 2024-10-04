import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.section`
  max-width: 710px;
  width: 100%;
  padding-top: 178px;
  margin: 0 auto;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`

export const BackBtn = styled.div`
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 20px;
    font-size: 14px;
  }
`

export const ChatContent = styled.div`
  margin-top: 30px;
  max-height: 460px;
  max-width: 710px;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
  }
`

export const Error = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
`

export const ScrollDiv = styled.div`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: relative;
`

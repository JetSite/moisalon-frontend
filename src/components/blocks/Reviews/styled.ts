import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-bottom: 118px;
  padding-top: 90px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 67px;
    margin-bottom: 0;
  }
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 0.5px solid #a2a2a2;

  @media (max-width: ${laptopBreakpoint}) {
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`

export const Count = styled.p`
  color: #f03;
  font-weight: 600;
  font-size: 18px;
  span {
    color: #cdcdcd;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Review = styled.div`
  position: relative;
  width: 45%;
  margin-bottom: 60px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
`

export const Text = styled.p`
  font-size: 14px;
  line-height: 27px;
`

export const Buttons = styled.div`
  display: flex;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 16px;
`

export const FormButtons = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    button {
      margin-bottom: 15px;
      width: 100%;
    }
  }
`

export const EditButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 10px;
  padding: 4px 6px;
  border-radius: 8px;
  opacity: 0.6;

  :disabled {
    cursor: default;
    :hover {
      background: none;
    }
  }
  :hover {
    background-color: lightgray;
  }
`

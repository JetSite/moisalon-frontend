import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'
import Button from 'src/components/ui/Button'

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

export const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Review = styled.li<{ active?: boolean }>`
  position: relative;
  width: 45%;
  margin-bottom: 30px;
  margin-left: -8px;
  padding: 8px 4px 8px 10px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#ececec' : 'white')};
  opacity: ${({ active }) => (active ? 0.8 : 1)};

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
  width: 100%;
  max-width: 335px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: none;
  }
`

export const FormEditButtons = styled.div<{ editID?: boolean }>`
  display: ${({ editID }) => (editID ? 'grid' : 'flex')};
  grid-template-columns: 1fr 80px;
  gap: 8px;
  width: 100%;
`

export const DeleteFormButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;

  :hover {
    background-color: gray;
  }

  & svg {
    fill: red;
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

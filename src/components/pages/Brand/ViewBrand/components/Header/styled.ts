import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 60px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 0;
  }
`
export const IContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    column-gap: 10px;
    margin-top: 71px;
    margin-bottom: 30px;
  }
`
export const LogoBlock = styled.div`
  width: 100%;
`
export const Photo = styled.div`
  width: 450px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 269px;
  }
`

export const EditButton = styled.div`
  background: #f0f0f0;
  border-radius: 50px;
  width: 397px;
  height: 35px;
  margin: 0 auto;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 28px;
  margin-bottom: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    width: 100%;
    max-width: 320px;
    height: 28px;
  }
`
export const MinimalSumm = styled.div`
  margin-bottom: 40px;
`

export const MinimalSummTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  max-width: 335px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 27px;
`

export const MinimalSummText = styled.div`
  font-size: 18px;
`

export const WrapCharacter = styled.div`
  margin-bottom: 80px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
  }
`

export const Character = styled.p`
  max-width: 335px;
  padding-bottom: 5px;
  border-bottom: 1px solid #e3e3e3;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  &:before {
    width: 10px;
    height: 10px;
    position: absolute;
    content: '';
    background: url('/arrow-back.svg') no-repeat;
    background-size: contain;
    transform: rotate(180deg);
    right: 0;
    top: 6px;
  }
`

export const OpenCharacter = styled.p`
  font-weight: 600;
  font-size: 18px;
  max-width: 335px;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 5px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  &:before {
    width: 10px;
    height: 10px;
    position: absolute;
    content: '';
    background: url('/arrow-back.svg') no-repeat;
    background-size: contain;
    transform: rotate(270deg);
    right: 0;
    top: 6px;
  }
`

export const Terms = styled.div`
  font-size: 18px;
  line-height: 30px;
  max-width: 560px;
  width: 100%;
`

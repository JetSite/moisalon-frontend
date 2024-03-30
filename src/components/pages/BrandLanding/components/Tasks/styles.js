import styled from 'styled-components'
import {
  red,
  laptopBreakpoint,
  tabletBreakpoint,
} from '../../../../../styles/variables'

export const Wrapper = styled.div`
  padding: 85px 140px 0 140px;

  @media (max-width: ${tabletBreakpoint}) {
    padding: 50px;
    padding-top: 60px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 20px;
  }
`

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;

  @media (max-width: ${tabletBreakpoint}) {
    font-size: 24px;
    line-height: 36px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Text = styled.p`
  max-width: 621px;
  margin-top: 57px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 27px;
    font-size: 16px;
    line-height: 26px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const TasksCards = styled.div`
  margin-top: 73px;
  height: 201px;
  display: flex;

  @media (max-width: ${tabletBreakpoint}) {
    height: auto;
    flex-wrap: wrap;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const TasksCard = styled.div`
  flex: 1 0 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 27px;
  border: 1px solid #000;
  border-left: none;

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${tabletBreakpoint}) {
    flex: 1 0 25%;
    padding-top: 17px;
    min-height: 238px;
    border-bottom: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex: 1 0 100%;
    min-height: 138px;
    border-right: none;
  }
`

export const CardNumber = styled.p`
  color: ${red};
  font-size: 48px;
  font-weight: 500;
  line-height: 60px;
`

export const CardText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 27px;
  text-align: center;
`

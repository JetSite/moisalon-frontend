import styled, { css } from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const Wrapper = styled.div`
  padding: 0 140px;
  box-sizing: border-box;
  width: 1440px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
  }
`

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 24px;
  }
`

export const Content = styled.div`
  margin-bottom: 90px;
`

const flexOptions = css`
  column-gap: 15px;
  row-gap: 15px;
  a {
    width: 100%;
    max-width: 280px;
  }
`

const gridOptions = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  column-gap: 14px;
  row-gap: 20px;
`

export const List = styled.div<{ type: string }>`
  margin-top: 35px;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  column-gap: 17px;
  row-gap: 35px;

  a {
    color: #000;
  }

  @media (max-width: ${laptopBreakpoint}) {
    ${({ type }) => (type === 'vacancies' ? gridOptions : flexOptions)}
  }
`

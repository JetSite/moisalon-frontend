import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  width: 67%;
  padding: 0 140px;
  padding-top: 75px;

  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin: 35px 0;
    padding: 0 20px;
  }
`

export const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 25px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`

export const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`

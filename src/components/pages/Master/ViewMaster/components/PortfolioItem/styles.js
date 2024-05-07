import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import { PHOTO_URL } from 'src/api/variables'

export const PortfolioItemBlock = styled.div`
  position: relative;
  width: 275px;
  height: 275px;
  background: ${props => `url(${PHOTO_URL}${props.item.url}) no-repeat
    center`};
  background-size: contain;

  @media (max-width: ${laptopBreakpoint}) {
    width: 176px;
    height: 176px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  }
`

export const Wrap = styled.div`
  position: relative;
`

export const DeleteIcon = styled.div`
  content: '';
  position: absolute;
  top: 19px;
  right: 17px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  background: url('/close-cross-red.svg') no-repeat center;
`

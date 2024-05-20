import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import {
  laptopBreakpoint,
  tabletBreakpoint,
  mobileBreakpoint,
} from '../../../styles/variables'
import { IID } from 'src/types/common'

export const BItem = styled.div<{ type: string }>`
  width: ${({ type }) => (type === 'slider' ? '17.7rem' : '100%')};
  aspect-ratio: 1;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 100%;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`

export const BrandImage = styled.img`
  width: 100%;
`

export const Favorite = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 15px;
  top: -10px;

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const SkeletonItem = styled(Skeleton)`
  width: 173px;
  height: 173px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 13rem;
  }
`

export const ShareWrap = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`

export const BrandShareWrap = styled(ShareWrap)`
  top: unset;
  bottom: 3px;
  right: 2px;
  @media (max-width: ${laptopBreakpoint}) {
    right: -2px;
  }
`

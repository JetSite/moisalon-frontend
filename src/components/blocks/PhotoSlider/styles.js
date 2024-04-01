import styled from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const PhotosSliderWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  overflow: hidden;
`

export const PhotosSliderContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  transition: all 0.4s;
  transform: ${({ translateValue }) => `translateX(-${translateValue}px)`};
`

export const PhotoWrapper = styled.div`
  width: ${({ itemWidth }) => `${itemWidth}px`};
  height: ${({ itemHeight }) => `${itemHeight}px`};
  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: ${({ itemMarginRight }) => `${itemMarginRight}px`};
  }

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 500px;
  }
`

export const Photo = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`

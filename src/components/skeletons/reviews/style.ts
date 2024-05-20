import styled from 'styled-components'
import { Name, Text, Review } from '../../blocks/Reviews/styled'
import { skeletonsAnimation } from '../stile'

export const WrapperSceleton = styled(Review)`
  opacity: 0.2;
  animation: ${skeletonsAnimation} 3s infinite;
`

export const NameSkeleton = styled(Name)`
  width: 100%;
  display: block;
  background-color: gray;
  height: 44px;
  border-radius: 4px;
  margin-right: 16px;
`

export const TextSkeleton = styled(Text)`
  width: 100%;
  display: block;
  background-color: gray;
  opacity: 0.8;
  height: 2rem;
  border-radius: 4px;
  margin-right: 16px;
`

import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 70px;
  }
`

const SkeletonRect = styled(Skeleton)`
  width: 100%;
  margin-bottom: 20px;
`

const AdvicesSkeleton = () => {
  return (
    <Wrapper>
      <SkeletonRect variant="rect" height={40} />
    </Wrapper>
  )
}

export default AdvicesSkeleton

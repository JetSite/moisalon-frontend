import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import { laptopBreakpoint } from '../../../../../styles/variables'

const SkeletonRect = styled(Skeleton)`
  width: 1160px;
  margin: 40px auto;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const MainSearchSkeleton = () => {
  return <SkeletonRect variant="rect" height={300} />
}

export default MainSearchSkeleton

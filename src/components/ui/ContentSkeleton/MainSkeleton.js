import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import { MainContainer } from '../../../styles/common'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 34px;
  }
`

const LinesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
`

const SkeletonRectBig = styled(Skeleton)`
  margin-top: 20px;
`

const SkeletonRectSmall = styled(Skeleton)`
  margin-top: 20px;
`

const MainSkeleton = () => {
  return (
    <MainContainer>
      <Wrapper>
        <LinesWrapper>
          <Skeleton variant="text" width={580} height={50} />
          <SkeletonRectSmall variant="rect" width={173} height={59} />
          <SkeletonRectBig variant="rect" width={1160} height={300} />
          <Skeleton variant="text" width={580} height={50} />
          <SkeletonRectBig variant="rect" width={1160} height={300} />
          <SkeletonRectBig variant="rect" width={1160} height={300} />
          <SkeletonRectBig variant="rect" width={1160} height={300} />
          <Skeleton variant="text" width={580} height={50} />
          <Skeleton variant="text" width={580} height={50} />
          <Skeleton variant="text" width={580} height={50} />
          <SkeletonRectBig variant="rect" width={1160} height={300} />
        </LinesWrapper>
      </Wrapper>
    </MainContainer>
  )
}

export default MainSkeleton

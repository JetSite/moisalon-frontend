import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import SearchBlock from '../../../components/blocks/SearchBlock'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 75px;
  margin-bottom: 75px;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 70px;
  }
`

const CirclesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LinesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;
`

const SkeletonCircleBig = styled(Skeleton)`
  display: inline-block;
  width: 173px;
  height: 173px;
  margin: 0 57px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 89px;
    height: 89px;
    margin: 0 21px;
  }
`

const SkeletonCircleSmall = styled(Skeleton)`
  display: inline-block;
  width: 55px;
  height: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 28px;
  }
`

const SkeletonRectBig = styled(Skeleton)`
  margin-top: 20px;
`

const SkeletonRectSmall = styled(Skeleton)`
  margin-top: 20px;
`

const ContentSkeleton = ({ me, loading }) => {
  return (
    <MainLayout me={me} loading={loading}>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <CirclesWrapper>
            <SkeletonCircleSmall variant="circle" />
            <SkeletonCircleBig variant="circle" />
            <SkeletonCircleSmall variant="circle" />
          </CirclesWrapper>
          <LinesWrapper>
            <Skeleton variant="text" width={580} height={50} />
            <SkeletonRectSmall variant="rect" width={173} height={59} />
            <SkeletonRectBig variant="rect" width={1160} height={300} />
          </LinesWrapper>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default ContentSkeleton

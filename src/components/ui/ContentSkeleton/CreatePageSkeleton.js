import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 140px;
  margin-top: 40px;
  margin-bottom: 60px;
  height: 600px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const Left = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    align-items: center;
  }
`

const Right = styled.div`
  width: 60%;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const SkeletonCircle = styled(Skeleton)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 50px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 92px;
    height: 92px;
  }
`

const SkeletonRectLeft = styled(Skeleton)`
  width: 321px;
  height: 325px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    height: 400px;
  }
`

const SkeletonRectRight = styled(Skeleton)`
  margin-top: 40px;
  width: 100%;
  height: 100%;
`

const CreatePageSkeleton = () => {
  return (
    <MainLayout>
      <MainContainer>
        <Wrapper>
          <Left>
            <SkeletonCircle variant="circle" />
            <SkeletonRectLeft variant="rect" />
          </Left>
          <Right>
            <SkeletonRectRight variant="rect" />
          </Right>
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default CreatePageSkeleton

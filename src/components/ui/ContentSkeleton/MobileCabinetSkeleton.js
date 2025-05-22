import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import MainLayout from '../../../layouts/MainLayout'
import { laptopBreakpoint } from '../../../styles/variables'

const Wrapper = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
`

const Wrap = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

const Top = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`

const Cards = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`

const Bottom = styled.div`
  width: 100%;
`

const SkeletonCircle = styled(Skeleton)`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-right: 21px;
`

const SkeletonRectTop = styled(Skeleton)`
  width: 100px;
  height: 90px;
  flex: 1;
`

const SkeletonRectCard = styled(Skeleton)`
  width: 90px;
  height: 90px;
  margin-right: 10px;
  border-radius: 5px;
`

const SkeletonRectBottom = styled(Skeleton)`
  margin-top: 50px;
  width: 100%;
  height: 200px;
  margin-bottom: 40px;
`

const MobileCabinetSkeleton = () => {
  return (
    <Wrap>
      <MainLayout>
        <Wrapper>
          <Top>
            <SkeletonCircle variant="circle" />
            <SkeletonRectTop variant="rect" />
          </Top>
          <Cards>
            <SkeletonRectCard variant="rect" />
            <SkeletonRectCard variant="rect" />
            <SkeletonRectCard variant="rect" />
          </Cards>
          <Bottom>
            <SkeletonRectBottom variant="rect" />
          </Bottom>
        </Wrapper>
      </MainLayout>
    </Wrap>
  )
}

export default MobileCabinetSkeleton

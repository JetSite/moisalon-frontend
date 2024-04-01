import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'
import MainLayout from '../../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../../styles/common'
import SearchBlock from '../../../../../../components/blocks/SearchBlock'
import { laptopBreakpoint } from '../../../../../../styles/variables'

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 75px;
  margin-bottom: 75px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

const SkeletonRectBig = styled(Skeleton)`
  margin-top: 20px;
  margin-bottom: 40px;
  width: 1160px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`

const ContentSkeleton = ({ me, loading }) => {
  return (
    <MainLayout me={me} loading={loading}>
      <SearchBlock />
      <MainContainer>
        <Wrapper>
          <SkeletonRectBig variant="rect" height={500} />
        </Wrapper>
      </MainContainer>
    </MainLayout>
  )
}

export default ContentSkeleton

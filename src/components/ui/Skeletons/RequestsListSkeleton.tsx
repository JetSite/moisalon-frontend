import { Skeleton } from '@material-ui/lab'
import { FC } from 'react'
import { ListWrapper } from 'src/components/blocks/Cabinet/components/CabinetRequests/styles'
import { laptopBreakpoint } from 'src/styles/variables'
import styled from 'styled-components'

const SkeletonWrapper = styled(ListWrapper)`
  overflow: hidden;
`

const SkeletonCard = styled(Skeleton)`
  margin: 0 15px;
`

export const RequestsListSkeleton: FC = () => {
  return (
    <SkeletonWrapper>
      <SkeletonCard variant="text" width={330} height={583} />
      <SkeletonCard variant="text" width={330} height={583} />{' '}
      <SkeletonCard variant="text" width={330} height={583} />
      <SkeletonCard variant="text" width={330} height={583} />
    </SkeletonWrapper>
  )
}

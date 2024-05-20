import { ReviewTop } from '../../blocks/Reviews/styled'
import Stars from '../../ui/Stars'
import { NameSkeleton, TextSkeleton, WrapperSceleton } from './style'

export const ReviewSkeleton = () => {
  return (
    <WrapperSceleton>
      <ReviewTop>
        <NameSkeleton />
        <Stars count={0} />
      </ReviewTop>
      <TextSkeleton />
    </WrapperSceleton>
  )
}

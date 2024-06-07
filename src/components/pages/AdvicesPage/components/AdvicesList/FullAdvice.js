import { useQuery } from '@apollo/client'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import {
  AdvItem,
  AdvImage,
  AdvTitle,
  AdvDescription,
  BackWrapper,
} from '../../styles'
import BackButton from '../../../../ui/BackButton'
import { PHOTO_URL } from '../../../../../api/variables'
import { getFeed } from 'src/api/graphql/feed/queries/getFeed'

const FullAdvice = ({ adviceClicked, backHandler }) => {
  const { data: fullAdviceData, loading } = useQuery(getFeed, {
    variables: { id: adviceClicked },
  })

  const item = fullAdviceData?.feed?.data?.attributes
  const photoUrl = item?.beautyFeedCover?.data?.attributes?.url
    ? `${PHOTO_URL}${item.beautyFeedCover.data.attributes.url}`
    : ''

  return !loading ? (
    <>
      <BackWrapper onClick={backHandler}>
        <BackButton onlyType type="Назад" link="/advices" />
      </BackWrapper>
      <AdvItem opened={adviceClicked.length > 0}>
        <AdvImage photoUrl={photoUrl} />
        <MobileHidden>
          <AdvTitle>{item?.beautyFeedTitle}</AdvTitle>
        </MobileHidden>
        <MobileVisible>
          <AdvTitle>{item?.beautyFeedTitle}</AdvTitle>
        </MobileVisible>
        <AdvDescription
          dangerouslySetInnerHTML={{
            __html: item?.beautyFeedContent,
          }}
        />
      </AdvItem>
    </>
  ) : null
}

export default FullAdvice

import { useQuery } from '@apollo/client'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import {
  AdvItem,
  AdvImage,
  AdvTitle,
  AdvDescription,
  BackWrapper,
} from '../../styles'
import { getFullAdvice } from '../../../../../_graphql-legacy/advices/getFullAdvice'
import BackButton from '../../../../ui/BackButton'
import { PHOTO_URL } from '../../../../../variables'

const FullAdvice = ({ adviceClicked, backHandler }) => {
  const { data: fullAdviceData, loading } = useQuery(getFullAdvice, {
    context: { uri: 'https://moi.salon/graphql' },
    variables: { id: adviceClicked },
  })

  const item = fullAdviceData?.page
  const photoUrl = `${PHOTO_URL}${item?.photoId}/original`
  return !loading ? (
    <>
      <BackWrapper onClick={backHandler}>
        <BackButton onlyType type="Назад" link="/advices" />
      </BackWrapper>
      <AdvItem opened={adviceClicked.length > 0}>
        <AdvImage photoUrl={photoUrl} />
        <MobileHidden>
          <AdvTitle>{item?.title}</AdvTitle>
        </MobileHidden>
        <MobileVisible>
          <AdvTitle>{item?.title}</AdvTitle>
        </MobileVisible>
        <AdvDescription
          dangerouslySetInnerHTML={{
            __html: item?.desc,
          }}
        />
      </AdvItem>
    </>
  ) : null
}

export default FullAdvice

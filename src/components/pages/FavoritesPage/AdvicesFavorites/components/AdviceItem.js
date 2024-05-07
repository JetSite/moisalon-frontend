import { useRouter } from 'next/router'
import styled from 'styled-components'
import { favoritesInStorage } from '../../../../../utils/favoritesInStorage'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { laptopBreakpoint } from '../../../../../styles/variables'
import {
  AdvImage,
  AdvTitle,
  AdvShortDescription,
  ReadMore,
} from '../../../../AdvicesPage/styles'
import { PHOTO_URL } from '../../../../../api/variables'
import HeartFullFill from '../../../MainPage/components/Header/icons/HeartFullFill'
import { red } from '../../../../../styles/variables'

const AdvItem = styled.div`
  width: 100%;
  max-width: 373.5px;
  position: relative;
  cursor: ${({ opened }) => (opened ? 'default' : 'pointer')};
  &:not(:last-child) {
    margin-bottom: 75px;
  }
  @media (max-width: ${laptopBreakpoint}) {
  }
`

const Favorite = styled.div`
  width: 20px;
  height: 20px;
  padding: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  background-size: 20px 20px;

  @media (max-width: ${laptopBreakpoint}) {
    top: 18px;
    right: 18px;
  }
`

const AdviceItem = ({ advice, deleteItem, setDeleteItem }) => {
  const router = useRouter()

  const photoUrl = `${PHOTO_URL}${advice?.photoId}/original`

  const itemClickHandler = () => {
    router.push(
      {
        pathname: '/advices',
        query: { advId: advice.id, advCat: advice.categoryId },
      },
      '/advices',
    )
  }

  const addFavorite = (e, advice) => {
    e.preventDefault()
    e.stopPropagation()
    favoritesInStorage('advices', advice)
    setDeleteItem(!deleteItem)
  }

  return (
    <AdvItem onClick={itemClickHandler}>
      <AdvImage photoUrl={photoUrl} />
      <Favorite onClick={e => addFavorite(e, advice)}>
        <HeartFullFill fill={red} />
      </Favorite>
      <MobileHidden>
        <AdvTitle>{advice.title}</AdvTitle>
      </MobileHidden>
      <MobileVisible>
        <AdvTitle>{advice.title}</AdvTitle>
      </MobileVisible>
      <AdvShortDescription>
        {advice.short_desc} <ReadMore>Далее</ReadMore>
      </AdvShortDescription>
    </AdvItem>
  )
}

export default AdviceItem

import { useRouter } from 'next/router'
import MenuCards from './components/MenuCards'
import { Wrapper, Info, Logo, Text, Title, Subtitle } from './styles'
import { FC, useMemo } from 'react'
import { ISalonPage } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IReview } from 'src/types/reviews'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { PHOTO_URL } from 'src/api/variables'
import { IBrand } from 'src/types/brands'
import { getCards } from './config'

export interface IMobileHeaderTab {
  title: string
  icon?: string
  anchor?: string
  href?: string
  quantity?: number
}

interface Props {
  category?: ISalonPage | IBrand
  master?: IMaster
  reviews?: IReview[]
}

const CabinetHeaderMobile: FC<Props> = ({ category }) => {
  const { user } = useAuthStore(getStoreData)
  const router = useRouter()
  let id = category?.id

  const { cards, subtitle } = useMemo(
    () => getCards({ category, router, user }),
    [user, router, category],
  )

  return (
    <Wrapper>
      <Info>
        <Logo url={PHOTO_URL + category?.logo?.url} />
        <Text>
          <Title>{category?.name}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Text>
      </Info>
      <MenuCards cards={cards} itemId={id} />
    </Wrapper>
  )
}

export default CabinetHeaderMobile

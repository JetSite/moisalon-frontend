import { IBrand } from 'src/types/brands'
import { PHOTO_URL } from '../../../../../../../api/variables'
import { FC } from 'react'
import { ItemWrapper, Logo, RemoveButton } from './styles'

interface Props {
  brand: IBrand
  brands?: IBrand[]
  handlePublish?: any
}

const BrandItem: FC<Props> = ({ brand, brands, handlePublish }) => {
  const published = !!brands?.find(el => el.id === brand.id)
  return (
    <ItemWrapper published={published}>
      <Logo
        src={`${PHOTO_URL}${brand?.logo?.url}`}
      />
      <RemoveButton
        published={published}
        onClick={e => handlePublish(e, brand.id, published)}
      />
    </ItemWrapper>
  )
}

export default BrandItem

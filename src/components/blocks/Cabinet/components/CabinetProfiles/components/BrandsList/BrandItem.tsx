import { IBrand } from 'src/types/brands'
import { PHOTO_URL } from '../../../../../../../api/variables'
import { FC, MouseEvent } from 'react'
import { ItemWrapper, Logo, RemoveButton } from './styles'
import { IID } from 'src/types/common'

export type IHandlePublishBrand = (
  e: MouseEvent<HTMLButtonElement>,
  id: IID,
  published: boolean,
) => void

interface Props {
  brand: IBrand
  brands?: IBrand[]
  handlePublish?: IHandlePublishBrand
}

const BrandItem: FC<Props> = ({ brand, brands, handlePublish }) => {
  const published = !!brands?.find(el => el.id === brand.id)
  return (
    <ItemWrapper published={published}>
      <Logo src={`${PHOTO_URL}${brand?.logo?.url}`} />
      <RemoveButton
        published={published}
        onClick={e => {
          handlePublish && handlePublish(e, brand.id, published)
        }}
      />
    </ItemWrapper>
  )
}

export default BrandItem

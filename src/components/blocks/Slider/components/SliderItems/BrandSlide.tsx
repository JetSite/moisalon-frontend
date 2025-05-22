import { FC } from 'react'
import Link from 'next/link'
import BrandItem from '../../../BrandCard/index'
import { ButtonClose } from './styles'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

export type IDeleteFunction = (id: IID) => void

interface Props {
  item: IBrand
  isEditing: boolean
  deleteFunction?: IDeleteFunction
}

const BrandSlide: FC<Props> = ({ item, isEditing, deleteFunction }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${item.city?.slug || city.slug}/brand/${item?.id}`}>
      <BrandItem
        brand={item}
        shareLink={`https://moi.salon/${item.city?.slug || city.slug}/brand/${
          item?.id
        }`}
        isEditing={isEditing}
      >
        {isEditing ? (
          <ButtonClose
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              deleteFunction && deleteFunction(item.id)
            }}
          />
        ) : null}
      </BrandItem>
    </Link>
  )
}

export default BrandSlide

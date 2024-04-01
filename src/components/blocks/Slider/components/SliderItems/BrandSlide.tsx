import { FC, useContext } from 'react'
import Link from 'next/link'
import BrandItem from '../../../BrandCard/index'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'
import { ButtonClose } from './styles'
import { IBrand } from 'src/types/brands'
import { IID } from 'src/types/common'

export type IDeleteFunction = (id: IID) => void

interface Props {
  item: IBrand
  isEditing: boolean
  deleteFunction?: IDeleteFunction
}

const BrandSlide: FC<Props> = ({ item, isEditing, deleteFunction }) => {
  const [city] = useContext(CityContext)

  return (
    <Link
      href={`/${cyrToTranslit(item?.city?.cityName || city)}/brand/${item?.id}`}
    >
      <BrandItem
        brand={item}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item.city?.cityName || city,
        )}/brand/${item?.id}`}
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

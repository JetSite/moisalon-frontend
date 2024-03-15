import { useContext } from 'react'
import Link from 'next/link'
import BrandItem from '../../../BrandCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'
import { ButtonClose } from './styles'

const BrandSlide = ({ item, isEditing, deleteFunction }) => {
  const [city] = useContext(CityContext)

  return (
    <Link
      href={`/${cyrToTranslit(item?.addressFull?.city || city)}/brand/${
        item?.seo?.slug || item?.id
      }`}
    >
      <BrandItem
        brand={item}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item?.addressFull?.city || city,
        )}/brand/${item?.seo?.slug || item?.id}`}
        isEditing={isEditing}
      >
        {isEditing ? (
          <ButtonClose
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              deleteFunction(item.id)
            }}
          />
        ) : null}
      </BrandItem>
    </Link>
  )
}

export default BrandSlide

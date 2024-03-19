import { useContext } from 'react'
import Link from 'next/link'
import SalonItem from '../../../SalonCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'

const RentSalonSlide = ({ item }) => {
  const [city] = useContext(CityContext)

  return (
    <Link
      href={`/${cyrToTranslit(item?.salon?.address?.city)}/rent/${
        item?.salon?.seo?.slug || item?.salon?.id
      }`}
    >
      <SalonItem
        item={item?.salon}
        seatCount={item?.seatCount}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item?.salon?.address?.city || city,
        )}/salon/${item?.salon?.seo?.slug || item?.salon?.id}`}
        rent
      />
    </Link>
  )
}

export default RentSalonSlide

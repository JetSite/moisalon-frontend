import Link from 'next/link'
import SalonItem from '../../../SalonCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { ISalon } from 'src/types/salon'

const RentSalonSlide = ({ item }: { item: ISalon }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${city.slug}/rent/${item?.id}`}>
      <SalonItem
        item={item}
        // seatCount={item?.seatCount}
        shareLink={`https://moi.salon/${city.slug}/salon/${item.id}`}
        rent
      />
    </Link>
  )
}

export default RentSalonSlide

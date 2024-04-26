import Link from 'next/link'
import MasterItem from '../../../MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { IMaster } from 'src/types/masters'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const MasterSlide = ({ item }: { item: IMaster | null }) => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${cyrToTranslit(city)}/master/${item?.id}`}>
      <MasterItem
        master={item}
        shareLink={`https://moi.salon/${cyrToTranslit(
          item?.city?.citySlug || city,
        )}/master/${item?.id}`}
      />
    </Link>
  )
}

export default MasterSlide

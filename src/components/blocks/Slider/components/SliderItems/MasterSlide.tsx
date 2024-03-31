import { useContext } from 'react'
import Link from 'next/link'
import MasterItem from '../../../MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { CityContext } from '../../../../../searchContext'
import { IMaster } from 'src/types/masters'

const MasterSlide = ({ item }: { item: IMaster | null }) => {
  const [city] = useContext(CityContext)

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

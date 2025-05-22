import Link from 'next/link'
import AdCard from '../../../AdCard'
import { FC } from 'react'
import { IPromotions } from 'src/types/promotions'

interface Props {
  item: IPromotions
}

const AdSlide: FC<Props> = ({ item }) => {
  const link = `/sales/${item?.id}`
  return (
    <Link href={link}>
      <AdCard item={item} shareLink={link} />
    </Link>
  )
}

export default AdSlide

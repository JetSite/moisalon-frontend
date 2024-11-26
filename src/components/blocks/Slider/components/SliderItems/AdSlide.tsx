import Link from 'next/link'
import AdCard from '../../../AdCard'
import styled from 'styled-components'
import { FC } from 'react'
import { IPromotions } from 'src/types/promotions'

const LinkStyled = styled.a`
  color: #000;
  cursor: pointer;
`

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

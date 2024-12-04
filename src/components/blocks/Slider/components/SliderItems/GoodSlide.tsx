import { FC } from 'react'
import Link from 'next/link'
import ProductCard from '../../../ProductCard'
import { IProduct } from 'src/types/product'
import { UrlObject } from 'url'

interface Props {
  item: IProduct
  href: UrlObject | string
}

const GoodSlide: FC<Props> = ({ item, href }) => {
  return (
    <Link href={href}>
      <ProductCard item={item} />
    </Link>
  )
}

export default GoodSlide

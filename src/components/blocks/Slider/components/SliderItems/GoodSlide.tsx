import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/react-hooks'
import { cyrToTranslit } from '../../../../../utils/translit'
import ProductCard from '../../../ProductCard'
import { getCart } from '../../../../../_graphql-legacy/cart/getCart'
import { addToCartB2cMutation } from '../../../../../_graphql-legacy/cart/addToB2cCart'
import { removeItemB2cMutation } from '../../../../../_graphql-legacy/cart/removeItemB2c'
import { LazyType } from 'src/types/common'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useBaseStore from 'src/store/baseStore'
import { IBrand } from 'src/types/brands'
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

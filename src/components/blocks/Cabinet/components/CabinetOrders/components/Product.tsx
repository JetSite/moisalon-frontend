import { useQuery } from '@apollo/client'
import { ProductWrapper } from '../styles'
import { productSearch } from '../../../../../../_graphql-legacy/product'
import { PHOTO_URL } from '../../../../../../api/variables'
import { IProductCart } from 'src/types/product'
import { FC } from 'react'

interface IProps {
  item: IProductCart
}

const Product: FC<IProps> = ({ item }) => {
  const link = `${PHOTO_URL}${item.product.cover?.url}`
  return <ProductWrapper link={link} />
}

export default Product

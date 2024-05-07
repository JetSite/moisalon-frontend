import { useQuery } from '@apollo/client'
import { ProductWrapper } from '../styles'
import { productSearch } from '../../../../../../_graphql-legacy/product'
import { PHOTO_URL } from '../../../../../../api/variables'

const Product = ({ item }) => {
  const { data } = useQuery(productSearch, {
    variables: { id: item.id },
  })

  const link = `${PHOTO_URL}${data?.product?.photoIds[0]}/original`
  return <ProductWrapper link={link} />
}

export default Product

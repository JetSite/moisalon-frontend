import SearchBlock from '../../../../components/blocks/SearchBlock'
import MainLayout from '../../../../layouts/MainLayout'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import { GET_PRODUCT_REVIEWS } from 'src/api/graphql/product/queries/getProductReviews'
import { PRODUCT_BY_ID } from 'src/api/graphql/product/queries/getProduct'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import ProductPage from 'src/components/pages/ProductPage'

const Product = ({ product, reviews }) => {
  return (
    <MainLayout>
      <>
        <SearchBlock />
        <ProductPage product={product} reviews={reviews} />
      </>
    </MainLayout>
  )
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo()

  const product = await apolloClient.query({
    query: PRODUCT_BY_ID,
    variables: {
      id: params.id,
    },
  })

  const reviews = await apolloClient.query({
    query: GET_PRODUCT_REVIEWS,
    variables: {
      filters: {
        product: {
          id: {
            eq: params.id,
          },
        },
      },
    },
  })

  const normalisedProduct = flattenStrapiResponse(product?.data?.product)
  const normalisedReviews = flattenStrapiResponse(reviews?.data?.reviews)

  return addApolloState(apolloClient, {
    props: {
      product: normalisedProduct,
      reviews: normalisedReviews,
    },
  })
}

export default Product

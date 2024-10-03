import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { PRODUCT_CATEGORIES } from 'src/api/graphql/product/queries/getProductCategories'
import BeautyFreeShopPage, {
  IBeautyFreeShopPageProps,
} from 'src/components/pages/BeautyFreeShop'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { BRANDS_TO_SHOP } from 'src/api/graphql/brand/queries/getBrandToShop'

interface Props extends IBeautyFreeShopPageProps {}

const BeautyFreeShop: NextPage<Props> = props => {
  return (
    <MainLayout>
      <MainContainer>
        <BeautyFreeShopPage {...props} />
      </MainContainer>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const pageSize = 2

  const data = await Promise.all([
    apolloClient.query({
      query: PRODUCTS,
      variables: { pageSize },
    }),
    apolloClient.query({
      query: PRODUCT_CATEGORIES,
      variables: { itemsCount: 10, isAvailableInStock: 0 },
    }),
    apolloClient.query({
      query: BRANDS_TO_SHOP,
      variables: { itemsCount: 10 },
    }),
  ])

  const products = flattenStrapiResponse(data[0].data.products?.data)
  const productCategories = flattenStrapiResponse(
    data[1]?.data?.productCategories?.data,
  )
  const brands = flattenStrapiResponse(data[2].data.brands.data)

  return addApolloState(apolloClient, {
    props: {
      brands,
      dataProducts: products,
      dataProductCategories: productCategories,
      cityData: 'Москва',
      pageSize,
      pagination: data[0].data.products?.meta.pagination,
    },
  })
}

export default BeautyFreeShop

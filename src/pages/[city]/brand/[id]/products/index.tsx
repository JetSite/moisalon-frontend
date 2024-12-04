import {
  addApolloState,
  initializeApollo,
} from '../../../../../api/apollo-client'
import MainLayout from '../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../styles/common'
import BrandProductsPage, {
  IBrandProductsPageProps,
} from '../../../../../components/pages/Brand/BrandProducts'
import { BRAND } from 'src/api/graphql/brand/queries/getBrand'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { IProduct, IProductCategories } from 'src/types/product'
import { PRODUCT_CATEGORIES } from 'src/api/graphql/product/queries/getProductCategories'

interface Props extends IBrandProductsPageProps {}

const BrandProducts: NextPage<Props> = props => {
  return (
    <MainLayout>
      <MainContainer>
        <BrandProductsPage {...props} />
      </MainContainer>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  const pageSize = 2

  const brandID = ctx.query.id
  if (!brandID) {
    return {
      notFound: true,
    }
  }

  const data = await Promise.allSettled([
    apolloClient.query({
      query: PRODUCTS,
      variables: {
        filtersInput: { brand: { id: { eq: brandID } } },
        pageSize,
      },
    }),
    apolloClient.query({
      query: PRODUCT_CATEGORIES,
      variables: { itemsCount: 10, isAvailableInStock: 0 },
    }),
  ])

  const products = getPrepareData<IProduct[]>(data[0], 'products')
  const productCategories = getPrepareData<IProductCategories[]>(
    data[1],
    'productCategories',
  )

  const brand: IBrand | null =
    products?.find(product => product.brand.id === brandID)?.brand ?? null

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      products,
      brand,
      pageSize,
      productCategories,
      pagination:
        data[0].status === 'fulfilled'
          ? data[0].value.data.products?.meta.pagination
          : null,
    },
  })
}

export default BrandProducts

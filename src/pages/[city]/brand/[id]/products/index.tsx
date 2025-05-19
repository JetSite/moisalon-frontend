import {
  addApolloState,
  initializeApollo,
} from '../../../../../api/apollo-client'
import MainLayout from '../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../styles/common'
import BrandProductsPage, {
  IBrandProductsPageProps,
} from '../../../../../components/pages/Brand/BrandProducts'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import { IProduct } from 'src/types/product'
import { useFetchCartByUser } from 'src/hooks/useFetchCartByUser'
import { Fragment } from 'react'
import MainHead from '../../../../MainHead'

type Props = Omit<IBrandProductsPageProps, 'cart'>

const BrandProducts: NextPage<Props> = props => {
  const { storeCart } = useFetchCartByUser()

  return (
    <MainLayout>
      <Fragment>
        <MainHead
          title={`${props.brand.name} - Продукция | MOI salon`}
          description={`Каталог продукции бренда ${props.brand.name} на платформе MOI salon. Широкий выбор товаров для салонов красоты`}
          image={props.brand.logo?.url || '/mobile-main-bg.jpg'}
        />
        <MainContainer>
          <BrandProductsPage cart={storeCart} {...props} />
        </MainContainer>
      </Fragment>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  const pageSize = 12

  const brandID = ctx.query.id
  if (!brandID) {
    return {
      notFound: true,
    }
  }

  const queries = [
    apolloClient.query({
      query: PRODUCTS,
      variables: {
        filtersInput: { brand: { id: { eq: brandID } } },
        pageSize,
      },
    }),
  ]

  const data = await Promise.allSettled(queries)

  const products = getPrepareData<IProduct[]>(data[0], 'products')

  const brand: IBrand | null = products
    ? products.find(product => product.brand.id === brandID)?.brand ?? null
    : null

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      products,
      brand,
      pageSize,
      pagination:
        data[0].status === 'fulfilled'
          ? data[0].value.data.products?.meta.pagination
          : null,
    },
  })
}

export default BrandProducts

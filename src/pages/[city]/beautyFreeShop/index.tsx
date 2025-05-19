import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { PRODUCTS } from 'src/api/graphql/product/queries/getProducts'
import BeautyFreeShopPage, {
  IBeautyFreeShopPageProps,
} from 'src/components/pages/BeautyFreeShop'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { IProduct } from 'src/types/product'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { useFetchCartByUser } from 'src/hooks/useFetchCartByUser'

type Props = Omit<IBeautyFreeShopPageProps, 'cart'>

const BeautyFreeShop: NextPage<Props> = props => {
  const { storeCart } = useFetchCartByUser()
  return (
    <MainLayout>
      <MainContainer>
        <BeautyFreeShopPage cart={storeCart} {...props} />
      </MainContainer>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const pageSize = 12

  const resArr = [
    apolloClient.query({
      query: PRODUCTS,
      variables: { pageSize },
    }),
  ]

  const data = await Promise.allSettled(resArr)

  const products = getPrepareData<IProduct[]>(data[0], 'products')

  return addApolloState(apolloClient, {
    props: {
      dataProducts: products,
      pageSize,
      pagination:
        data[0].status === 'fulfilled'
          ? data[0].value.data.products?.meta.pagination
          : null,
      meta: {
        title: 'Интернет-магазин BeautyFreeShop | MOI salon',
        description:
          'Профессиональная косметика и товары для индустрии красоты. Широкий ассортимент продукции для салонов и мастеров.',
        image: '/stock3.png',
        url: `https://moi.salon/${ctx.query['city']}/beautyFreeShop`,
      },
    },
  })
}

export default BeautyFreeShop

import { useState } from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { brandQuery } from '../../../_graphql-legacy/brand/brandQuery'
import { useQuery } from '@apollo/client'
import { goodSearch } from '../../../_graphql-legacy/goodSearch'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { brandSlugQuery } from '../../../_graphql-legacy/brand/brandSlugQuery'
import { scoreBrand } from '../../../_graphql-legacy/brand/scoreBrand'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { getProducts } from 'src/api/graphql/product/queries/getProducts'
import { getProductCategories } from 'src/api/graphql/product/queries/getProductCategories'
import BeautyFreeShopPage, {
  IBeautyFreeShopPageProps,
} from 'src/components/pages/BeautyFreeShop'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { IBrand } from 'src/types/brands'
import { IProduct, IProductCategories } from 'src/types/product'
import { BRANDS } from 'src/api/graphql/brand/queries/BRANDS'

interface Props extends IBeautyFreeShopPageProps {}

const BeautyFreeShop: NextPage<Props> = ({
  brands,
  dataProducts,
  dataProductCategories,
}) => {
  return (
    <MainLayout>
      <MainContainer>
        <BeautyFreeShopPage
          dataProducts={dataProducts}
          dataProductCategories={dataProductCategories}
          brands={brands}
        />
      </MainContainer>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  const brandsRes = await apolloClient.query({
    query: BRANDS,
    variables: { itemsCount: 100 },
  })

  const data = await Promise.all([
    apolloClient.query({
      query: getProducts,
    }),
    apolloClient.query({
      query: getProductCategories,
    }),
  ])

  const brands = flattenStrapiResponse(brandsRes?.data?.brands)
  const products = flattenStrapiResponse(data[0]?.data?.products?.data)
  const productCategories = flattenStrapiResponse(
    data[1]?.data?.productCategories?.data,
  )

  return addApolloState(apolloClient, {
    props: {
      brands,
      dataProducts: products,
      dataProductCategories: productCategories,
      cityData: 'Москва',
    },
  })
}

export default BeautyFreeShop

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
import useCheckCity from '../../../hooks/checkCity'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { getProducts } from 'src/api/graphql/product/queries/getProducts'
import { getProductCategories } from 'src/api/graphql/product/queries/getProductCategories'
import BeautyFreeShopPage from 'src/components/pages/BeautyFreeShop'

const BeautyFreeShop = ({
  brandData,
  dataProducts,
  dataProductCategories,
  cityData,
}) => {
  const [brand, setBrand] = useState(brandData)
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  useCheckCity(cityData)

  return (
    <MainLayout>
      <MainContainer>
        <BeautyFreeShopPage
          dataProducts={dataProducts}
          dataProductCategories={dataProductCategories}
          me={me}
          brand={brand}
        />
      </MainContainer>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo()

  const brandQueryRes = await apolloClient.query({
    query: getBrand,
    variables: { id: 4 },
  })

  const data = await Promise.all([
    apolloClient.query({
      query: getProducts,
    }),
    apolloClient.query({
      query: getProductCategories,
    }),
  ])

  const brand = flattenStrapiResponse(brandQueryRes?.data?.brand?.data)
  const products = flattenStrapiResponse(data[0]?.data?.products?.data)
  const productCategories = flattenStrapiResponse(
    data[1]?.data?.productCategories?.data,
  )

  return addApolloState(apolloClient, {
    props: {
      brandData: brand,
      dataProducts: products,
      dataProductCategories: productCategories,
      cityData: 'Москва',
    },
  })
}

export default BeautyFreeShop

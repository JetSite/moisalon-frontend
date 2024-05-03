import { useState } from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { brandQuery } from '../../../_graphql-legacy/brand/brandQuery'
import { useQuery } from '@apollo/client'
import { goodSearch } from '../../../_graphql-legacy/goodSearch'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { brandSlugQuery } from '../../../_graphql-legacy/brand/brandSlugQuery'
import { scoreBrand } from '../../../_graphql-legacy/brand/scoreBrand'
import BeautyFreeShopPage from '../../../components/pages/BeautyFreeShop'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import useCheckCity from '../../../hooks/checkCity'
import { getBrand } from 'src/graphql/brand/queries/getBrand'
import { getProductCategories } from 'src/graphql/product/queries/getProductCategories'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const BeautyFreeShop = ({
  brandData,
  dataProductCategories,
  // dataScoreRes,
  // goods,
  cityData,
}) => {
  const [brand, setBrand] = useState(brandData)
  // const [dataScore, setDataScore] = useState(dataScoreRes)
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  useCheckCity(cityData)
  // const { refetch: refetchBrand } = useQuery(brandQuery, {
  //   variables: { id: brand.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setBrand(res.brand)
  //   },
  // })

  // const { refetch: refetchScore } = useQuery(scoreBrand, {
  //   variables: { id: brand.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setDataScore(res.scoreBrand)
  //   },
  // })

  return (
    <MainLayout MainLayout me={me}>
      <MainContainer>
        <BeautyFreeShopPage
          dataProductCategories={dataProductCategories}
          me={me}
          brand={brand}
          // goods={goods}
          // dataScore={dataScore}
          // refetchBrand={refetchBrand}
          // refetchScore={refetchScore}
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

  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || '',
  //     count: 1,
  //   },
  // })

  const data = await Promise.all([
    apolloClient.query({
      query: getProductCategories,
    }),
    // apolloClient.query({
    //   query: goodSearch,
    //   variables: {
    //     input: {
    //       brandId: [brand.id],
    //       query: '',
    //       isB2b: true,
    //     },
    //   },
    // }),
    // apolloClient.query({
    //   query: scoreBrand,
    //   variables: {
    //     id: brand.id,
    //   },
    // }),
  ])

  const brand = flattenStrapiResponse(brandQueryRes?.data?.brand?.data)
  const productCategories = flattenStrapiResponse(
    data[0]?.data?.productCategories?.data,
  )

  return addApolloState(apolloClient, {
    props: {
      brandData: brand,
      dataProductCategories: productCategories,
      // goods: data[1]?.data,
      // dataScoreRes: data[2].data,
      cityData: 'Москва',
    },
  })
}

export default BeautyFreeShop

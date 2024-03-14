import { useContext, useState } from 'react'
import { addApolloState, initializeApollo } from '../../../apollo-client'
import { brandQuery } from '../../../_graphql-legacy/brand/brandQuery'
import { useQuery } from '@apollo/client'
import { goodSearch } from '../../../_graphql-legacy/goodSearch'
import MainLayout from '../../../layouts/MainLayout'
import { MainContainer } from '../../../styles/common'
import { brandSlugQuery } from '../../../_graphql-legacy/brand/brandSlugQuery'
import { getProductCategories } from '../../../_graphql-legacy/getProductCategories'
import { scoreBrand } from '../../../_graphql-legacy/brand/scoreBrand'
import { MeContext } from '../../../searchContext'
import BeautyFreeShopPage from '../../../components/pages/BeautyFreeShop'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import useCheckCity from '../../../hooks/checkCity'

const BeautyFreeShop = ({
  brandData,
  dataProductCategories,
  dataScoreRes,
  goods,
  cityData,
}) => {
  const [brand, setBrand] = useState(brandData)
  const [dataScore, setDataScore] = useState(dataScoreRes)
  const [me, setMe] = useContext(MeContext)
  useCheckCity(cityData)
  const { refetch: refetchBrand } = useQuery(brandQuery, {
    variables: { id: brand.id },
    skip: true,
    onCompleted: res => {
      setBrand(res.brand)
    },
  })

  const { refetch: refetchScore } = useQuery(scoreBrand, {
    variables: { id: brand.id },
    skip: true,
    onCompleted: res => {
      setDataScore(res.scoreBrand)
    },
  })

  return (
    <MainLayout MainLayout me={me}>
      <MainContainer>
        <BeautyFreeShopPage
          dataProductCategories={dataProductCategories}
          me={me}
          brand={brand}
          goods={goods}
          dataScore={dataScore}
          refetchBrand={refetchBrand}
          refetchScore={refetchScore}
        />
      </MainContainer>
    </MainLayout>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo()

  const brandQueryRes = await apolloClient.query({
    query: brandSlugQuery,
    variables: { slug: '62fb9f7884fe720001f6771c' },
  })

  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: ctx?.query?.city || '',
      count: 1,
    },
  })

  const brand = brandQueryRes.data.brandSlug

  const data = await Promise.all([
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          brandId: [brand.id],
          query: '',
          isB2b: true,
        },
      },
    }),
    apolloClient.query({
      query: getProductCategories,
    }),
    apolloClient.query({
      query: scoreBrand,
      variables: {
        id: brand.id,
      },
    }),
  ])
  return addApolloState(apolloClient, {
    props: {
      brandData: brand,
      goods: data[0]?.data,
      dataProductCategories: data[1]?.data?.productsCatagoriesB2b,
      dataScoreRes: data[2].data,
      cityData: city?.data?.citySuggestions[0]?.data?.city || 'Москва',
    },
  })
}

export default BeautyFreeShop

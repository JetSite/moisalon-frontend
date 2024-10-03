import { useState } from 'react'
import {
  addApolloState,
  initializeApollo,
} from '../../../../../api/apollo-client'
import { useQuery } from '@apollo/client'
import MainLayout from '../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../styles/common'
import BrandProductsPage from '../../../../../components/pages/Brand/BrandProducts'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { getProductCategories } from 'src/_graphql-legacy/getProductCategories'
import { scoreBrand } from 'src/_graphql-legacy/brand/scoreBrand'
import { fetchCity } from 'src/api/utils/fetchCity'
import { defaultValues } from 'src/api/authConfig'

const BrandProducts = ({
  brandData,
  dataProductCategories,
  dataScoreRes,
  goods,
}) => {
  const [brand, setBrand] = useState(brandData)
  const [dataScore, setDataScore] = useState(dataScoreRes)

  const { refetch: refetchBrand } = useQuery(getBrand, {
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
    <MainLayout>
      <MainContainer>
        <BrandProductsPage
          dataProductCategories={dataProductCategories}
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
    query: getBrand,
    variables: { slug: ctx.params.id },
  })

  const cityData = (await fetchCity(ctx.query.city as string)) || {
    slug: defaultValues.citySlug,
  }

  const brand = brandQueryRes.data.brandSlug

  if (!cityData.slug) {
    return {
      notFound: true,
    }
  }

  const data = await Promise.all([
    // apolloClient.query({
    //   query: goodsCatalogQuery,
    //   context: { clientName: "goods" },
    //   variables: {
    //     category: brand.name,
    //     categoryId: null,
    //     first: 12,
    //   },
    // }),
    // apolloClient.query({
    //   query: getBrand,
    //   variables: {
    //     input: {
    //       brandId: [brand.id],
    //       query: '',
    //       isB2b: true,
    //     },
    //   },
    // }),
    apolloClient.query({
      query: getProductCategories,
    }),
    // apolloClient.query({
    //   query: scoreBrand,
    //   variables: {
    //     id: brand.id,
    //   },
    // }),
  ])
  return addApolloState(apolloClient, {
    props: {
      brandData: brand,
      // goods: data[0]?.data,
      dataProductCategories: data[0]?.data?.productsCatagoriesB2b,
      // dataScoreRes: data[2].data,
    },
  })
}

export default BrandProducts

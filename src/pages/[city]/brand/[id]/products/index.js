import { useContext, useState } from 'react'
import { addApolloState, initializeApollo } from '../../../../../apollo-client'
import { brandQuery } from '../../../../../_graphql-legacy/brand/brandQuery'
import { useQuery } from '@apollo/client'
import { goodsCatalogQuery } from '../../../../../_graphql-legacy/goodsCatalog'
import { goodSearch } from '../../../../../_graphql-legacy/goodSearch'
import MainLayout from '../../../../../layouts/MainLayout'
import { MainContainer } from '../../../../../styles/common'
import BrandProductsPage from '../../../../../components/pages/Brand/BrandProducts'
import { brandSlugQuery } from '../../../../../_graphql-legacy/brand/brandSlugQuery'
import { getProductCategories } from '../../../../../_graphql-legacy/getProductCategories'
import { scoreBrand } from '../../../../../_graphql-legacy/brand/scoreBrand'
import { MeContext } from '../../../../../searchContext'
import { citySuggestionsQuery } from '../../../../../_graphql-legacy/city/citySuggestionsQuery'

const BrandProducts = ({
  brandData,
  dataProductCategories,
  dataScoreRes,
  goods,
}) => {
  const [brand, setBrand] = useState(brandData)
  const [dataScore, setDataScore] = useState(dataScoreRes)
  const [me, setMe] = useContext(MeContext)

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
        <BrandProductsPage
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

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo()

  const brandQueryRes = await apolloClient.query({
    query: brandSlugQuery,
    variables: { slug: params.id },
  })

  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: query?.city || '',
      count: 1,
    },
  })

  const brand = brandQueryRes.data.brandSlug

  if (!city?.data?.citySuggestions[0]?.data?.city) {
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
    },
  })
}

export default BrandProducts

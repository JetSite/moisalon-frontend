import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { brandSearchQuery } from '../../_graphql-legacy/search/brandSearch'
import CatalogB2cPage from '../../components/pages/CatalogB2cPage'
import { bannersByHookCodeQuery } from '../../_graphql-legacy/baners/bannersHooks'
import { productsCatagories } from '../../_graphql-legacy/productCatagories'
import { goodSearch } from '../../_graphql-legacy/goodSearch'
import { totalSalons } from '../../_graphql-legacy/salon/totalSalons'
import { totalBrands } from '../../_graphql-legacy/brand/totalBrands'
import { totalMasters } from '../../_graphql-legacy/master/totalMasters'

const CatalogB2c = ({
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
  productCategories,
  brandSearchData,
  goods,
  goodsSales,
  totalSalons,
  totalBrands,
  totalMasters,
}) => {
  return (
    <CatalogB2cPage
      noFilters
      productCategories={productCategories}
      brandSearchData={brandSearchData}
      bannersByHookWide={bannersByHookWide}
      bannersByHookSmall1={bannersByHookSmall1}
      bannersByHookSmall2={bannersByHookSmall2}
      goods={goods}
      goodsSales={goodsSales}
      totalSalons={totalSalons}
      totalBrands={totalBrands}
      totalMasters={totalMasters}
    />
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const data = await Promise.all([
    apolloClient.query({
      query: brandSearchQuery,
      variables: {
        query: '',
      },
    }),
    apolloClient.query({
      query: bannersByHookCodeQuery,
      variables: {
        hookCode: 'shop-slider-wide',
      },
    }),
    apolloClient.query({
      query: bannersByHookCodeQuery,
      variables: {
        hookCode: 'shop-slider-small1',
      },
    }),
    apolloClient.query({
      query: bannersByHookCodeQuery,
      variables: {
        hookCode: 'shop-slider-small2',
      },
    }),
    apolloClient.query({
      query: productsCatagories,
    }),
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          query: '',
        },
      },
    }),
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          query: '',
          sales: true,
        },
      },
    }),
    apolloClient.query({
      query: totalSalons,
      variables: {
        catId: '',
      },
    }),
    apolloClient.query({
      query: totalBrands,
      variables: {
        catId: '',
      },
    }),
    apolloClient.query({
      query: totalMasters,
      variables: {
        catId: '',
      },
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      brandSearchData: data[0]?.data,
      bannersByHookWide: data[1]?.data,
      bannersByHookSmall1: data[2]?.data,
      bannersByHookSmall2: data[3]?.data,
      productCategories: data[4]?.data?.productsCatagories,
      goods: data[5]?.data?.goodsSearch,
      goodsSales: data[6]?.data?.goodsSearch,
      totalSalons: data[7].data.totalSalons,
      totalBrands: data[8].data.totalBrands,
      totalMasters: data[9].data.totalMasters,
    },
  })
}

export default CatalogB2c

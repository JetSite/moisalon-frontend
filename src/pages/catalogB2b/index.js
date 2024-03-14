import { addApolloState, initializeApollo } from '../../apollo-client'
import { brandSearchQuery } from '../../_graphql-legacy/search/brandSearch'
import CatalogPage from '../../components/pages/CatalogPage'
import { getBrandCategories } from '../../_graphql-legacy/getBrandCategories'
import { bannersByHookCodeQuery } from '../../_graphql-legacy/baners/bannersHooks'
import { brandSearchAllName } from '../../_graphql-legacy/search/brandSearchAllName'
import { getCategories } from '../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../_graphql-legacy/advices/getAll'

const Catalog = ({
  bannersByHookWide,
  bannersByHookSmall1,
  bannersByHookSmall2,
  dataBrandCategories,
  brandsData,
  brandSearchData,
  beautyCategories,
  beautyAllContent,
}) => {
  const brandCategories = dataBrandCategories?.productsCatagoriesB2b || []

  return (
    <CatalogPage
      noFilters
      brandsData={brandsData}
      brandSearchData={brandSearchData?.brandsSearch}
      bannersByHookWide={bannersByHookWide}
      bannersByHookSmall1={bannersByHookSmall1}
      bannersByHookSmall2={bannersByHookSmall2}
      productCategories={brandCategories}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
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
      query: getBrandCategories,
    }),
    apolloClient.query({
      query: brandSearchAllName,
      variables: {
        query: '',
      },
    }),
    apolloClient.query({
      query: getCategories,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: getAll,
      context: { uri: 'https://moi.salon/graphql' },
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      brandSearchData: data[0]?.data,
      bannersByHookWide: data[1]?.data,
      bannersByHookSmall1: data[2]?.data,
      bannersByHookSmall2: data[3]?.data,
      dataBrandCategories: data[4]?.data,
      brandsData: data[5]?.data,
      beautyCategories: data[6]?.data?.catagories,
      beautyAllContent: data[7]?.data?.pages,
    },
  })
}

export default Catalog

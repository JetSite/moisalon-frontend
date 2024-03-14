import { useEffect, useState } from 'react'
import { addApolloState, initializeApollo } from '../../apollo-client'
import { brandSearchAllName } from '../../_graphql-legacy/search/brandSearchAllName'
import { productsCatagories } from '../../_graphql-legacy/productCatagories'
import { goodSearch } from '../../_graphql-legacy/goodSearch'
import CatalogB2cPageAll from '../../components/pages/CatalogB2cPageAll'
import { totalSalons } from '../../_graphql-legacy/salon/totalSalons'
import { totalBrands } from '../../_graphql-legacy/brand/totalBrands'
import { totalMasters } from '../../_graphql-legacy/master/totalMasters'

const CatalogB2cAll = ({
  productCategories,
  brandSearchData,
  goods,
  totalSalons,
  totalBrands,
  totalMasters,
}) => {
  const [goodsData, setGoodsData] = useState(goods)

  useEffect(() => {
    setGoodsData(goods)
  }, [goods])

  return (
    <CatalogB2cPageAll
      noFilters
      productCategories={productCategories}
      brandSearchData={brandSearchData}
      goods={goodsData}
      totalSalons={totalSalons}
      totalBrands={totalBrands}
      totalMasters={totalMasters}
    />
  )
}

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo()
  const data = await Promise.all([
    apolloClient.query({
      query: brandSearchAllName,
      variables: {
        query: '',
      },
    }),
    apolloClient.query({
      query: productsCatagories,
    }),
    apolloClient.query({
      query: goodSearch,
      variables: {
        input: {
          query: query.type === 'query' ? query.query : '',
          brandId: query.type === 'brand' ? [query.id] : [],
          categoryId: query.type === 'product' ? [query.id] : [],
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
      productCategories: data[1]?.data?.productsCatagories,
      goods: data[2]?.data?.goodsSearch,
      totalSalons: data[3].data.totalSalons,
      totalBrands: data[4].data.totalBrands,
      totalMasters: data[5].data.totalMasters,
    },
  })
}

export default CatalogB2cAll

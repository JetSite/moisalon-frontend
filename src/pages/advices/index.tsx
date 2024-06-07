import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { getCategories } from '../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../_graphql-legacy/advices/getAll'
import { getAdvices } from '../../_graphql-legacy/advices/getAdvices'
import { ITotalCount } from '../[city]/salon'
import { getTotalCount } from 'src/utils/getTotalCount'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import AdvicesPage from 'src/components/pages/AdvicesPage'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'

interface Props {
  categories: any
  allAdvices: any
  categoryAdvicesEmpty: any
  totalCount: ITotalCount
}

const Advices = ({ categories, allAdvices, totalCount }: Props) => {
  return (
    <AdvicesPage
      categories={categories}
      allAdvices={allAdvices}
      totalCount={totalCount}
    />
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const data = await Promise.all([
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
    apolloClient.query({
      query: totalSalons,
    }),
    apolloClient.query({
      query: totalMasters,
    }),
    apolloClient.query({
      query: totalBrands,
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      categories: data[0]?.data?.feedCategories,
      allAdvices: data[1]?.data?.feeds,
      totalCount: {
        brands: getTotalCount(data[2].data.brands),
        masters: getTotalCount(data[3].data.masters),
        salons: getTotalCount(data[4].data.salons),
      },
    },
  })
}

export default Advices

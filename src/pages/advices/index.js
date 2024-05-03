import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { getCategories } from '../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../_graphql-legacy/advices/getAll'
import { getAdvices } from '../../_graphql-legacy/advices/getAdvices'

import AdvicesPage from '../../components/pages/AdvicesPage'
import { totalSalons } from '../../_graphql-legacy/salon/totalSalons'
import { totalBrands } from '../../_graphql-legacy/brand/totalBrands'
import { totalMasters } from '../../_graphql-legacy/master/totalMasters'

const Advices = ({
  categories,
  allAdvices,
  categoryAdvicesEmpty,
  totalSalons,
  totalBrands,
  totalMasters,
}) => {
  return (
    <AdvicesPage
      categories={categories}
      allAdvices={allAdvices}
      categoryAdvicesEmpty={categoryAdvicesEmpty}
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
      query: getCategories,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: getAll,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: getAdvices,
      context: { uri: 'https://moi.salon/graphql' },
      variables: {
        catId: '',
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
      categories: data[0].data.catagories,
      allAdvices: data[1].data.pages,
      categoryAdvicesEmpty: data[2].data.pagesCategory,
      totalSalons: data[3].data.totalSalons,
      totalBrands: data[4].data.totalBrands,
      totalMasters: data[5].data.totalMasters,
    },
  })
}

export default Advices

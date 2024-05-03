import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { salesSearch } from '../../_graphql-legacy/sales/salesSearch'

const Sales = ({ sales }) => {
  return (
    <BusinessCategoryPageLayout loading={false}>
      <BusinessCategoryPage
        title="Акции"
        type="sales"
        data={sales}
        link={'/sales'}
      />
    </BusinessCategoryPageLayout>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const salesRes = await apolloClient.query({
    query: salesSearch,
    variables: { query: '' },
  })

  return addApolloState(apolloClient, {
    props: {
      sales: salesRes?.data?.salesSearch,
    },
  })
}

export default Sales

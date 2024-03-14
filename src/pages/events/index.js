import { addApolloState, initializeApollo } from '../../apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { eventsSearch } from '../../_graphql-legacy/events/eventsSearch'

const Events = ({ events }) => {
  return (
    <BusinessCategoryPageLayout loading={false}>
      <BusinessCategoryPage
        title="События"
        link={'/events'}
        type="events"
        data={events}
      />
    </BusinessCategoryPageLayout>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const eventsRes = await apolloClient.query({
    query: eventsSearch,
    variables: { query: '' },
  })

  return addApolloState(apolloClient, {
    props: {
      events: eventsRes?.data?.eventsSearch,
    },
  })
}

export default Events

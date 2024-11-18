import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EVENTS } from 'src/api/graphql/event/queries/getEvents'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEvent } from 'yandex-maps'
import { FC } from 'react'

interface EventsProps {
  events: IEvent[]
}

const Events: FC<EventsProps> = ({ events }) => {
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
    query: EVENTS,
  })

  const normalisedEvents = flattenStrapiResponse(eventsRes?.data?.events)

  return addApolloState(apolloClient, {
    props: {
      events: normalisedEvents,
    },
  })
}

export default Events

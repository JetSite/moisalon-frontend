import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EVENTS } from 'src/api/graphql/event/queries/getEvents'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEvent } from 'yandex-maps'
import { FC, Fragment } from 'react'

interface EventsProps {
  events: IEvent[]
}

const Events: FC<EventsProps> = ({ events }) => {
  return (
    <Fragment>
      <BusinessCategoryPageLayout loading={false}>
        <BusinessCategoryPage
          title="Мероприятия"
          type="events"
          data={events}
          link={'/events'}
        />
      </BusinessCategoryPageLayout>
    </Fragment>
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
      meta: {
        title: 'Мероприятия и события | MOI salon',
        description:
          'Актуальные мероприятия и события в индустрии красоты на платформе MOI salon',
        image: '/services-page-photo3.jpg',
        url: 'https://moi.salon/events',
      },
    },
  })
}

export default Events

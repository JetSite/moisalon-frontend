import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EVENTS } from 'src/api/graphql/event/queries/getEvents'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { FC, Fragment } from 'react'
import { IEvent } from '@/types/event'

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

  const normalisedEvents: IEvent[] = flattenStrapiResponse(
    eventsRes?.data?.events,
  )

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
      schema: {
        type: 'CollectionPage',
        data: {
          name: 'Мероприятия и события | MOI salon',
          description:
            'Актуальные мероприятия и события в индустрии красоты на платформе MOI salon',
          url: 'https://moi.salon/events',
          image: 'https://moi.salon/services-page-photo3.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement:
              normalisedEvents?.map((event, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Event',
                  name: event.title,
                  description: event.shortDescription,
                  startDate: event.dateStart,
                  endDate: event.dateEnd,
                  location: {
                    '@type': 'Place',
                    name: event.address,
                  },
                  image: event.cover?.url
                    ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${event.cover.url}`
                    : undefined,
                },
              })) || [],
          },
        },
      },
    },
  })
}

export default Events

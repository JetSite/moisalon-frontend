import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { getEventById } from 'src/api/graphql/event/queries/getEventById'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEvent } from 'src/types/event'
import { FC } from 'react'
import EventPage from 'src/components/pages/EventPage'

interface EventDetailedProps {
  event: IEvent
  beautyCategories: any
  beautyAllContent: any
}

const EventDetailed: FC<EventDetailedProps> = ({
  event,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <EventPage
      event={event}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  )
}

export async function getServerSideProps({ params }: any) {
  const apolloClient = initializeApollo()

  const eventRes = await apolloClient.query({
    query: getEventById,
    variables: { id: params.id },
  })
  const categories = await apolloClient.query({
    query: getFeedCategories,
  })
  const all = await apolloClient.query({
    query: getFeeds,
  })

  const normalisedEvent = flattenStrapiResponse(eventRes?.data?.event)

  return addApolloState(apolloClient, {
    props: {
      event: normalisedEvent,
      beautyCategories: categories?.data?.feedCategories,
      beautyAllContent: all?.data?.feeds,
    },
  })
}

export default EventDetailed

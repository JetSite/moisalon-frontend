import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { getEventById } from 'src/api/graphql/event/queries/getEventById'
import { IEvent } from 'src/types/event'
import { FC } from 'react'
import EventPage, { IEventPageProps } from 'src/components/pages/EventPage'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { GetServerSideProps } from 'next'
import { Nullable } from '@/types/common'
import { PHOTO_URL } from '../../../api/variables'

const EventDetailed: FC<IEventPageProps> = ({
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

export const getServerSideProps: GetServerSideProps<
  Nullable<IEventPageProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  const id = ctx.params?.['id']
  if (!id)
    return {
      notFound: true,
    }

  const data = await Promise.allSettled([
    apolloClient.query({
      query: getEventById,
      variables: { id },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const event = getPrepareData<IEvent>(data[0], 'event')
  if (!event) {
    return {
      notFound: true,
    }
  }
  const beautyCategories = getPrepareData<IBeautyCategories[]>(
    data[1],
    'feedCategories',
  )
  const beautyAllContent = getPrepareData<IFeed[]>(data[2], 'feeds')

  return addApolloState(apolloClient, {
    props: {
      event,
      beautyCategories,
      beautyAllContent,
      meta: {
        title: `${event.title} | MOI salon`,
        description:
          event.seoDescription || 'Мероприятие на платформе MOI salon',
        image: `${PHOTO_URL}${event?.cover?.url}` || '/mobile-main-bg.jpg',
        url: `https://moi.salon/events/${event.id}`,
      },
      schema: {
        type: 'Event',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          description:
            event.shortDescription ||
            event.seoDescription ||
            'Мероприятие на платформе MOI salon',
          startDate: event.dateStart,
          endDate: event.dateEnd,
          image: event?.cover?.url
            ? `${PHOTO_URL}${event.cover.url}`
            : 'https://moi.salon/mobile-main-bg.jpg',
          url: `https://moi.salon/events/${event.id}`,
          location: {
            '@type': 'Place',
            name: event.address,
          },
        },
      },
    },
  })
}

export default EventDetailed

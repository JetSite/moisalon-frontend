import { addApolloState, initializeApollo } from '../../../api/apollo-client';
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories';
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds';
import { getEventById } from 'src/api/graphql/event/queries/getEventById';
import { IEvent } from 'src/types/event';
import { FC } from 'react';
import EventPage, { IEventPageProps } from 'src/components/pages/EventPage';
import { getPrepareData } from '@/utils/newUtils/getPrepareData';
import { IBeautyCategories, IFeed } from '@/types/feed';
import { GetServerSideProps } from 'next';
import { Nullable } from '@/types/common';

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
  );
};

export const getServerSideProps: GetServerSideProps<
  Nullable<IEventPageProps>
> = async ctx => {
  const apolloClient = initializeApollo();

  const data = await Promise.allSettled([
    apolloClient.query({
      query: getEventById,
      variables: { id: ctx.params?.['id'] },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ]);

  const event = getPrepareData<IEvent>(data[0], 'event');
  const beautyCategories = getPrepareData<IBeautyCategories[]>(
    data[1],
    'feedCategories',
  );
  const beautyAllContent = getPrepareData<IFeed[]>(data[2], 'feeds');

  return addApolloState(apolloClient, {
    props: {
      event,
      beautyCategories,
      beautyAllContent,
    },
  });
};

export default EventDetailed;

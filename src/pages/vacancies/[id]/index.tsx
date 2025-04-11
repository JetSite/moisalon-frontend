import { addApolloState, initializeApollo } from '../../../api/apollo-client';
import VacancyPage from '../../../components/pages/VacancyPage';
import { getVacancyById } from 'src/api/graphql/vacancy/queries/getVacancyById';
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories';
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds';
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse';
import { FC } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { IVacancy } from 'src/types/vacancies';
import { Nullable } from 'src/types/common';
import { IBeautyCategories, IFeed } from '@/types/feed';
import { getPrepareData } from '@/utils/newUtils/getPrepareData';

interface Props {
  vacancy: IVacancy;
  beautyCategories: IBeautyCategories[];
  beautyAllContent: IFeed[];
}

const VacancyDetailed: NextPage<Props> = ({
  vacancy,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <VacancyPage
      vacancy={vacancy}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  );
};

export const getServerSideProps: GetServerSideProps<
  Partial<Nullable<Props>>
> = async ctx => {
  const apolloClient = initializeApollo();

  const id = ctx.params?.['id'];
  if (!id)
    return {
      notFound: true,
    };

  try {
    const data = await Promise.allSettled([
      apolloClient.query({
        query: getVacancyById,
        variables: { id },
      }),
      apolloClient.query({
        query: getFeedCategories,
      }),
      apolloClient.query({
        query: getFeeds,
      }),
    ]);

    const vacancy = getPrepareData<IVacancy>(data[0], 'vacancy');

    if (!vacancy) {
      return {
        notFound: true,
      };
    }
    const beautyCategories = getPrepareData<IBeautyCategories[]>(
      data[1],
      'feedCategories',
    );
    const beautyAllContent = getPrepareData<IFeed[]>(data[2], 'feeds');

    return addApolloState(apolloClient, {
      props: {
        vacancy,
        beautyCategories,
        beautyAllContent,
      },
    });
  } catch (error) {
    console.error('Failed to fetch vacancy data:', error);
    if (error instanceof Error && 'networkError' in error) {
      return {
        props: {},
      };
    }
    return {
      notFound: true,
    };
  }
};

export default VacancyDetailed;

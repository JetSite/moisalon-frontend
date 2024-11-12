import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import VacancyPage from '../../../components/pages/VacancyPage'
import { getVacancyById } from 'src/api/graphql/vacancy/queries/getVacancyById'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { IVacancy } from 'src/types/vacancies'
import { Nullable } from 'src/types/common'

interface Props {
  vacancy: IVacancy
  beautyCategories: any
  beautyAllContent: any
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
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  const data = await Promise.all([
    apolloClient.query({
      query: getVacancyById,
      variables: { id: ctx.params?.id },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const vacancy = flattenStrapiResponse(data[0]?.data?.vacancy) as IVacancy

  return addApolloState(apolloClient, {
    props: {
      vacancy,
      beautyCategories: data[1]?.data?.feedCategories,
      beautyAllContent: data[2]?.data?.feeds,
    },
  })
}

export default VacancyDetailed

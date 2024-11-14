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
  beautyCategories: any // TODO: add interface
  beautyAllContent: any // TODO: add interface
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
  Partial<Nullable<Props>>
> = async ctx => {
  const apolloClient = initializeApollo()

  try {
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

    const rawVacancy = data[0]?.data?.vacancy
    if (!rawVacancy) {
      return {
        notFound: true,
      }
    }

    const vacancy = flattenStrapiResponse(rawVacancy) as IVacancy

    return addApolloState(apolloClient, {
      props: {
        vacancy,
        beautyCategories: data[1]?.data?.feedCategories,
        beautyAllContent: data[2]?.data?.feeds,
      },
    })
  } catch (error) {
    console.error('Failed to fetch vacancy data:', error)
    if (error instanceof Error && 'networkError' in error) {
      return {
        props: {},
      }
    }
    return {
      notFound: true,
    }
  }
}

export default VacancyDetailed

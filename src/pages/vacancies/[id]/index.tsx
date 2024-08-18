import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import VacancyPage from '../../../components/pages/VacancyPage'
import { getVacancyById } from 'src/api/graphql/vacancy/queries/getVacancyById'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const VacancyDetailed = ({ vacancy, beautyCategories, beautyAllContent }) => {
  return (
    <VacancyPage
      vacancy={vacancy}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  )
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo()

  const data = await Promise.all([
    apolloClient.query({
      query: getVacancyById,
      variables: { id: params.id },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const vacancyNormalised = flattenStrapiResponse(data[0]?.data?.vacancy)

  return addApolloState(apolloClient, {
    props: {
      vacancy: vacancyNormalised,
      beautyCategories: data[1]?.data?.feedCategories,
      beautyAllContent: data[2]?.data?.feeds,
    },
  })
}

export default VacancyDetailed

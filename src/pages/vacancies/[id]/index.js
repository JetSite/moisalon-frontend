import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { vacancySearchById } from '../../../_graphql-legacy/vacancies/vacancySearchById'
import VacancyPage from '../../../components/pages/VacancyPage'
import { getCategories } from '../../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../../_graphql-legacy/advices/getAll'

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

  const vacRes = await apolloClient.query({
    query: vacancySearchById,
    variables: { id: params.id },
  })
  const categories = await apolloClient.query({
    query: getCategories,
    context: { uri: 'https://moi.salon/graphql' },
  })
  const all = await apolloClient.query({
    query: getAll,
    context: { uri: 'https://moi.salon/graphql' },
  })

  return addApolloState(apolloClient, {
    props: {
      vacancy: vacRes?.data?.vacancy,
      beautyCategories: categories?.data?.catagories,
      beautyAllContent: all.data?.pages,
    },
  })
}

export default VacancyDetailed

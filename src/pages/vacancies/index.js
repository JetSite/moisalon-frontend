import { addApolloState, initializeApollo } from '../../apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { vacanciesSearch } from '../../_graphql-legacy/vacancies/vacanciesSearch'

const Vacancies = ({ vacancies }) => {
  return (
    <BusinessCategoryPageLayout loading={false}>
      <BusinessCategoryPage
        title="Вакансии"
        type="vacancies"
        data={vacancies}
        link={'/vacancies'}
      />
    </BusinessCategoryPageLayout>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const vacRes = await apolloClient.query({
    query: vacanciesSearch,
    variables: { query: '' },
  })

  return addApolloState(apolloClient, {
    props: {
      vacancies: vacRes?.data?.vacanciesSearch,
    },
  })
}

export default Vacancies

import { addApolloState, initializeApollo } from '../../apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { educationSearch } from '../../_graphql-legacy/education/educationSearch'

const Educations = ({ educations }) => {
  return (
    <BusinessCategoryPageLayout loading={false}>
      <BusinessCategoryPage
        title="Обучение"
        type="educations"
        data={educations}
        link={'/educations'}
      />
    </BusinessCategoryPageLayout>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const eduRes = await apolloClient.query({
    query: educationSearch,
    variables: { query: '' },
  })

  return addApolloState(apolloClient, {
    props: {
      educations: eduRes?.data?.educationSearch,
    },
  })
}

export default Educations

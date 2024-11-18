import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EDUCATIONS } from 'src/api/graphql/education/queries/getEducations'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEducation } from 'src/types/education'
import { FC } from 'react'

interface EducationsProps {
  educations: IEducation[]
}

const Educations: FC<EducationsProps> = ({ educations }) => {
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
    query: EDUCATIONS,
    variables: { pageSize: 100 },
  })

  const educations = flattenStrapiResponse(eduRes?.data?.educations)

  return addApolloState(apolloClient, {
    props: {
      educations,
    },
  })
}

export default Educations

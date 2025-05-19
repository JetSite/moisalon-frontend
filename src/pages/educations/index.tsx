import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EDUCATIONS } from 'src/api/graphql/education/queries/getEducations'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEducation } from 'src/types/education'
import { FC, Fragment } from 'react'
import MainHead from '../MainHead'

interface EducationsProps {
  educations: IEducation[]
}

const Educations: FC<EducationsProps> = ({ educations }) => {
  return (
    <Fragment>
      <MainHead
        title="Обучение и курсы | MOI salon"
        description="Профессиональные курсы и программы обучения для мастеров индустрии красоты на платформе MOI salon"
        image="/services-page-photo6.jpg"
      />
      <BusinessCategoryPageLayout loading={false}>
        <BusinessCategoryPage
          title="Обучение"
          type="educations"
          data={educations}
          link={'/educations'}
        />
      </BusinessCategoryPageLayout>
    </Fragment>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const educationsRes = await apolloClient.query({
    query: EDUCATIONS,
  })

  const normalisedEducations = flattenStrapiResponse(
    educationsRes?.data?.educations,
  )

  return addApolloState(apolloClient, {
    props: {
      educations: normalisedEducations,
    },
  })
}

export default Educations

import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { EDUCATIONS } from 'src/api/graphql/education/queries/getEducations'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IEducation } from 'src/types/education'
import { FC, Fragment } from 'react'

interface EducationsProps {
  educations: IEducation[]
}

const Educations: FC<EducationsProps> = ({ educations }) => {
  return (
    <Fragment>
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

  const normalisedEducations: IEducation[] = flattenStrapiResponse(
    educationsRes?.data?.educations,
  )

  return addApolloState(apolloClient, {
    props: {
      educations: normalisedEducations,
      meta: {
        title: 'Обучение и курсы | MOI salon',
        description:
          'Профессиональные курсы и программы обучения для мастеров индустрии красоты на платформе MOI salon',
        image: '/services-page-photo6.jpg',
        url: 'https://moi.salon/educations',
      },
      schema: {
        type: 'CollectionPage',
        data: {
          name: 'Обучение и курсы | MOI salon',
          description:
            'Профессиональные курсы и программы обучения для мастеров индустрии красоты на платформе MOI salon',
          url: 'https://moi.salon/educations',
          image: 'https://moi.salon/services-page-photo6.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement:
              normalisedEducations?.map((education, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Course',
                  name: education.title,
                  description: education.shortDescription,
                  image: education.cover?.url
                    ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${education.cover.url}`
                    : undefined,
                },
              })) || [],
          },
        },
      },
    },
  })
}

export default Educations

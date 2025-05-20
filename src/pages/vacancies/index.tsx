import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import { VACANCIES } from 'src/api/graphql/vacancy/queries/getVacancies'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IVacancy } from 'src/types/vacancies'
import { FC } from 'react'
import BusinessCategoryPage from 'src/components/pages/BusinessCategoryPage'

interface VacanciesProps {
  vacancies: IVacancy[]
}

const Vacancies: FC<VacanciesProps> = ({ vacancies }) => {
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

  const vacanciesRes = await apolloClient.query({
    query: VACANCIES,
  })

  const normalisedVacancies: IVacancy[] = flattenStrapiResponse(
    vacanciesRes?.data?.vacancies,
  )

  return addApolloState(apolloClient, {
    props: {
      vacancies: normalisedVacancies,
      meta: {
        title: 'Вакансии в индустрии красоты | MOI salon',
        description:
          'Актуальные вакансии и предложения о работе в салонах красоты на платформе MOI salon',
        image: '/ribbon-3.jpg',
        url: 'https://moi.salon/vacancies',
      },
      schema: {
        type: 'CollectionPage',
        data: {
          name: 'Вакансии в индустрии красоты | MOI salon',
          description:
            'Актуальные вакансии и предложения о работе в салонах красоты на платформе MOI salon',
          url: 'https://moi.salon/vacancies',
          image: 'https://moi.salon/ribbon-3.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement:
              normalisedVacancies?.map((vacancy, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'JobPosting',
                  title: vacancy.title,
                  description: vacancy.shortDescription,
                  datePosted: vacancy.publishedAt,
                  hiringOrganization: {
                    '@type': 'Organization',
                    name: vacancy.salon?.name || 'MOI salon',
                    url: vacancy.salon
                      ? `https://moi.salon/salon/${vacancy.salon.id}`
                      : 'https://moi.salon',
                  },
                  baseSalary: vacancy.amountFrom
                    ? {
                        '@type': 'MonetaryAmount',
                        currency: 'RUB',
                        value: {
                          '@type': 'QuantitativeValue',
                          minValue: vacancy.amountFrom,
                          maxValue: vacancy.amountTo,
                          unitText: 'MONTH',
                        },
                      }
                    : undefined,
                },
              })) || [],
          },
        },
      },
    },
  })
}

export default Vacancies

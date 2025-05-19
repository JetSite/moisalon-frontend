import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import { VACANCIES } from 'src/api/graphql/vacancy/queries/getVacancies'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IVacancy } from 'src/types/vacancies'
import { FC, Fragment } from 'react'
import BusinessCategoryPage from 'src/components/pages/BusinessCategoryPage'
import MainHead from '../MainHead'

interface VacanciesProps {
  vacancies: IVacancy[]
}

const Vacancies: FC<VacanciesProps> = ({ vacancies }) => {
  return (
    <Fragment>
      <MainHead
        title="Вакансии в индустрии красоты | MOI salon"
        description="Актуальные вакансии и предложения о работе в салонах красоты на платформе MOI salon"
        image="/ribbon-3.jpg"
      />
      <BusinessCategoryPageLayout loading={false}>
        <BusinessCategoryPage
          title="Вакансии"
          type="vacancies"
          data={vacancies}
          link={'/vacancies'}
        />
      </BusinessCategoryPageLayout>
    </Fragment>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const vacanciesRes = await apolloClient.query({
    query: VACANCIES,
  })

  const normalisedVacancies = flattenStrapiResponse(
    vacanciesRes?.data?.vacancies,
  )

  return addApolloState(apolloClient, {
    props: {
      vacancies: normalisedVacancies,
    },
  })
}

export default Vacancies

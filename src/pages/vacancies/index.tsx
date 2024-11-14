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

  const vacRes = await apolloClient.query({
    query: VACANCIES,
  })

  const vacanciesNormalised = flattenStrapiResponse(vacRes.data.vacancies.data)

  return addApolloState(apolloClient, {
    props: {
      vacancies: vacanciesNormalised,
    },
  })
}

export default Vacancies

import { Subtitle, VacanciesWrapper, SkeletonWrap } from '../styles'

import Vacancy from '../../../../Vacancy'
import { FC } from 'react'
import { IApolloRefetch } from 'src/types/common'
import { IVacancy } from 'src/types/vacancies'

interface Props {
  loading: boolean
  removeVacancy: () => void
  vacancies: IVacancy[]
}

export const CabinetVacanciesList: FC<Props> = ({
  vacancies,
  loading,
  removeVacancy,
}) => {
  if (loading) {
    return <SkeletonWrap variant="rect" />
  }

  return (
    <VacanciesWrapper>
      {vacancies?.length > 0 ? (
        <>
          {vacancies?.map(item => (
            <Vacancy
              key={item.id}
              id={item.id}
              title={item.title}
              name={`${
                item.vacancy_type.title.toLowerCase() === 'master'
                  ? 'Мастер'
                  : item.vacancy_type.title.toLowerCase() === 'salon'
                  ? 'Салон'
                  : item.vacancy_type.title.toLowerCase() === 'brand'
                  ? 'Бренд'
                  : ''
              } ${item?.salon?.salonName || item?.brand?.brandName || ''}`}
              type={'master'}
              photo={item.cover[0].url}
              // amountFrom={item.amountFrom}
              // amountTo={item.amountTo}
              removeVacancy={removeVacancy}
            />
          ))}
        </>
      ) : (
        <Subtitle>У профиля нет вакансий</Subtitle>
      )}
    </VacanciesWrapper>
  )
}

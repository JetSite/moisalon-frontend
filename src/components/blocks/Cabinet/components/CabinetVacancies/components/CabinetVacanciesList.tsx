import { Subtitle, VacanciesWrapper, SkeletonWrap } from '../styles'

import Vacancy from '../../../../Vacancy'
import { FC } from 'react'
import { IApolloRefetch, IID } from 'src/types/common'
import { IVacancy } from 'src/types/vacancies'

interface Props {
  loading: boolean
  removeVacancy: (id: IID) => void
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
              name={`${item.salon
                ? 'Салон'
                : item.brand
                  ? 'Бренд'
                  : ''
                } ${item?.salon?.name || item?.brand?.name || ''}`}
              type={'master'}
              photos={item.cover}
              amountFrom={item.amountFrom}
              amountTo={item.amountTo}
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

import Link from 'next/link'
import Vacancy from '../../../Vacancy'
import { FC } from 'react'
import { IVacancy } from 'src/types/vacancies'

const VacancySlide: FC<{ item: IVacancy }> = ({ item }) => {
  return (
    <Link href={`/vacancies/${item.id}`}>
      <Vacancy
        title={item.title}
        id={item.cover[0].id}
        photos={item.cover}
        type="master"

        // amountFrom={item.amountFrom}
        // amountTo={item.amountTo}
      />
    </Link>
  )
}

export default VacancySlide

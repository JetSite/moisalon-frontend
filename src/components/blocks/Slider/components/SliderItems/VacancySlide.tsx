import Link from 'next/link'
import Vacancy from '../../../Vacancy'
import { FC } from 'react'
import { IVacancy } from 'src/types/vacancies'

const VacancySlide: FC<{ item: IVacancy }> = ({ item }) => {
  return (
    <Link href={`/vacancies/${item.id}`}>
      <Vacancy item={item} type="master" />
    </Link>
  )
}

export default VacancySlide

import Link from 'next/link'
import Vacancy from '../../../Vacancy'

const VacancySlide = ({ item }) => {
  return (
    <Link href={`/vacancies/${item.id}`}>
      <Vacancy
        title={item.title}
        photoId={item.photoId}
        amountFrom={item.amountFrom}
        amountTo={item.amountTo}
      />
    </Link>
  )
}

export default VacancySlide

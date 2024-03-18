import Link from 'next/link'
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from './styles'

const AllAdsSlide = () => {
  return (
    <Link href={'/sales'}>
      <AllSalons>
        <AllIconSalon />
        <FavoriteIcon />
        <AllText>Показать все объявления</AllText>
      </AllSalons>
    </Link>
  )
}

export default AllAdsSlide

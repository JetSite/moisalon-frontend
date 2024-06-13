import Link from 'next/link'
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllRentSalons = () => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${city.slug}/rent`}>
      <AllSalons>
        <AllIconSalon />
        <FavoriteIcon />
        <AllText>Показать все салоны</AllText>
      </AllSalons>
    </Link>
  )
}

export default AllRentSalons

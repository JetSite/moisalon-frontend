import { useRouter } from 'next/router'
import Link from 'next/link'
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllSalonsSlide = () => {
  const { city } = useAuthStore(getStoreData)
  const router = useRouter()
  const landingMaster = router.pathname === '/for_master'

  return (
    <Link
      href={
        !landingMaster
          ? `/${cyrToTranslit(city)}/salon`
          : `/${cyrToTranslit(city)}/rent`
      }
    >
      <AllSalons>
        <AllIconSalon />
        <FavoriteIcon />
        <AllText>Показать все салоны</AllText>
      </AllSalons>
    </Link>
  )
}

export default AllSalonsSlide

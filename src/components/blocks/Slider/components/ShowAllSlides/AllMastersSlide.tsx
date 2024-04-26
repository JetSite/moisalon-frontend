import Link from 'next/link'
import { AllMasters, AllText, AllIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllMastersSlide = () => {
  const { city } = useAuthStore(getStoreData)

  return (
    <Link href={`/${cyrToTranslit(city)}/master`}>
      <AllMasters>
        <AllIcon />
        <AllText>Показать всех мастеров</AllText>
      </AllMasters>
    </Link>
  )
}

export default AllMastersSlide

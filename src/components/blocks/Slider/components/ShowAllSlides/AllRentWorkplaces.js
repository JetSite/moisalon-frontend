import Link from 'next/link'
import { AllSalons, AllText, AllIconSalon, FavoriteIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'

const AllRentWorkplaces = ({ salon }) => {
  return (
    <Link
      href={`/${cyrToTranslit(salon?.address?.city)}/rent/${
        salon?.seo?.slug || salon?.id
      }`}
    >
      <AllSalons>
        <AllIconSalon />
        <FavoriteIcon />
        <AllText>Показать все рабочие места</AllText>
      </AllSalons>
    </Link>
  )
}

export default AllRentWorkplaces

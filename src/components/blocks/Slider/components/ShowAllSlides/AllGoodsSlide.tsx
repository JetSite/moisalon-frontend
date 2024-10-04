import Link from 'next/link'
import { AllGoods, AllText, AllIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllGoodsSlide = () => {
  const { city, user } = useAuthStore(getStoreData)

  const b2bClient =
    !!user?.owner.masters?.length || !!user?.owner.salons?.length

  return (
    <Link href={`/${city.slug}/beautyFreeShop`}>
      <AllGoods>
        <AllIcon />
        <AllText>Показать все товары</AllText>
      </AllGoods>
    </Link>
  )
}

export default AllGoodsSlide

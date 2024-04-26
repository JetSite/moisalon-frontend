import Link from 'next/link'
import { AllGoods, AllText, AllIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllGoodsSlide = () => {
  const { city, me } = useAuthStore(getStoreData)

  const b2bClient = !!me?.master?.id || !!me?.salons?.length

  return (
    <Link href={`/${cyrToTranslit(city)}/beautyFreeShop`}>
      <AllGoods>
        <AllIcon />
        <AllText>Показать все товары</AllText>
      </AllGoods>
    </Link>
  )
}

export default AllGoodsSlide

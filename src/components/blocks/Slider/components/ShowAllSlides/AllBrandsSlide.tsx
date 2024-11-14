import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AllBrands, AllTextBrand, AllIcon } from './styles'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllBrandsSlide: FC = () => {
  const { city, me } = useAuthStore(getStoreData)

  const router = useRouter()
  const landingBrand = router.pathname === '/for_brand'

  return (
    <Link
      href={
        !landingBrand ? `/${city.slug}/brand` : `/${city.slug}/beautyFreeShop`
      }
    >
      <AllBrands>
        <AllIcon />
        <AllTextBrand>Показать все бренды</AllTextBrand>
      </AllBrands>
    </Link>
  )
}

export default AllBrandsSlide

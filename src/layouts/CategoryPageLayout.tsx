import Footer from '../components/blocks/Footer'
import Header from '../components/pages/MainPage/components/Header'
import MasterSlider from '../components/pages/MainPage/components/MainMasterSlider'
import SalonSlider from '../components/pages/MainPage/components/MainSalonsSlider'
import BrandSlider from '../components/pages/MainPage/components/MainBrandsSlider'
import Line from '../components/pages/MainPage/components/Line'
import About from '../components/pages/MainPage/components/About'
import { FC } from 'react'
import { IChildren } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IBrand } from 'src/types/brands'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'

interface Props {
  rent?: boolean
  children: IChildren
  brands: IBrand[] | null
  salons: ISalon[] | null
  masters: IMaster[] | null
}

const CategoryPageLayout: FC<Props> = ({
  rent = false,
  children,
  brands,
  salons,
  masters,
}) => {
  const { city, loading } = useAuthStore(getStoreData)

  return (
    <>
      <Header loading={loading} />
      {children}
      {rent ? null : <MasterSlider city={city} data={masters} />}
      <SalonSlider
        rent={rent}
        city={city}
        data={salons && salons.length ? salons : null}
      />
      <BrandSlider data={brands} city={city} />
      <Line text="Вы – профессионал? Присоединяйтесь, чтобы воспользоваться привилегиями." />
      <About />
      <Footer loading={loading} />
    </>
  )
}

export default CategoryPageLayout

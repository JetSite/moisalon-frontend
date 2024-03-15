import { useQuery } from '@apollo/client'
import { getSalons } from '../../../../../graphql/salon/queries/getSalons'
import Slider from '../../../../blocks/Slider'

const MainSalonsSlider = ({ rent, me }) => {
  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const { data: salons, loading } = useQuery(getSalons)

  return (
    <Slider
      type="salons"
      loading={loading}
      items={salons?.salons?.data}
      title="Салоны красоты"
      bgColor="#000"
      pt={102}
      pb={91}
      isCityChangeable
      noPadding
      pl={20}
    />
  )
}

export default MainSalonsSlider

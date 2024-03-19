import { useQuery } from '@apollo/client'
import { getSalons } from '../../../../../graphql/salon/queries/getSalons'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const MainSalonsSlider = ({ rent, me }) => {
  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  const { data: salons, loading } = useQuery(getSalons)
  const salonsFlattened = flattenStrapiResponse(salons?.salons?.data)

  console.log(salons)

  return (
    <Slider
      type="salons"
      loading={loading}
      items={salonsFlattened}
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

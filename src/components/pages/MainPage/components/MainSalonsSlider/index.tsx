import { useQuery } from '@apollo/client'
import { getSalons } from '../../../../../api/graphql/salon/queries/getSalons'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon } from 'src/types/salon'

const MainSalonsSlider = () => {
  const { data: salons, loading } = useQuery(getSalons, {
    variables: {
      city: 'Москва',
      itemsCount: 10,
    },
  })
  const salonsFlattened = flattenStrapiResponse(
    salons?.salons?.data,
  ) as unknown as ISalon[]

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

import { useQuery } from '@apollo/client'

import Slider from '../../../../blocks/Slider'

const MainRentSlider = () => {
  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }

  const { data, loading } = useQuery(searchQuery, {
    variables: {
      input: {
        city: cityInStorage || '',
        lessor: true,
        query: '',
      },
    },
  })

  return (
    <Slider
      type="rentSalons"
      loading={loading}
      items={data?.salonSearch?.salonsConnection?.nodes || []}
      title="АРЕНДА"
      bgColor="#000"
      pt={80}
      pb={60}
      isCityChangeable
      noPadding
      pl={20}
    />
  )
}

export default MainRentSlider

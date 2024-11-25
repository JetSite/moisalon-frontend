import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { salonQuery } from '../../../../../_graphql-legacy/salon/salonQuery'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import Slider from '../../../../blocks/Slider'
import { ISalon } from 'src/types/salon'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const MainWorkplacesSlider = () => {
  const { city } = useAuthStore(getStoreData)
  const { data, loading } = useQuery(salonQuery, {
    variables: { id: '60d1ec4b10f3540001a9d723', filterDefinition: '' },
  })

  const allRooms: ISalon[] = []

  return (
    <Slider
      city={city}
      type="rentWorkplaces"
      loading={loading}
      items={allRooms || []}
      title="АРЕНДА РАБОЧИХ МЕСТ"
      bgColor="#000"
      pt={40}
      pb={60}
      salon={data?.salon}
      isCityChangeable
      mobileTitleWidth
      noPadding
      pl={20}
    />
  )
}

export default MainWorkplacesSlider

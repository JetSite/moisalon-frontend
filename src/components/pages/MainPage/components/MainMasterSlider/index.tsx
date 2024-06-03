import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

import { IMaster } from 'src/types/masters'
import { defaultValues } from 'src/api/authConfig'
import { FC } from 'react'
import { ICity } from 'src/types'
import { IBrand } from 'src/types/brands'
import { ISalon } from 'src/types/salon'

export interface MainSlider {
  city: ICity
  data?: IBrand[] | ISalon[] | IMaster[] | null
}

const MainMasterSlider: FC<MainSlider> = ({ city, data }) => {
  const { data: masters, loading } = useQuery(getMasters, {
    variables: {
      citySlug: city.citySlug,
      itemsCount: 100,
    },
    skip: !!data,
  })
  const mastersFlattened =
    (flattenStrapiResponse(masters?.masters?.data) as unknown as IMaster[]) ||
    data

  console.log('mastersFlattened', mastersFlattened)

  return (
    <Slider
      city={city}
      type="masters"
      loading={loading}
      items={mastersFlattened}
      title="Бьюти-мастера"
      bgColor="#f2f0f0"
      pt={102}
      pb={91}
      noPadding
      pl={20}
    />
  )
}

export default MainMasterSlider

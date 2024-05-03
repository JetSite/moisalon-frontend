import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { getMasters } from 'src/graphql/master/queries/getMasters'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

import { IMaster } from 'src/types/masters'

const MainMasterSlider = () => {
  const { data: masters, loading } = useQuery(getMasters, {
    variables: {
      city: 'Москва',
      itemsCount: 10,
    },
  })
  const mastersFlattened = flattenStrapiResponse(
    masters?.masters?.data,
  ) as unknown as IMaster[]

  return (
    <Slider
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

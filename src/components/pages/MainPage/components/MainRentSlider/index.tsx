import { useQuery } from '@apollo/client'

import Slider from '../../../../blocks/Slider'
import { ICity } from 'src/types'
import { FC } from 'react'
import { GET_RENT_SALONS } from 'src/api/graphql/salon/queries/getRentSalons'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface Props {
  city: ICity
}

const MainRentSlider: FC<Props> = ({ city }) => {
  const { data, loading } = useQuery(GET_RENT_SALONS, {
    variables: {
      slug: city.slug,
    },
  })

  return (
    <Slider
      city={city}
      type="rentSalons"
      loading={loading}
      items={flattenStrapiResponse(data?.salons) || []}
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

import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { PROMOTIONS } from 'src/api/graphql/promotion/queries/getPromotions'
import { FC } from 'react'
import { ICity } from 'src/types'

interface Props {
  city: ICity
}

const MainAdsSlider: FC<Props> = ({ city }) => {
  const { data, loading } = useQuery(PROMOTIONS, {
    variables: { pageSize: 10 },
  })

  return (
    <Slider
      city={city}
      type="ads"
      loading={loading}
      items={data?.salesSearch?.connection?.nodes || []}
      title="BEAUTY-ОБЪЯВЛЕНИЯ"
      bgColor="#000"
      pt={70}
      pb={60}
      isCityChangeable
      mobileTitleWidth
      noPadding
      pl={20}
    />
  )
}

export default MainAdsSlider

import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { PROMOTIONS } from 'src/api/graphql/promotion/queries/getPromotions'
import { FC } from 'react'
import { ICity } from 'src/types'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IPromotions } from 'src/types/promotions'

interface Props {
  city: ICity
}

const MainAdsSlider: FC<Props> = ({ city }) => {
  const { data: queryData, loading } = useQuery(PROMOTIONS, {
    variables: { pageSize: 10 },
  })

  return (
    <Slider
      city={city}
      type="ads"
      loading={loading}
      items={
        (flattenStrapiResponse(queryData?.promotions) as IPromotions[]) || []
      }
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

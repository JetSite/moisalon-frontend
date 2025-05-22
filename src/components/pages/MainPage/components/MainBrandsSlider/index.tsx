import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { FC } from 'react'
import { MainSlider } from '../MainMasterSlider'
import { BRANDS } from '@/api/graphql/brand/queries/getBrands'

const MainBrandsSlider: FC<MainSlider> = ({ city, data }) => {
  const { data: brands, loading } = useQuery(BRANDS, {
    variables: {
      itemsCount: 10,
    },
    skip: !!data,
  })
  const brandsFlattened = flattenStrapiResponse(brands?.brands?.data) || data

  return (
    <Slider
      city={city}
      type="brands"
      loading={loading}
      items={brandsFlattened}
      title="Популярные бренды"
      pt={102}
      pb={91}
      mobileTitleWidth
      noPadding
      pl={20}
    />
  )
}

export default MainBrandsSlider

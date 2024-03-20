import { useQuery } from '@apollo/client'
import { getBrands } from 'src/graphql/brand/queries/getBrands'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const MainBrandsSlider = () => {
  const { data: brands, loading } = useQuery(getBrands)
  const brandsFlattened = flattenStrapiResponse(brands?.brands?.data)

  return (
    <Slider
      type="brands"
      noScroll
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

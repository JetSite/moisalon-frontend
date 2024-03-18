import { useQuery } from '@apollo/client'
import { getBrands } from 'src/graphql/brand/queries/getBrands'
import Slider from '../../../../blocks/Slider'

const MainBrandsSlider = () => {
  const { data: brands, loading } = useQuery(getBrands)

  return (
    <Slider
      type="brands"
      noScroll
      loading={loading}
      items={brands?.brands?.data}
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

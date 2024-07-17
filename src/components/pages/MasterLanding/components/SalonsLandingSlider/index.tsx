import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { ISalon } from 'src/types/salon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getRating } from 'src/utils/newUtils/getRating'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { WrapperSalonSlider } from '../../styles'

const SalonsLandingSlider = () => {
  const { city } = useAuthStore(getStoreData)

  const { data: salons, loading } = useQuery(getSalons, {
    variables: {
      slug: city.slug,
      itemsCount: 10,
    },
  })

  const prepareSalons: ISalon[] = flattenStrapiResponse(salons?.salons?.data)
  const salonsFlattened = prepareSalons?.map(e => {
    const reviewsCount = e.reviews.length
    const { rating, ratingCount } = getRating(e.ratings)
    return { ...e, rating, ratingCount, reviewsCount }
  })

  return (
    <WrapperSalonSlider>
      <Slider
        type="salons"
        loading={loading}
        items={salonsFlattened}
        title="Кабинеты в этих салонах уже доступны в аренду"
        bgColor="#000"
        city={city}
      />
    </WrapperSalonSlider>
  )
}

export default SalonsLandingSlider

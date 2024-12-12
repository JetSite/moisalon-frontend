import { useQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { ISalon } from 'src/types/salon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getRating } from 'src/utils/newUtils/getRating'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { WrapperSlider } from './styles'

const SalonLandingSalonsSlider = () => {
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
    <WrapperSlider>
      <Slider
        type="salons"
        loading={loading}
        items={salonsFlattened}
        title="1200+ салонов уже зарабатывают с нами"
        bgColor="#000"
        city={city}
      />
    </WrapperSlider>
  )
}

export default SalonLandingSalonsSlider

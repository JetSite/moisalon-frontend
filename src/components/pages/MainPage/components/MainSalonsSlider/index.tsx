import { useQuery } from '@apollo/client'
import { getSalons } from '../../../../../api/graphql/salon/queries/getSalons'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon } from 'src/types/salon'
import { FC } from 'react'
import { MainSlider } from '../MainMasterSlider'
import { getRating } from 'src/utils/newUtils/getRating'

interface Props extends MainSlider {
  rent?: boolean
}

const MainSalonsSlider: FC<Props> = ({ city, rent, data }) => {
  const { data: salons, loading } = useQuery(getSalons, {
    variables: {
      citySlug: city.citySlug,
      itemsCount: 10,
    },
    skip: !!data,
  })

  const prepareSalons: ISalon[] =
    flattenStrapiResponse(salons?.salons?.data) || data
  const salonsFlattened = prepareSalons?.map(e => {
    const reviewsCount = e.reviews.length
    const { rating, ratingCount } = getRating(e.ratings)
    return { ...e, rating, ratingCount, reviewsCount }
  })

  return (
    <Slider
      city={city}
      type={rent ? 'rentSalons' : 'salons'}
      loading={loading}
      items={salonsFlattened}
      title="Салоны красоты"
      bgColor="#000"
      pt={102}
      pb={91}
      isCityChangeable
      noPadding
      pl={20}
    />
  )
}

export default MainSalonsSlider

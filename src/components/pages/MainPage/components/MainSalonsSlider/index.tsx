import { useLazyQuery } from '@apollo/client'
import Slider from '../../../../blocks/Slider'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon } from 'src/types/salon'
import { FC, useEffect, useState } from 'react'
import { MainSlider } from '../MainMasterSlider'
import { getRating } from 'src/utils/newUtils/getRating'
import { getSalons } from '@/api/graphql/salon/queries/getSalons'

interface Props extends MainSlider {
  rent?: boolean
}

const MainSalonsSlider: FC<Props> = ({ city, data }) => {
  const [fetchSalon, { data: salons, loading }] = useLazyQuery(getSalons, {
    variables: {
      slug: city.slug,
      itemsCount: 10,
    },
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (!data) {
      fetchSalon()
    }
  }, [data, fetchSalon])

  if (!isClient) {
    return null
  }

  const prepareSalons: ISalon[] =
    flattenStrapiResponse(salons?.salons?.data) || data || []
  const salonsFlattened = prepareSalons.map(e => {
    const reviewsCount = e.reviews.length
    const { rating, ratingCount } = getRating(e.ratings)
    return { ...e, rating, ratingCount, reviewsCount }
  })
  return (
    <Slider
      city={city}
      type={'salons'}
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

import React, { FC } from 'react'
import { CitiesListWrapper, CityItem } from './styles'
import { IID } from 'src/types/common'
import { ICity } from 'src/types'

interface Props {
  cities: ICity[]
  cityClickHandler: (city: ICity) => void
}

const CitiesList: FC<Props> = ({ cities, cityClickHandler }) => {
  return (
    <CitiesListWrapper>
      {cities?.map((city, i) => {
        return (
          <CityItem key={i} onClick={() => cityClickHandler(city)}>
            {city?.cityName}
          </CityItem>
        )
      })}
    </CitiesListWrapper>
  )
}

export default CitiesList

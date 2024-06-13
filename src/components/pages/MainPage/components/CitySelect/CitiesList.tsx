import React, { FC } from 'react'
import { CitiesListWrapper, CityItem } from './styles'
import { ICity } from 'src/types'

export interface ICitiesListProps {
  cities: ICity[]
  cityClickHandler: (selectCity: ICity) => void
}

const CitiesList: FC<ICitiesListProps> = ({ cities, cityClickHandler }) => {
  return (
    <CitiesListWrapper>
      {cities?.map((city, i) => {
        return (
          <CityItem key={i} onClick={() => cityClickHandler(city)}>
            {city?.name}
          </CityItem>
        )
      })}
    </CitiesListWrapper>
  )
}

export default CitiesList

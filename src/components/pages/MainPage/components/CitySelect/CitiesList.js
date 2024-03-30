import React from 'react'
import { CitiesListWrapper, CityItem } from './styles'

const CitiesList = ({ cities, cityClickHandler }) => {
  return (
    <CitiesListWrapper>
      {cities?.map(city => {
        return (
          <CityItem key={city.id} onClick={() => cityClickHandler(city.id)}>
            {city?.cityName}
          </CityItem>
        )
      })}
    </CitiesListWrapper>
  )
}

export default CitiesList

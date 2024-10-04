import React, { FC } from 'react'
import { CitiesListWrapper, CityItem } from './styles'
import { ICity } from 'src/types'

export interface ICitiesListProps {
  cities: ICity[]
  cityClickHandler: (selectCity: ICity) => void
  loading: boolean
}

const CitiesList: FC<ICitiesListProps> = ({
  cities,
  cityClickHandler,
  loading,
}) => {
  return (
    <CitiesListWrapper>
      {cities.map((city, i) => {
        return (
          <CityItem key={i} onClick={() => cityClickHandler(city)}>
            {city?.name}
          </CityItem>
        )
      })}
      {!cities?.length || loading ? (
        <CityItem>{loading ? 'Загрузка...' : 'Город не найден'}</CityItem>
      ) : null}
    </CitiesListWrapper>
  )
}

export default CitiesList

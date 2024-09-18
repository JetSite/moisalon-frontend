import React, { FC } from 'react'
import { pluralize } from '../../../../../utils/pluralize'
import { ICity } from 'src/types'
import { Title } from './styled'

interface SearchResultsTitleProps {
  totalCount: number
  viewCount: number
  rent: boolean
  cityData: ICity
}

const SearchResultsTitle: FC<SearchResultsTitleProps> = ({
  totalCount,
  viewCount,
  rent,
  cityData,
}) => {
  return (
    <>
      <Title>
        {rent
          ? `Аренда кабинета, рабочего места в салонах красоты в городе ${
              cityData.name
            } ${pluralize(
              totalCount,
              'найден',
              'найдено',
              'найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'салон',
              'салона',
              'салонов',
            )}`
          : `${pluralize(
              totalCount,
              'Найден',
              'Найдено',
              'Найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'салон',
              'салона',
              'салонов',
            )}`}
      </Title>
      <Title>
        {pluralize(viewCount, 'Показан', 'Показаны', 'Показано')}
        &nbsp;
        {viewCount}
        &nbsp; из &nbsp;
        {totalCount}
        &nbsp;
        {pluralize(totalCount, 'салон', 'салона', 'салонов')}
      </Title>
    </>
  )
}

export default SearchResultsTitle

import React, { FC } from 'react'
import {
  Wrapper,
  FilterItem,
  FilterArrowWrap,
  FilterArrow,
  Text,
  FilterWrap,
  Wrap,
  TextFilter,
} from './styles'
import { ISetState } from 'src/types/common'
import { IView } from 'src/components/pages/Salon/AllSalons'

export const filtersType = {
  'по отзывам': 'reviewsCount',
  'по рейтингу': 'rating',
}

export type IFiltersType = keyof typeof filtersType

export type ISortOrder = ':asc' | ':desc'

interface Props {
  view?: IView
  setView?: ISetState<IView>
  salon?: boolean
  main?: boolean
  master?: boolean
  sortOrder: ISortOrder
  sortProperty: IFiltersType
  handleFilter: (filter: IFiltersType) => void
}

const FilterSearchResults: FC<Props> = ({
  view = 'list',
  setView,
  salon = false,
  main,
  sortProperty,
  sortOrder,
  master = false,
  handleFilter,
}) => {
  return (
    true && (
      <Wrapper view={view}>
        {view === 'list' ? (
          <Wrap>
            {(Object.keys(filtersType) as IFiltersType[]).map((filter, i) => {
              return (
                <FilterItem
                  onClick={
                    master || salon ? () => handleFilter(filter) : undefined
                  }
                  salon={salon}
                  active={filter === sortProperty}
                  key={i}
                >
                  <Text active={filter === sortProperty}>{filter}</Text>
                  <FilterArrowWrap
                    active={filter === sortProperty && sortOrder === ':desc'}
                  >
                    <FilterArrow src="/filter-arrow.png" />
                  </FilterArrowWrap>
                </FilterItem>
              )
            })}
          </Wrap>
        ) : null}
        {salon && !main ? (
          <FilterWrap active={view === 'list'}>
            <TextFilter
              onClick={() => setView && setView('list')}
              active={view === 'list'}
            >
              Список
            </TextFilter>
            <TextFilter
              // onClick={() => setView && setView('map')}
              // active={view === 'map'}
              active
            >
              На карте
            </TextFilter>
          </FilterWrap>
        ) : null}
      </Wrapper>
    )
  )
}

export default FilterSearchResults

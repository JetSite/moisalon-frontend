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
import { IUseSalonSearchResult } from 'src/components/pages/MainPage/components/SearchMain/utils/useSalonSearch'
import { IView } from 'src/components/pages/Salon/AllSalons'
import { ISetState } from 'src/types/common'

export const filtersType = {
  'по отзывам': 'reviewsCount',
  'по рейтингу': 'rating',
}

export type IFiltersType = keyof typeof filtersType

export type ISortOrder = ':asc' | ':desc'

interface Props
  extends Partial<
    Pick<IUseSalonSearchResult, 'sortProperty' | 'sortOrder' | 'handleFilter'>
  > {
  view?: IView
  setView?: ISetState<IView>
  salon?: boolean
  main?: boolean
  master?: boolean
}

const FilterSearchResults: FC<Props> = ({
  view = 'list',
  setView,
  salon = false,
  master = false,
  main,
  sortProperty,
  sortOrder,
  handleFilter,
}) => {
  return (
    <Wrapper view={view}>
      {view === 'list' ? (
        <Wrap>
          {(Object.keys(filtersType) as IFiltersType[]).map((filter, i) => {
            return (
              <FilterItem
                onClick={
                  master || salon
                    ? () => {
                        handleFilter && handleFilter(filter)
                      }
                    : undefined
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
            onClick={() => setView && setView('map')}
            active={view === 'map'}
          >
            На карте
          </TextFilter>
        </FilterWrap>
      ) : null}
    </Wrapper>
  )
}

export default FilterSearchResults

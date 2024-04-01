import React, { Dispatch, FC, SetStateAction } from 'react'
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

const filters = ['по рейтингу', 'по отзывам']
export const typesFilter = {
  RATING: 'по рейтингу',
  AVERAGESCORE: 'по отзывам',
}
const typesFilterProp = {
  'по рейтингу': 'RATING',
  'по отзывам': 'AVERAGESCORE',
}

interface Props {
  view?: 'list' | string
  setView?: Dispatch<SetStateAction<'list' | string>>
  salon?: boolean
  main?: boolean
  master?: boolean
  sortOrder: 'ASCENDING' | 'DESCENDING' | null
  setSortOrder: Dispatch<SetStateAction<'ASCENDING' | 'DESCENDING' | null>>
  sortProperty: keyof typeof typesFilter | null
  setSortProperty: Dispatch<SetStateAction<keyof typeof typesFilter | null>>
}

const FilterSearchResults: FC<Props> = ({
  view = 'list',
  setView,
  salon = false,
  main,
  sortProperty,
  setSortProperty,
  sortOrder,
  setSortOrder,
  master = false,
}) => {
  const handleFilter = (filter: string) => {
    if (sortProperty) {
      if (typesFilter[sortProperty] === filter && sortOrder === 'ASCENDING') {
        setSortProperty(null)
        setSortOrder(null)
        return
      }
      // @ts-ignore
      setSortProperty(typesFilter[filter])
      if (typesFilter[sortProperty] !== filter) {
        setSortOrder('DESCENDING')
        return
      }
      if (!sortOrder) {
        setSortOrder('DESCENDING')
      }
      if (sortOrder === 'DESCENDING') {
        setSortOrder('ASCENDING')
      }
      if (sortOrder === 'ASCENDING') {
        setSortOrder('DESCENDING')
      }
    }
  }

  return (
    sortProperty && (
      <Wrapper view={view}>
        {view === 'list' ? (
          <Wrap>
            {filters.map((filter, i) => (
              <FilterItem
                onClick={
                  master || salon ? () => handleFilter(filter) : undefined
                }
                salon={salon}
                active={filter === typesFilter[sortProperty]}
                key={i}
              >
                <Text active={filter === typesFilter[sortProperty]}>
                  {filter}
                </Text>
                <FilterArrowWrap
                  active={
                    sortOrder === 'ASCENDING' &&
                    filter === typesFilter[sortProperty]
                  }
                >
                  <FilterArrow src="/filter-arrow.png" />
                </FilterArrowWrap>
              </FilterItem>
            ))}
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
  )
}

export default FilterSearchResults

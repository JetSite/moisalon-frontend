import FilterSearchResults from 'src/components/blocks/FilterSearchResults'
import { SalonList } from 'src/components/pages/Salon/SalonList'
import SalonMap from 'src/components/pages/Salon/SalonMap'
import SearchResultsTitle from './SearchSalonResultsTitle'
import { useSalonSearch } from './utils/useSalonSearch'
import { FC, useState } from 'react'
import { IView } from 'src/components/pages/Salon/AllSalons'
import { ISetState } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { ICity, IPagination } from 'src/types'
import RentFilter, { IFilters } from 'src/components/pages/Rent/RentFilter'

export interface ISearchResults {
  pagination: IPagination
  cityData: ICity
}

interface Props extends ISearchResults {
  view: IView
  setView: ISetState<IView>
  salonData: ISalon[]
  main?: boolean
  rent?: boolean
  pageSize: number
}

export const SalonsSearch: FC<Props> = ({
  salonData,
  view,
  setView,
  main = false,
  rent = false,
  pagination,
  cityData,
  pageSize,
}) => {
  const [filters, setFilters] = useState<IFilters | null>(null)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const {
    updateSalonData,
    loading,
    onFetchMore,
    handleFilter,
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
    nextPageCount,
  } = useSalonSearch({ salonData, pagination, cityData, rent, pageSize })

  const totalCount = pagination?.total || 0

  return (
    <div id="result">
      {view === 'list' && (
        <>
          <SearchResultsTitle
            viewCount={updateSalonData.length}
            totalCount={totalCount}
            rent={rent}
            cityData={cityData}
          />
          {!main && rent ? (
            <RentFilter
              setFilterOpen={setFilterOpen}
              filterOpen={filterOpen}
              filters={filters}
              setFilters={setFilters}
            />
          ) : null}
        </>
      )}
      <FilterSearchResults
        handleFilter={handleFilter}
        sortProperty={sortProperty}
        sortOrder={sortOrder}
        salon
        view={view}
        setView={setView}
      />
      {view === 'list' ? (
        <>
          <SalonList
            updateSalonData={updateSalonData}
            rent={rent}
            loading={loading}
            onFetchMore={onFetchMore}
            hasNextPage={pagination.pageCount + 1 !== nextPageCount}
          />
        </>
      ) : (
        <SalonMap
          salonData={salonData}
          pagination={pagination}
          cityData={cityData}
          rent={rent}
        />
      )}
    </div>
  )
}

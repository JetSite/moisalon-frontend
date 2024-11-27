import FilterSearchResults from 'src/components/blocks/FilterSearchResults'
import { SalonList } from 'src/components/pages/Salon/SalonList'
import SalonMap from 'src/components/pages/Salon/SalonMap'
import SearchResultsTitle from './SearchResultsTitle'
import { useSalonSearch } from './utils/useSalonSearch'
import { FC, useState } from 'react'
import { IView } from 'src/components/pages/Salon/AllSalons'
import { ISetState } from 'src/types/common'
import { ISalon } from 'src/types/salon'
import { ICity, IPagination } from 'src/types'
import RentFilter, { IFilters } from 'src/components/pages/Rent/RentFilter'
import { pluralize } from 'src/utils/pluralize'

export interface ISearchResults {
  pagination: IPagination
  cityData: ICity
}

interface Props extends ISearchResults {
  view: IView
  setView?: ISetState<IView>
  salonData: ISalon[]
  main?: boolean
  rent?: boolean
  pageSize: number
  search?: boolean
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
  search,
}) => {
  const [filters, setFilters] = useState<IFilters | null>(null)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const totalCount = pagination?.total || 0
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
  } = useSalonSearch({
    salonData,
    pagination,
    cityData,
    rent,
    pageSize,
  })

  const prepareTitle = rent
    ? `Аренда кабинета, рабочего места в салонах красоты в городе ${
        cityData.name
      } ${pluralize(
        totalCount,
        'найден',
        'найдено',
        'найдено',
      )} ${totalCount} ${pluralize(totalCount, 'салон', 'салона', 'салонов')}`
    : `${pluralize(
        totalCount,
        'Найден',
        'Найдено',
        'Найдено',
      )} ${totalCount} ${pluralize(totalCount, 'салон', 'салона', 'салонов')}`

  const prepareSubTitle = `${pluralize(
    updateSalonData.length,
    'Показан',
    'Показаны',
    'Показано',
  )} ${updateSalonData.length} из ${totalCount} ${pluralize(
    totalCount,
    'салон',
    'салона',
    'салонов',
  )}`

  return (
    <div id="result">
      {view === 'list' ? (
        <>
          <SearchResultsTitle
            prepareTitle={prepareTitle}
            prepareSubTitle={prepareSubTitle}
            totalCount={totalCount}
            noFoundText="Салонов не найдено"
            main={main}
            search={search}
          />
          {rent && !search && main ? (
            <RentFilter
              setFilterOpen={setFilterOpen}
              filterOpen={filterOpen}
              filters={filters}
              setFilters={setFilters}
            />
          ) : null}
        </>
      ) : null}
      {setView && !search ? (
        <FilterSearchResults
          handleFilter={handleFilter}
          sortProperty={sortProperty}
          sortOrder={sortOrder}
          salon
          view={view}
          setView={setView}
        />
      ) : null}
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

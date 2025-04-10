import React, { FC } from 'react';
import { MainContainer } from '../../../../../styles/common';
import { Title, WrapperResults } from './styled';
import MastersSearchResults from './MastersSearchResults';
import BrandsSearchResults from './BrandsSearchResults';
import { SalonsSearch } from './SalonSearch';
import useAuthStore from 'src/store/authStore';
import { getStoreData } from 'src/store/utils';
import { useSearch } from './utils/useSearch';

interface Props {
  searchValue: string;
}

const SearchResults: FC<Props> = ({ searchValue }) => {
  const { city } = useAuthStore(getStoreData);
  const { loading, data, pagination } = useSearch(searchValue, false);

  return (
    <MainContainer>
      <WrapperResults>
        {data ? (
          <>
            <MastersSearchResults
              pagination={{ ...pagination, total: data?.masters?.length }}
              cityData={city}
              masterData={data?.masters || []}
              main
              noFilters
            />
            <BrandsSearchResults
              cityData={city}
              brandData={data.brands || []}
              pagination={{ ...pagination, total: data.brands?.length }}
              main
            />
            <SalonsSearch
              salonData={data?.salons || []}
              cityData={city}
              pageSize={10}
              pagination={{ ...pagination, total: data?.salons?.length }}
              view="list"
              main
            />
            {/* <SalesSearchResults />
        <EducationsSearchResults />
        <EventsSearchResults />
        <VacanciesSearchResults /> */}
          </>
        ) : (
          <Title>{loading ? 'Загрузка' : 'Ничего не найдено'}</Title>
        )}
      </WrapperResults>
    </MainContainer>
  );
};

export default SearchResults;

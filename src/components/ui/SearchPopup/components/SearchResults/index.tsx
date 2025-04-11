import { useState, useEffect, FC } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { MainContainer } from '../../../../../styles/common';
import {
  Wrapper,
  Category,
  Title,
  List,
  ListItem,
  EmptyResult,
} from './styled';
import useAuthStore from 'src/store/authStore';
import { getStoreData } from 'src/store/utils';
import RotatingLoader from '../../../RotatingLoader';
import { ISetState } from 'src/types/common';
import { ISearchQuery } from '../Search';
import { useSearch } from '@/components/pages/MainPage/components/SearchMain/utils/useSearch';

interface Props {
  setShowSearchPopup: ISetState<boolean>;
  query: ISearchQuery;
}

const SearchResults: FC<Props> = ({ setShowSearchPopup, query }) => {
  const { loading, data } = useSearch(query.query.trim());

  const { city } = useAuthStore(getStoreData);

  const clickItemHandler = () => {
    setShowSearchPopup(false);
  };

  return (
    <MainContainer>
      <Wrapper>
        {!loading ? (
          <>
            <Category>
              <Title>Мастера</Title>
              <List>
                {data?.masters?.length ? (
                  data.masters.map(master => (
                    <Link
                      key={master.name}
                      href={`/${master?.city.slug || city.slug}/master/${
                        master.id
                      }`}
                      passHref
                    >
                      <ListItem key={master.id} onClick={clickItemHandler}>
                        {master.name}
                      </ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Мастера не найдены</EmptyResult>
                )}
              </List>
            </Category>
            <Category>
              <Title>Салоны</Title>
              <List>
                {data?.salons?.length ? (
                  data.salons.map(salon => (
                    <Link
                      key={salon.id}
                      href={`/${salon.city.slug || city.slug}/salon/${
                        salon.id
                      }`}
                      passHref
                    >
                      <ListItem key={salon.id}>{salon.name}</ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Салоны не найдены</EmptyResult>
                )}
              </List>
            </Category>
            {/* <Category>
              <Title>Аренда</Title>
              <List>
                {data?.salons.filter(e => e.rent)?.length ? (
                  data.salons
                    .filter(e => e.rent)
                    .map(salon => (
                      <Link
                        key={salon.id}
                        href={`/${salon.city.slug || city.slug}/rent/${
                          salon.id
                        }`}
                        passHref
                      >
                        <ListItem key={salon.id}>{salon.name}</ListItem>
                      </Link>
                    ))
                ) : (
                  <EmptyResult>
                    Салоны, сдающие места в аренду не найдены
                  </EmptyResult>
                )}
              </List>
            </Category> */}
            <Category>
              <Title>Бренды</Title>
              <List>
                {data?.brands?.length ? (
                  data.brands.map(brand => (
                    <Link
                      key={brand.name}
                      href={`/${brand.city?.slug || city.slug}/brand/${
                        brand.id
                      }`}
                      passHref
                    >
                      <ListItem key={brand.id}>{brand.name}</ListItem>
                    </Link>
                  ))
                ) : (
                  <EmptyResult>Бренды не найдены</EmptyResult>
                )}
              </List>
            </Category>
          </>
        ) : (
          <RotatingLoader />
        )}
      </Wrapper>
    </MainContainer>
  );
};

export default SearchResults;

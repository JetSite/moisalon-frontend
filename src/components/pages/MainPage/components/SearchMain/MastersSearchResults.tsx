import React, { useState, useEffect, FC } from 'react';

import { pluralize } from '@/utils/pluralize';
import { MobileVisible, MobileHidden } from '@/styles/common';
import { WrapperItemsMasters, LinkStyled, Checkbox, Label } from './styled';
import Button from '@/components/ui/Button';
import FilterSearchResults, {
  IFiltersType,
  ISortOrder,
  filtersType,
} from '@/components/blocks/FilterSearchResults';
import { IMaster } from '@/types/masters';
import useAuthStore from '@/store/authStore';
import { getStoreData } from '@/store/utils';
import { useLazyQuery } from '@apollo/client';
import { getMastersTroughCity } from '@/api/graphql/master/queries/getMastersTroughCity';
import { flattenStrapiResponse } from '@/utils/flattenStrapiResponse';
import { defaultValues, settingsConfig } from '@/api/authConfig';
import { useRouter } from 'next/router';
import { ISearchResults } from './SalonSearch';
import SearchResultsTitle from './SearchResultsTitle';
import MasterItem from '@/components/blocks/MasterCard';

interface Props extends ISearchResults {
  masterData: IMaster[];
  noFilters?: boolean;
}

const MastersSearchResults: FC<Props> = ({
  masterData,
  pagination,
  cityData,
  search,
  noFilters,
  main,
}) => {
  const [page, setPage] = useState<number>(2);
  const hasNextPage = pagination && pagination.pageCount + 1 !== page;
  const totalCount = pagination?.total || 0;
  const { user } = useAuthStore(getStoreData);
  const [updateMasterData, setUpdateMasterData] =
    useState<IMaster[]>(masterData);
  const { city } = useAuthStore(getStoreData);
  const [resumeFilter, setResumeFilter] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setUpdateMasterData(masterData);
  }, [masterData]);

  useEffect(() => {
    try {
      let storageSort;
      if (typeof window !== 'undefined') {
        storageSort =
          localStorage.getItem(settingsConfig.masterSort) || 'viewsCount:desc';
        const storageSortProperty = storageSort.includes(
          filtersType['по отзывам'],
        )
          ? 'по отзывам'
          : 'по рейтингу';

        const storageSortOrder = storageSort.includes(':desc')
          ? ':desc'
          : ':asc';

        setSortOrder(storageSortOrder);
        setSortProperty(storageSortProperty);
      }
    } catch (error) {
      console.error('Error initializing sort preferences:', error);
      setSortOrder(':desc');
      setSortProperty('по рейтингу');
    }
  }, []);

  const [sortProperty, setSortProperty] = useState<IFiltersType>(
    Object.keys(filtersType)[1] as IFiltersType,
  );
  const [sortOrder, setSortOrder] = useState<ISortOrder>(':desc');

  const [refetch, { loading }] = useLazyQuery(getMastersTroughCity, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.masters);
      setUpdateMasterData(prev => prev.concat(prepareData));
    },
    onError: err => {
      console.log(err);
    },
  });

  const onFetchMore = async () => {
    const sort = filtersType[sortProperty] + sortOrder;
    console.log(sort);

    resumeFilter
      ? await refetch({
          variables: {
            slug: cityData?.slug,
            page,
            pageSize: 10,
            searchWork: resumeFilter,
            sort,
          },
        })
      : await refetch({
          variables: {
            slug: cityData?.slug,
            page,
            pageSize: 10,
            sort,
          },
        });
    setPage(page + 1);
  };

  const handleFilter = async (filter: keyof typeof filtersType) => {
    if (sortProperty !== filter) {
      setSortProperty(filter);
      setSortOrder(':asc');
    } else {
      setSortOrder(prev => (prev === ':asc' ? ':desc' : ':asc'));
    }
    const sort = filtersType[filter] + sortOrder;
    localStorage.setItem(settingsConfig.masterSort, sort);

    setUpdateMasterData([]);
    resumeFilter
      ? await refetch({
          variables: {
            slug: cityData?.slug,
            sort: [sort],
            searchWork: resumeFilter,
          },
        })
      : await refetch({
          variables: {
            slug: cityData?.slug,
            sort: [sort],
          },
        });

    setPage(2);
  };

  const prepareTitle = `${pluralize(
    totalCount,
    'Найден',
    'Найдено',
    'Найдено',
  )} ${totalCount} ${pluralize(totalCount, 'мастер', 'мастера', 'мастеров')}`;

  return (
    <>
      <SearchResultsTitle
        prepareTitle={prepareTitle}
        totalCount={totalCount}
        noFoundText="Мастера не найдены"
        main={main}
        search={search}
      />
      {!search && !noFilters ? (
        <FilterSearchResults
          handleFilter={handleFilter}
          sortProperty={sortProperty}
          sortOrder={sortOrder}
          master
        />
      ) : null}

      {user?.owner?.salons && user?.owner?.salons?.length > 0 ? (
        <>
          <Checkbox
            checked={!!resumeFilter}
            id="resume"
            onClick={async () => {
              setUpdateMasterData([]);
              setResumeFilter(prevResumeFilter => {
                const newResumeFilter = !prevResumeFilter;
                setUpdateMasterData([]);
                if (newResumeFilter) {
                  refetch({
                    variables: {
                      searchWork: true,
                      slug: cityData?.slug,
                    },
                  });
                } else {
                  // setUpdateMasterData(masterData)
                  // setTotalCount(pagination?.total || 0)
                  refetch({
                    variables: {
                      slug: cityData?.slug,
                    },
                  });
                }
                return newResumeFilter;
              });
            }}
          />
          <Label htmlFor="resume">Найти резюме</Label>
        </>
      ) : null}
      {updateMasterData && updateMasterData.length ? (
        <WrapperItemsMasters>
          {updateMasterData.map(master => (
            <div
              onClick={() => {
                router.push(
                  `/${
                    master.city?.slug || city.slug || defaultValues.city.slug
                  }/master/${master.id}`,
                );
              }}
              key={master.id}
            >
              <LinkStyled>
                <MasterItem
                  loading={false}
                  master={master}
                  shareLink={`https://moi.salon/${
                    master.city?.slug || city.slug || defaultValues.city.slug
                  }/master/${master.id}`}
                  type="search-page"
                />
              </LinkStyled>
            </div>
          ))}
        </WrapperItemsMasters>
      ) : null}
      {hasNextPage && updateMasterData.length > 9 ? (
        <>
          <MobileHidden>
            <Button
              onClick={onFetchMore}
              size="medium"
              variant="darkTransparent"
              mb="55"
              disabled={loading}
            >
              Показать еще
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              size="roundSmall"
              variant="withRoundBorder"
              font="roundSmall"
              mb="56"
              onClick={onFetchMore}
              disabled={loading}
            >
              Показать еще мастеров
            </Button>
          </MobileVisible>
        </>
      ) : null}
    </>
  );
};

export default MastersSearchResults;

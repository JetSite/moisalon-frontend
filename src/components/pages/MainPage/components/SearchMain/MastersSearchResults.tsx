import React, { useState, useEffect, FC } from 'react'
import Link from 'next/link'

import { masterSearchQuery } from '../../../../../_graphql-legacy/search/masterSearch'
import { pluralize } from '../../../../../utils/pluralize'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import {
  WrapperResults,
  WrapperItemsMasters,
  Title,
  LinkStyled,
  Checkbox,
  Label,
} from './styled'
import Button from '../../../../ui/Button'
import FilterSearchResults from '../../../../blocks/FilterSearchResults'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import MasterItem from '../../../../blocks/MasterCard'
import { cyrToTranslit } from '../../../../../utils/translit'
import { useSearchHistory } from '../../../../../hooks/useSearchHistory'
import useCheckMobileDevice from '../../../../../hooks/useCheckMobileDevice'
import { IMaster } from 'src/types/masters'
import { IPagination } from 'src/types'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const MastersSearchResults: FC<{
  masterData: IMaster[]
  paginations: IPagination
}> = ({ masterData, paginations }) => {
  const [masterSearchData, setMasterSearchData] = useState(masterData)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [resumeFilter, setResumeFilter] = useState<boolean | null>(null)
  const [loadingFirst, setLoadingFirst] = useState(true)
  const { me, city } = useAuthStore(getStoreData)
  const [sortProperty, setSortProperty] = useState<
    'RATING' | 'AVERAGESCORE' | null
  >(null)
  const [sortOrder, setSortOrder] = useState<'ASCENDING' | 'DESCENDING' | null>(
    null,
  )

  // const { fetchMore, refetch } = useQuery(masterSearchQuery, {
  //   variables: {
  //     input: {
  //       query: (query && query.query) || '',
  //       searchWork: resumeFilter,
  //       city: city ? city : 'Москва',
  //       sortOrder: sortOrder || undefined,
  //       sortProperty: sortProperty || undefined,
  //     },
  //   },
  //   skip: true,
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: res => {
  //     setLoading(false)
  //     if (res) {
  //       setMasterSearchData(res.masterSearch)
  //     }
  //   },
  // })

  // const mastersSearchResult = masterSearchData?.connection.nodes || [];
  // const hasNextPage = masterSearchData?.connection?.pageInfo?.hasNextPage;
  const totalCount = paginations.total

  useEffect(() => {
    if (!loadingFirst) {
      if (sortProperty) {
        setLoading(true)
        // setChosenItemId('')
        // refetch({
        //   input: {
        //     query: (query && query.query) || '',
        //     cursor: null,
        //     searchWork: resumeFilter,
        //     city: city ? city : 'Москва',
        //     sortOrder: sortOrder || undefined,
        //     sortProperty: sortProperty || undefined,
        //   },
        // })
      }
    } else {
      setLoadingFirst(false)
    }
  }, [resumeFilter, sortOrder, sortProperty])

  const isMobile = useCheckMobileDevice()

  // const { setChosenItemId } = useSearchHistory(
  //   masterSearchData,
  //   setMasterSearchData,
  //   'master',
  //   isMobile ? -10 : -120,
  // )

  // const onFetchMore = useCallback(() => {
  //   setFetchMoreLoading(true);
  //   setChosenItemId("");
  //   fetchMore({
  //     variables: {
  //       query: (query && query.query) || "",
  //       city: city ? city : "Москва",
  //       cursor: masterSearchData?.connection?.pageInfo?.endCursor,
  //       sortOrder: sortOrder || undefined,
  //       sortProperty: sortProperty || undefined,
  //     },

  //     updateQuery(previousResult, { fetchMoreResult }) {
  //       const newNodes = fetchMoreResult.masterSearch.connection.nodes;
  //       setFetchMoreLoading(false);
  //       setMasterSearchData({
  //         connection: {
  //           ...fetchMoreResult.masterSearch.connection,
  //           nodes: [...masterSearchData.connection.nodes, ...newNodes],
  //         },
  //         filterDefinition: fetchMoreResult.masterSearch.filterDefinition,
  //       });
  //     },
  //   });
  // });

  const fetchMoreButton =
    // hasNextPage
    true ? (
      <>
        <MobileHidden>
          <Button
            onClick={
              () => {}
              // onFetchMore
            }
            size="medium"
            variant="darkTransparent"
            mb="55"
            disabled={fetchMoreLoading}
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
            onClick={
              () => {}
              // onFetchMore
            }
            disabled={fetchMoreLoading}
          >
            Показать еще мастеров
          </Button>
        </MobileVisible>
      </>
    ) : null

  return (
    <>
      <>
        <Title>
          {`${pluralize(totalCount, 'Найден', 'Найдено', 'Найдено')} ${
            totalCount || 0
          } ${pluralize(totalCount || 0, 'мастер', 'мастера', 'мастеров')}`}
        </Title>
        {masterData?.length > 0 && (
          <FilterSearchResults
            sortProperty={sortProperty}
            setSortProperty={setSortProperty}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            master
          />
        )}
        {me?.salons?.length > 0 ? (
          <>
            <Checkbox checked={!!resumeFilter} id="resume" />
            <Label
              onClick={() => setResumeFilter(resumeFilter ? null : true)}
              htmlFor="resume"
            >
              Найти резюме
            </Label>
          </>
        ) : null}
        <WrapperItemsMasters>
          {masterData?.map(master => (
            <Link
              href={`/${
                cyrToTranslit(master?.city.cityName) || city.citySlug
              }/master/${master?.id}`}
              key={master.id}
            >
              <LinkStyled>
                <MasterItem
                  loading={loading}
                  master={master}
                  shareLink={`https://moi.salon/${
                    cyrToTranslit(master?.city.cityName) || city.citySlug
                  }/master/${master?.id}`}
                  type="search-page"
                />
              </LinkStyled>
            </Link>
          ))}
        </WrapperItemsMasters>
        {fetchMoreButton}
      </>
    </>
  )
}

export default MastersSearchResults

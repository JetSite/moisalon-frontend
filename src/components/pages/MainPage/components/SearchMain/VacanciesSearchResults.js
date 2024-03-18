import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { SearchMainQueryContext } from '../../../../../searchContext'
import { vacanciesSearch } from '../../../../../_graphql-legacy/vacancies/vacanciesSearch'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { WrapperItems, Title, LinkStyled } from './styled'
import Button from '../../../../ui/Button'
import { pluralize } from '../../../../../utils/pluralize'
import Vacancy from '../../../../blocks/Vacancy'

const VacanciesSearchResults = () => {
  const [query] = useContext(SearchMainQueryContext)
  const [vacanciesSearchData, setVacanciesSearchData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

  const { fetchMore, refetch } = useQuery(vacanciesSearch, {
    variables: {
      query: (query && query.query) || '',
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setLoading(false)
      if (res) {
        setVacanciesSearchData(res.vacanciesSearch)
      }
    },
  })

  const vacanciesSearchResult = vacanciesSearchData?.connection.nodes || []
  const hasNextPage = vacanciesSearchData?.connection?.pageInfo?.hasNextPage
  const totalCount = vacanciesSearchData?.connection?.totalCount

  useEffect(() => {
    if (query?.query && query.query !== '') {
      setLoading(true)
      refetch({
        variables: {
          query: (query && query.query) || '',
          cursor: null,
        },
      })
    } else {
      setVacanciesSearchData(vacanciesSearch)
    }
  }, [query])

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        query: (query && query.query) || '',
        cursor: vacanciesSearchData?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.vacanciesSearch.connection.nodes
        setFetchMoreLoading(false)
        setVacanciesSearchData({
          connection: {
            ...fetchMoreResult.vacanciesSearch.connection,
            nodes: [...vacanciesSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.vacanciesSearch.filterDefinition,
        })
      },
    })
  })

  const fetchMoreButton = hasNextPage ? (
    <>
      <MobileHidden>
        <Button
          onClick={onFetchMore}
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
          onClick={onFetchMore}
          disabled={fetchMoreLoading}
        >
          Показать еще вакансии
        </Button>
      </MobileVisible>
    </>
  ) : null

  return (
    <>
      {vacanciesSearchResult?.length ? (
        <>
          <Title>
            {`${pluralize(
              totalCount,
              'Найдена',
              'Найдено',
              'Найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'вакансия',
              'вакансии',
              'вакансий',
            )}`}
          </Title>
          <WrapperItems>
            {vacanciesSearchResult?.map(vacancy => (
              <Link
                href={`/vacancies/${vacancy?.seo?.slug || vacancy.id}`}
                key={vacancy.id}
              >
                <LinkStyled>
                  <Vacancy
                    title={vacancy.title}
                    photoId={vacancy.photoId}
                    amountFrom={vacancy.amountFrom}
                    amountTo={vacancy.amountTo}
                  />
                </LinkStyled>
              </Link>
            ))}
          </WrapperItems>
          {fetchMoreButton}
        </>
      ) : null}
    </>
  )
}

export default VacanciesSearchResults

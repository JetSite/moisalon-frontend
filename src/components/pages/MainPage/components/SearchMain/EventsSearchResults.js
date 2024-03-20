import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { SearchMainQueryContext } from '../../../../../searchContext'
import { eventsSearch } from '../../../../../_graphql-legacy/events/eventsSearch'
import { MobileVisible, MobileHidden } from '../../../../../styles/common'
import { WrapperItems, Title, LinkStyled } from './styled'
import Button from '../../../../ui/Button'
import { pluralize } from '../../../../../utils/pluralize'
import Event from '../../../../blocks/Event'

const EventsSearchResults = () => {
  const [query] = useContext(SearchMainQueryContext)
  const [eventsSearchData, setEventsSearchData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)

  const { fetchMore, refetch } = useQuery(eventsSearch, {
    variables: {
      query: (query && query.query) || '',
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
    onCompleted: res => {
      setLoading(false)
      if (res) {
        setEventsSearchData(res.eventsSearch)
      }
    },
  })

  const eventsSearchResult = eventsSearchData?.connection.nodes || []
  const hasNextPage = eventsSearchData?.connection?.pageInfo?.hasNextPage
  const totalCount = eventsSearchData?.connection?.totalCount

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
      setEventsSearchData(eventsSearch)
    }
  }, [query])

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        query: (query && query.query) || '',
        cursor: eventsSearchData?.connection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.eventsSearch.connection.nodes
        setFetchMoreLoading(false)
        setEventsSearchData({
          connection: {
            ...fetchMoreResult.eventsSearch.connection,
            nodes: [...eventsSearchData.connection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.eventsSearch.filterDefinition,
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
          Показать еще события
        </Button>
      </MobileVisible>
    </>
  ) : null

  return (
    <>
      {eventsSearchResult?.length ? (
        <>
          <Title>
            {`${pluralize(
              totalCount,
              'Найдено',
              'Найдено',
              'Найдено',
            )} ${totalCount} ${pluralize(
              totalCount,
              'событие',
              'события',
              'событий',
            )}`}
          </Title>
          <WrapperItems>
            {eventsSearchResult?.map(event => (
              <Link
                href={`/events/${event?.seo?.slug || event.id}`}
                key={event.id}
              >
                <LinkStyled>
                  <Event
                    title={event.title}
                    address={event.address}
                    photoId={event.photoId}
                    dateStart={event.dateStart}
                    dateEnd={event.dateEnd}
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

export default EventsSearchResults

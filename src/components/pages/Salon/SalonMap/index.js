import { useContext, useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'react-scrollbars-custom'
import {
  YMaps,
  Map,
  ObjectManager,
  GeolocationControl,
} from 'react-yandex-maps'
import { laptopBreakpoint } from '../../../../../styles/variables'
import { useMedia } from 'use-media'
import {
  CityContext,
  EmptySearchQuery,
  SearchMainQueryContext,
} from '../../../../searchContext'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { searchAddressSalons } from '../../../../_graphql-legacy/search/searchAddressSalons'
import { MobileHidden, MobileVisible } from '../../../../styles/common'
import Button from '../../../ui/Button'
import { searchQuery } from '../../../../_graphql-legacy/search/searchQuery'
import { pluralize } from '../../../../utils/pluralize'
import FilterSearchResults from '../../../blocks/FilterSearchResults'
import { salonIdsQuery } from '../../../../_graphql-legacy/brand/salonIdsQuery'
// import SalonCardMap from "./SalonCardMap";
import { cyrToTranslit } from '../../../../utils/translit'
import SalonCard from '../../../blocks/SalonCard'

const WrapperMapBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  position: relative;
`

const MobileCards = styled.div`
  height: 100vh;
  width: 100%;
  z-index: 2000;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 20px;
  overflow: auto;
`

const WrapperBack = styled.div`
  cursor: pointer;
  padding: 20px 0;
  margin-bottom: 20px;
`

const Icon = styled.img``

const MapItems = styled.div`
  height: 600px;
  padding: 10px 20px;
  padding-right: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    height: auto;
    padding: 0;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
`

const Back = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  cursor: pointer;
  color: #f03;
  margin-left: 18px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

const WrapCard = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    margin-bottom: 0;
  }
`

const SalonCardWrapper = styled.div`
  width: 373px;
  height: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`

const ScrollWrap = styled.div`
  width: 413px;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const ButtonListMobile = styled.div`
  position: absolute;
  bottom: -55px;
  width: 100%;
`

const Title = styled.h3`
  margin-top: 64px;
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 36px;
    margin-bottom: 28px;
    text-align: left;
    font-size: 22px;
  }
`

const SalonMap = ({ me, view, setView, rent }) => {
  const [query] = useContext(SearchMainQueryContext)
  const [city] = useContext(CityContext)
  const mobileMedia = useMedia({ maxWidth: 768 })
  const [ids, setIds] = useState(null)
  const [openMobileList, setOpenMobileList] = useState(false)
  const [allAddress, setAllAddress] = useState(null)
  const [salonsList, setSalonsList] = useState(null)
  const [firstLoading, setFirstLoading] = useState(null)
  const [salonsListSlice, setSalonsListSlice] = useState(12)
  const [coords, setCoords] = useState(null)
  const [salonSearchData, setSalonSearchData] = useState({})
  const [loading, setLoading] = useState(null)
  const [activePlacemark, setActivePlacemark] = useState(null)
  const [loadingSalonsList, setLoadingSalonsList] = useState(null)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(null)
  const mapRef = useRef(null)
  const scrollRef = useRef(null)
  const objectManagerRef = useRef(null)
  const [ymaps, setYmaps] = useState(null)

  useEffect(() => {
    if (openMobileList) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'scroll'
    }
  })

  const mapData = {
    center: allAddress?.length
      ? [
          allAddress[0]?.salon?.address?.latitude,
          allAddress[0]?.salon?.address?.longitude,
        ]
      : [55.751574, 37.573856],
    zoom: 10,
    behaviors: ['default', 'scrollZoom'],
  }

  const querySearch = {
    ...EmptySearchQuery,
    query: (query && query.query) || '',
    city: null,
    lessor: rent ? true : false,
  }

  const { refetch: refetchAllSalons } = useQuery(searchAddressSalons, {
    variables: {
      input: {
        ...querySearch,
        city: null,
        latitudeMin: coords?.length && coords[0][0],
        latitudeMax: coords?.length && coords[1][0],
        longitudeMin: coords?.length && coords[0][1],
        longitudeMax: coords?.length && coords[1][1],
      },
    },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      scrollRef && scrollRef?.current && scrollRef?.current.scrollToTop()
      setLoading(false)
      setAllAddress(res?.salonSearch?.salonsConnection?.nodes)
    },
  })

  const { refetch: refetchSalonIds } = useQuery(salonIdsQuery, {
    variables: {
      ids,
    },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      scrollRef && scrollRef?.current && scrollRef?.current.scrollToTop()
      setLoadingSalonsList(false)
      setSalonsList([])
      setSalonsList(res?.salonsList)
      mobileMedia && setOpenMobileList(true)
    },
  })

  const { fetchMore, refetch } = useQuery(searchQuery, {
    variables: {
      input: {
        ...querySearch,
        city: null,
        latitudeMin: coords?.length && coords[0][0],
        latitudeMax: coords?.length && coords[1][0],
        longitudeMin: coords?.length && coords[0][1],
        longitudeMax: coords?.length && coords[1][1],
      },
    },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      scrollRef && scrollRef?.current && scrollRef?.current.scrollToTop()
      setLoading(false)
      setSalonSearchData(res?.salonSearch)
      if (!coords) {
        setAllAddress(res?.salonSearch?.salonsConnection?.nodes)
      }
    },
  })

  const { refetch: firstFetch } = useQuery(searchQuery, {
    variables: {
      input: {
        ...querySearch,
        city: null,
        latitudeMin: coords?.length && coords[0][0],
        latitudeMax: coords?.length && coords[1][0],
        longitudeMin: coords?.length && coords[0][1],
        longitudeMax: coords?.length && coords[1][1],
      },
    },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      scrollRef && scrollRef?.current && scrollRef?.current.scrollToTop()
      setLoading(false)
      setSalonSearchData(res?.salonSearch)
      setAllAddress(res?.salonSearch?.salonsConnection?.nodes)
      setFirstLoading(true)
    },
  })

  const { refetch: refetchChange } = useQuery(searchQuery, {
    variables: {
      input: {
        ...querySearch,
        city: null,
      },
    },
    notifyOnNetworkStatusChange: true,
    skip: true,
    onCompleted: res => {
      setLoading(false)
      setSalonSearchData(res?.salonSearch)
      if (res?.salonSearch?.salonsConnection?.nodes?.length) {
        setAllAddress(res?.salonSearch?.salonsConnection?.nodes)
        if (ymaps && mapRef?.current?.geoObjects?.getBounds()) {
          const map = mapRef?.current?.geoObjects?.getMap()
          const result = ymaps?.util?.bounds?.getCenterAndZoom(
            mapRef?.current?.geoObjects?.getBounds(),
            map?.container?.getSize(),
          )
          map?.setCenter(result.center, 10)
        } else {
          const map = mapRef?.current?.geoObjects?.getMap()
          map?.setCenter(
            [
              res?.salonSearch?.salonsConnection?.nodes[0].salon.address
                .latitude,
              res?.salonSearch?.salonsConnection?.nodes[0].salon.address
                .longitude,
            ],
            10,
          )
        }
      } else {
        setAllAddress([])
      }
    },
  })

  useEffect(() => {
    setLoading(true)
    if (querySearch?.query && coords?.length) {
      refetchChange({
        input: {
          ...querySearch,
          city: city,
        },
      })
      refetchAllSalons()
    } else {
      if (coords) {
        refetchChange({
          input: {
            ...querySearch,
            city: null,
            latitudeMin: coords?.length && coords[0][0],
            latitudeMax: coords?.length && coords[1][0],
            longitudeMin: coords?.length && coords[0][1],
            longitudeMax: coords?.length && coords[1][1],
          },
        })
        refetchAllSalons()
      }
    }
  }, [querySearch?.query])

  useEffect(() => {
    setLoading(true)
    if (city && coords?.length) {
      refetchChange({
        input: {
          ...querySearch,
          city: city,
        },
      })
    }
  }, [city])

  useEffect(() => {
    if (ids?.length) {
      setLoadingSalonsList(true)
      setSalonsListSlice(12)
      refetchSalonIds()
    }
  }, [ids])

  useEffect(() => {
    setLoading(true)
    firstFetch({
      input: {
        ...querySearch,
        city: city,
      },
    })
  }, [])

  useEffect(() => {
    if (coords?.length) {
      setLoading(true)
      refetch()
      refetchAllSalons()
    }
  }, [coords])

  useEffect(() => {
    if (mapRef?.current) {
      const coord = mapRef?.current?.getBounds()
      setCoords(coord)
    }
  }, [mapRef?.current])

  const salonsSearchResult =
    typeof window !== 'undefined' ? salonSearchData?.salonsConnection : []
  const slicedList = salonsSearchResult?.nodes
  const hasNextPage = salonSearchData?.salonsConnection?.pageInfo?.hasNextPage
  const totalCount =
    typeof window !== 'undefined'
      ? salonSearchData?.salonsConnection?.totalCount
      : []

  const onFetchMore = useCallback(() => {
    setFetchMoreLoading(true)
    fetchMore({
      variables: {
        cursor: salonSearchData?.salonsConnection?.pageInfo?.endCursor,
      },

      updateQuery(previousResult, { fetchMoreResult }) {
        const newNodes = fetchMoreResult.salonSearch.salonsConnection.nodes

        setFetchMoreLoading(false)
        setSalonSearchData({
          salonsConnection: {
            ...fetchMoreResult.salonSearch.salonsConnection,
            nodes: [...salonSearchData.salonsConnection.nodes, ...newNodes],
          },
          filterDefinition: fetchMoreResult.salonSearch.filterDefinition,
        })
      },
    })
  })

  const onLoad = ymaps => {
    setYmaps(ymaps)
  }

  const handleBounds = () => {
    const coord = mapRef?.current?.getBounds()
    setCoords(coord)
  }

  const fetchMoreButtonMap = hasNextPage ? (
    <>
      <MobileHidden>
        <Button
          onClick={onFetchMore}
          size="width100"
          variant="darkTransparent"
          disabled={fetchMoreLoading}
        >
          Показать еще
        </Button>
      </MobileHidden>
      <MobileVisible>
        <Button
          size="roundSmallFullWidth"
          variant="withRoundBorder"
          font="roundSmall"
          onClick={onFetchMore}
          disabled={fetchMoreLoading}
        >
          Показать еще салоны
        </Button>
      </MobileVisible>
    </>
  ) : null

  const fetchMoreButtonMapSalonsList =
    salonsList?.length > salonsListSlice ? (
      <>
        <MobileHidden>
          <Button
            onClick={() => setSalonsListSlice(salonsListSlice + 12)}
            size="width100"
            variant="darkTransparent"
            disabled={fetchMoreLoading}
          >
            Показать еще
          </Button>
        </MobileHidden>
        <MobileVisible>
          <Button
            size="roundSmallFullWidth"
            variant="withRoundBorder"
            font="roundSmall"
            onClick={() => setSalonsListSlice(salonsListSlice + 12)}
            disabled={fetchMoreLoading}
          >
            Показать еще салоны
          </Button>
        </MobileVisible>
      </>
    ) : null

  return (
    <>
      <Title>
        {`${pluralize(totalCount || 0, 'Найден', 'Найдено', 'Найдено')} ${
          totalCount || 0
        } ${pluralize(totalCount || 0, 'салон', 'салона', 'салонов')}`}
      </Title>
      <FilterSearchResults salon view={view} setView={setView} />
      <WrapperMapBlock>
        {firstLoading ? (
          <YMaps
            query={{
              load: 'util.bounds',
              apikey: '0b72730c-b2cf-466c-8b8e-35cc7510dc52',
            }}
          >
            <Map
              onLoad={onLoad}
              instanceRef={mapRef}
              defaultState={mapData}
              width={mobileMedia ? '100%' : 'calc(100% - 410px)'}
              height={mobileMedia ? 400 : 600}
              onClick={() => {
                setSalonsList([])
                setSalonsListSlice(12)
                objectManagerRef?.current?.objects?.setObjectOptions(
                  activePlacemark,
                  {
                    iconImageHref: '/placemark.svg',
                  },
                )
                setActivePlacemark([])
              }}
              onBoundsChange={() => handleBounds()}
            >
              <GeolocationControl options={{ float: 'left' }} />
              {allAddress?.length ? (
                <ObjectManager
                  instanceRef={objectManagerRef}
                  options={{
                    clusterIconLayout: 'default#pieChart',
                    clusterize: true,
                    clusterDisableClickZoom: true,
                    gridSize: 32,
                  }}
                  onClick={e => {
                    const objectId = e.get('objectId')
                    if (
                      e.originalEvent.currentTarget.clusters.getById(objectId)
                    ) {
                      setIds(
                        e.originalEvent.currentTarget.clusters
                          .getById(objectId)
                          ?.features?.map(item => item.options.id),
                      )
                    }
                    if (
                      e.originalEvent.currentTarget.objects.getById(objectId)
                    ) {
                      e.originalEvent.currentTarget.objects.setObjectOptions(
                        objectId,
                        {
                          iconImageHref: '/placemark-active.svg',
                        },
                      )
                      if (activePlacemark !== objectId) {
                        e.originalEvent.currentTarget.objects.setObjectOptions(
                          activePlacemark,
                          {
                            iconImageHref: '/placemark.svg',
                          },
                        )
                      }
                      setActivePlacemark(objectId)
                      setIds([
                        e.originalEvent.currentTarget.objects.getById(objectId)
                          ?.options.id,
                      ])
                    }
                  }}
                  modules={['objectManager.addon.objectsHint']}
                  clusters={{
                    preset: 'islands#redClusterIcons',
                  }}
                  features={{
                    type: 'FeatureCollection',
                    features: allAddress?.map((coordinate, i) => {
                      return {
                        id: coordinate?.salon?.id,
                        type: 'Feature',
                        geometry: {
                          type: 'Point',
                          coordinates: [
                            coordinate?.salon?.address?.latitude,
                            coordinate?.salon?.address?.longitude,
                          ],
                        },
                        options: {
                          id: coordinate.salon.id,
                          iconLayout: 'default#image',
                          iconImageHref: '/placemark.svg',
                          iconImageSize: [30, 42],
                          iconImageOffset: [-3, -42],
                        },
                      }
                    }),
                  }}
                />
              ) : null}
            </Map>
            {mobileMedia && allAddress?.length && ymaps ? (
              <ButtonListMobile>
                <Button
                  size="width100"
                  variant="red"
                  onClick={() => setOpenMobileList(true)}
                >
                  Показать все
                </Button>
              </ButtonListMobile>
            ) : null}
          </YMaps>
        ) : null}
        {ymaps &&
        mapRef?.current &&
        slicedList?.length &&
        !salonsList?.length ? (
          <ScrollWrap>
            <Scrollbar
              ref={scrollRef}
              style={{ width: '100%', height: 600 }}
              minimalThumbYSize={12}
              maximalThumbYSize={12}
              thumbYProps={{
                renderer: props => {
                  const { elementRef, ...restProps } = props
                  return (
                    <span
                      {...restProps}
                      ref={elementRef}
                      className="chooseThumb"
                    />
                  )
                },
              }}
              trackYProps={{
                renderer: props => {
                  const { elementRef, ...restProps } = props
                  return (
                    <span
                      {...restProps}
                      ref={elementRef}
                      className="chooseScroll"
                    />
                  )
                },
              }}
            >
              <MapItems>
                {slicedList?.map(salon => (
                  <WrapCard key={salon?.salon?.id}>
                    <Link
                      href={
                        rent
                          ? `/${cyrToTranslit(
                              salon?.salon?.address?.city || city,
                            )}/rent/${salon.salon?.seo?.slug || salon.salon.id}`
                          : `/${cyrToTranslit(
                              salon?.salon?.address?.city || city,
                            )}/salon/${
                              salon.salon?.seo?.slug || salon.salon.id
                            }`
                      }
                      key={salon.salon.id}
                    >
                      <SalonCardWrapper>
                        <SalonCard
                          seatCount={salon.seatCount}
                          rent={rent}
                          loading={loading}
                          item={salon.salon}
                          shareLink={`https://moi.salon/${cyrToTranslit(
                            salon?.salon?.address?.city || city,
                          )}/salon/${salon.salon?.seo?.slug || salon.salon.id}`}
                        />
                      </SalonCardWrapper>
                    </Link>
                  </WrapCard>
                ))}
                <div style={{ height: 5, width: '100%' }} />
                {fetchMoreButtonMap}
              </MapItems>
            </Scrollbar>
          </ScrollWrap>
        ) : null}
        {ymaps && mapRef?.current && salonsList?.length ? (
          <ScrollWrap>
            <Scrollbar
              style={{ width: '100%', height: 600 }}
              minimalThumbYSize={12}
              maximalThumbYSize={12}
              thumbYProps={{
                renderer: props => {
                  const { elementRef, ...restProps } = props
                  return (
                    <span
                      {...restProps}
                      ref={elementRef}
                      className="chooseThumb"
                    />
                  )
                },
              }}
              trackYProps={{
                renderer: props => {
                  const { elementRef, ...restProps } = props
                  return (
                    <span
                      {...restProps}
                      ref={elementRef}
                      className="chooseScroll"
                    />
                  )
                },
              }}
            >
              <Back
                onClick={() => {
                  setSalonsList([])
                  setSalonsListSlice(12)
                  objectManagerRef?.current?.objects?.setObjectOptions(
                    activePlacemark,
                    {
                      iconImageHref: '/placemark.svg',
                    },
                  )
                  setActivePlacemark([])
                }}
              >
                Назад
              </Back>
              <MapItems>
                {salonsList?.slice(0, salonsListSlice)?.map(salon => (
                  <WrapCard>
                    <Link
                      href={
                        rent
                          ? `/${cyrToTranslit(
                              salon?.address?.city || city,
                            )}/rent/${salon?.seo?.slug || salon.id}`
                          : `/${cyrToTranslit(
                              salon?.address?.city || city,
                            )}/salon/${salon?.seo?.slug || salon.id}`
                      }
                      key={salon.id}
                    >
                      <SalonCardWrapper>
                        <SalonCard
                          seatCount={salon.seatCount}
                          rent={rent}
                          loading={loading}
                          item={salon}
                          shareLink={`https://moi.salon/${cyrToTranslit(
                            salon?.address?.city || city,
                          )}/salon/${salon?.seo?.slug || salon.id}`}
                        />
                      </SalonCardWrapper>
                    </Link>
                  </WrapCard>
                ))}
                <div style={{ height: 5, width: '100%' }} />
                {fetchMoreButtonMapSalonsList}
              </MapItems>
            </Scrollbar>
          </ScrollWrap>
        ) : null}
        {openMobileList && mobileMedia ? (
          <MobileCards>
            <WrapperBack
              onClick={() => {
                setOpenMobileList(false)
                setSalonsList([])
                setSalonsListSlice(12)
              }}
            >
              <Icon alt="back" src="/arrow-back.svg" />
            </WrapperBack>
            {ymaps &&
            mapRef?.current &&
            slicedList?.length &&
            !salonsList?.length ? (
              <>
                <MapItems>
                  {slicedList?.map(salon => (
                    <WrapCard>
                      <Link
                        href={
                          rent
                            ? `/${cyrToTranslit(
                                salon?.salon?.address?.city || city,
                              )}/rent/${
                                salon.salon?.seo?.slug || salon.salon.id
                              }`
                            : `/${cyrToTranslit(
                                salon?.salon?.address?.city || city,
                              )}/salon/${
                                salon.salon?.seo?.slug || salon.salon.id
                              }`
                        }
                        key={salon.salon.id}
                      >
                        <SalonCardWrapper>
                          <SalonCard
                            seatCount={salon.seatCount}
                            rent={rent}
                            loading={loading}
                            item={salon.salon}
                            shareLink={`https://moi.salon/${cyrToTranslit(
                              salon?.salon?.address?.city || city,
                            )}/salon/${
                              salon.salon?.seo?.slug || salon.salon.id
                            }`}
                          />
                        </SalonCardWrapper>
                      </Link>
                    </WrapCard>
                  ))}
                  {fetchMoreButtonMap}
                </MapItems>
              </>
            ) : null}
            {ymaps && mapRef?.current && salonsList?.length ? (
              <>
                <MapItems>
                  {salonsList?.slice(0, salonsListSlice)?.map(salon => (
                    <WrapCard>
                      <Link
                        href={
                          rent
                            ? `/${cyrToTranslit(
                                salon?.address?.city || city,
                              )}/rent/${salon?.seo?.slug || salon.id}`
                            : `/${cyrToTranslit(
                                salon?.address?.city || city,
                              )}/salon/${salon?.seo?.slug || salon.id}`
                        }
                        key={salon.id}
                      >
                        <SalonCardWrapper>
                          <SalonCard
                            seatCount={salon.seatCount}
                            rent={rent}
                            loading={loading}
                            item={salon}
                            shareLink={`https://moi.salon/${cyrToTranslit(
                              salon?.address?.city || city,
                            )}/salon/${salon?.seo?.slug || salon.id}`}
                          />
                        </SalonCardWrapper>
                      </Link>
                    </WrapCard>
                  ))}
                  <div style={{ height: 5, width: '100%' }} />
                  {fetchMoreButtonMapSalonsList}
                </MapItems>
              </>
            ) : null}
          </MobileCards>
        ) : null}
      </WrapperMapBlock>
    </>
  )
}

export default SalonMap

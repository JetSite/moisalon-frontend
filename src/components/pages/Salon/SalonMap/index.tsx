import { useRef, useState, useEffect, useCallback, FC } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'react-scrollbars-custom'
import {
  laptopBreakpoint,
  mobileBreakpoint,
} from '../../../../styles/variables'
import { useMedia } from 'use-media'
import Link from 'next/link'
import { ApolloQueryResult, useLazyQuery, useQuery } from '@apollo/client'
import { pluralize } from '../../../../utils/pluralize'
import FilterSearchResults from '../../../blocks/FilterSearchResults'
import SalonCard from '../../../blocks/SalonCard'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import {
  GeolocationControl,
  Map,
  ObjectManager,
  Placemark,
  YMaps,
} from '@pbe/react-yandex-maps'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon, ISalonPage } from 'src/types/salon'
import { getRating } from 'src/utils/newUtils/getRating'
import { getSalonsByIds } from 'src/api/graphql/salon/queries/getSalonsByIds'
import { IView } from '../AllSalons'
import { IID, ISetState } from 'src/types/common'
import { ICity } from 'src/types'
import { MobileHidden, MobileVisible } from 'src/styles/common'
import Button from 'src/components/ui/Button'
import { getSalonsThroughCity } from 'src/api/graphql/salon/queries/getSalonsThroughCity'

const WrapperMapBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  position: relative;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
  }
`

const MobileCards = styled.div`
  width: 100%;
  background: #fff;
  padding: 0 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  overflow: scroll;
`

const WrapperBack = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f03;
  cursor: pointer;
  padding: 20px 0;
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

  @media (max-width: ${mobileBreakpoint}) {
    display: flex;
    flex-direction: column;
    align-items: center;
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

interface ISalonMapProps {
  view: IView
  setView?: ISetState<IView>
  rent: boolean
  salonData: ISalon[]
  pagination: any
  cityData: ICity
}

const SalonMap: FC<ISalonMapProps> = ({
  view,
  setView,
  rent,
  salonData,
  pagination,
  cityData,
}) => {
  const { city } = useAuthStore(getStoreData)
  const mobileMedia = useMedia({ maxWidth: 992 }) // 768
  const [salonsList, setSalonsList] = useState<ISalon[]>(salonData)
  const [filteredSalons, setFilteredSalons] = useState<ISalon[]>([])
  const totalCount = pagination?.total || 0
  const [page, setPage] = useState<number>(2)
  const [hasNextPage, setHasNextPage] = useState<boolean>(
    pagination && pagination.pageCount + 1 !== page,
  )
  const [ids, setIds] = useState<IID[] | null>(null)
  const [activePlacemark, setActivePlacemark] = useState<any>(null)
  const mapRef = useRef<any>(null)
  const scrollRef = useRef<any>(null)
  const objectManagerRef = useRef<any>(null)

  const [refetch, { loading }] = useLazyQuery(getSalonsThroughCity, {
    notifyOnNetworkStatusChange: true,
  })

  const [refetchByID, { loading: loadingByID }] = useLazyQuery(getSalonsByIds, {
    notifyOnNetworkStatusChange: true,
  })

  const [viewCount, setViewCount] = useState<number>(salonsList.length)

  useEffect(() => {
    setViewCount(salonsList.length)
  }, [salonsList])

  const normaliseSalons = useCallback(
    (res: ApolloQueryResult<any>) => {
      const salons = flattenStrapiResponse(res.data.salons) as ISalon[]
      console.log(salons)

      if (res?.data?.salons?.data) {
        const prepareData: ISalon[] = salons.map(salon => {
          const ratingRes = flattenStrapiResponse(salon.ratings)
          const { rating, ratingCount } = getRating(ratingRes)
          return {
            ...salon,
            reviewsCount: salon.reviews.length,
            rating,
            ratingCount,
          }
        })
        setHasNextPage(res?.data?.salons?.meta?.pagination?.pageCount > page)
        return prepareData
      }
    },
    [page],
  )

  const onFetchMore = async () => {
    const res = await refetch({
      variables: { slug: cityData?.slug, pageSize: 9, page },
    })
    const newSalons = normaliseSalons(res)
    if (newSalons) {
      setSalonsList(prev => [...prev, ...newSalons])
      setPage(page + 1)
    }
  }

  const findSalonCoordinate = salonsList.find(e => e.latitude && e.longitude)

  const mapData = {
    center:
      cityData?.latitude && cityData?.longitude
        ? [cityData.latitude, cityData.longitude]
        : findSalonCoordinate
        ? [findSalonCoordinate.latitude, findSalonCoordinate.longitude]
        : [55.751574, 37.573856],
    zoom: 10,
    behaviors: ['default', 'scrollZoom'],
  }

  const refecthSalons = useCallback(async () => {
    setPage(2)
    const res = ids?.length
      ? await refetchByID({ variables: { salonIds: ids, page: 1 } })
      : await refetch({
          variables: { slug: cityData?.slug, pageSize: 9, page: 1 },
        })
    const newSalons = normaliseSalons(res)
    if (newSalons) {
      setFilteredSalons(newSalons)
    }
  }, [ids])

  useEffect(() => {
    if (ids?.length) {
      refecthSalons()
    }
  }, [ids])

  const fetchMoreButtonMap = hasNextPage ? (
    <div style={{ position: 'relative' }}>
      <MobileHidden>
        <Button
          onClick={onFetchMore}
          size="width100"
          variant="darkTransparent"
          disabled={loading || loadingByID}
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
          disabled={loading || loadingByID}
        >
          Показать еще салоны
        </Button>
      </MobileVisible>
    </div>
  ) : null

  return (
    <>
      <Title>
        {`${pluralize(totalCount || 0, 'Найден', 'Найдено', 'Найдено')} ${
          totalCount || 0
        } ${pluralize(totalCount || 0, 'салон', 'салона', 'салонов')}`}
      </Title>

      <Title>
        {pluralize(viewCount, 'Показан', 'Показаны', 'Показано')}
        &nbsp;
        {viewCount}
        &nbsp; из &nbsp;
        {totalCount}
        &nbsp;
        {pluralize(totalCount, 'салон', 'салона', 'салонов')}
      </Title>
      <FilterSearchResults
        salon
        view={view}
        setView={setView}
        sortOrder=":asc"
        sortProperty="по рейтингу"
        handleFilter={() => {}}
      />
      <WrapperMapBlock>
        <YMaps query={{ load: 'package.full' }}>
          <Map
            instanceRef={mapRef}
            defaultState={{ ...mapData }}
            width={mobileMedia ? '100%' : 'calc(100% - 410px)'}
            height={mobileMedia ? 400 : 600}
            onClick={() => {
              objectManagerRef?.current?.objects?.setObjectOptions(
                activePlacemark,
                {
                  iconImageHref: '/placemark.svg',
                },
              )
              setActivePlacemark([])
            }}
          >
            <GeolocationControl options={{ float: 'left' }} />
            {salonsList?.length ? (
              <ObjectManager
                instanceRef={objectManagerRef}
                options={{
                  clusterIconLayout: 'default#pieChart',
                  clusterize: true,
                  clusterDisableClickZoom: true,
                  gridSize: 32,
                }}
                onClick={(e: any) => {
                  const objectId = e.get('objectId')
                  if (
                    e.originalEvent.currentTarget.clusters.getById(objectId)
                  ) {
                    setIds(
                      e.originalEvent.currentTarget.clusters
                        .getById(objectId)
                        ?.features?.map((item: any) => item.options.id),
                    )
                  }
                  if (e.originalEvent.currentTarget.objects.getById(objectId)) {
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
                  features: salonsList?.map((salon, i) => {
                    return {
                      id: salon?.id,
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [salon?.latitude, salon?.longitude],
                      },
                      options: {
                        id: salon?.id,
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
        </YMaps>
        {!!filteredSalons.length ? (
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
              <Back
                onClick={() => {
                  setFilteredSalons([])
                }}
              >
                Назад
              </Back>
              <MapItems>
                {filteredSalons?.map(salon => (
                  <WrapCard key={salon?.id}>
                    <Link
                      href={
                        rent
                          ? `/${city.slug}/rent/${salon.id}`
                          : `/${city.slug}/salon/${salon.id}`
                      }
                      key={salon.id}
                    >
                      <SalonCardWrapper>
                        <SalonCard
                          seatCount={1}
                          rent={rent}
                          loading={loading || loadingByID}
                          item={salon}
                          shareLink={`/${city.slug}/salon/${salon.id}`}
                        />
                      </SalonCardWrapper>
                    </Link>
                  </WrapCard>
                ))}
                {fetchMoreButtonMap}
              </MapItems>
            </Scrollbar>
          </ScrollWrap>
        ) : null}
        {salonsList && !!salonsList.length && !filteredSalons.length ? (
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
                {salonsList?.map(salon => (
                  <WrapCard key={salon?.id}>
                    <Link
                      href={
                        rent
                          ? `/${city.slug}/rent/${salon.id}`
                          : `/${city.slug}/salon/${salon.id}`
                      }
                      key={salon.id}
                    >
                      <SalonCardWrapper>
                        <SalonCard
                          seatCount={1}
                          rent={rent}
                          loading={loading || loadingByID}
                          item={salon}
                          shareLink={`/${city.slug}/salon/${salon.id}`}
                        />
                      </SalonCardWrapper>
                    </Link>
                  </WrapCard>
                ))}
                {fetchMoreButtonMap}
              </MapItems>
            </Scrollbar>
          </ScrollWrap>
        ) : null}
        {mobileMedia ? (
          <MobileCards>
            {!!filteredSalons.length ? (
              <WrapperBack
                onClick={() => {
                  setFilteredSalons([])
                }}
              >
                Назад
              </WrapperBack>
            ) : null}
            {true ? (
              <>
                <MapItems>
                  {filteredSalons?.map(salon => (
                    <WrapCard>
                      <Link
                        href={
                          rent
                            ? `/${city.slug}/rent/${salon.id}`
                            : `/${city.slug}/salon/${salon.id}`
                        }
                        key={salon.id}
                      >
                        <SalonCardWrapper>
                          <SalonCard
                            seatCount={1}
                            rent={rent}
                            loading={loading || loadingByID}
                            item={salon}
                            shareLink={`/${city.slug}/salon/${salon.id}`}
                          />
                        </SalonCardWrapper>
                      </Link>
                    </WrapCard>
                  ))}
                  {fetchMoreButtonMap}
                </MapItems>
              </>
            ) : null}
            {salonsList && !!salonsList?.length && !filteredSalons.length ? (
              <>
                <MapItems>
                  {salonsList?.map(salon => (
                    <WrapCard>
                      <Link
                        href={
                          rent
                            ? `/${city.slug}/rent/${salon.id}`
                            : `/${city.slug}/salon/${salon.id}`
                        }
                        key={salon.id}
                      >
                        <SalonCardWrapper>
                          <SalonCard
                            seatCount={1}
                            rent={rent}
                            loading={loading || loadingByID}
                            item={salon}
                            shareLink={`/${city.slug}/salon/${salon.id}`}
                          />
                        </SalonCardWrapper>
                      </Link>
                    </WrapCard>
                  ))}
                  {fetchMoreButtonMap}
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

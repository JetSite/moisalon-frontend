import { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../styles/common'
import { Wrapper, Title, FilterWrap, TextFilter } from './styles'
import { useRouter } from 'next/router'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import ServicesFilter from './components/ServicesFilter'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import ServicesList from './components/ServicesList'
import Button from 'src/components/ui/Button'
import { useLazyQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getMastersByService } from '@/api/graphql/master/queries/getMastersByService'
import { getSalonsByService } from '@/api/graphql/salon/queries/getSalonsByService'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  mastersData: IMaster[]
  salonsData: ISalon[]
  serviceId?: string | null
  hasMoreMasters?: boolean
  hasMoreSalons?: boolean
}

interface MetaData {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

interface QueryResponse<T> {
  data: {
    [key: string]: {
      data: T[]
      meta: MetaData
    }
  }
}

const MASTERS_PER_PAGE = 10
const SALONS_PER_PAGE = 6

const ServicesPage: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData = [],
  salonsData = [],
  serviceId,
}) => {
  const [view, setView] = useState('all')
  const [masters, setMasters] = useState<IMaster[]>([])
  const [salons, setSalons] = useState<ISalon[]>([])
  const [clickedService, setClickedService] =
    useState<IServiceInCategory | null>(null)
  const router = useRouter()

  const [mastersPage, setMastersPage] = useState(1)
  const [salonsPage, setSalonsPage] = useState(1)
  const [isMastersLoading, setIsMastersLoading] = useState(false)
  const [isSalonsLoading, setIsSalonsLoading] = useState(false)
  const [mastersMeta, setMastersMeta] = useState<MetaData['pagination'] | null>(
    null,
  )
  const [salonsMeta, setSalonsMeta] = useState<MetaData['pagination'] | null>(
    null,
  )

  const resetResultData = () => {
    setMasters([])
    setSalons([])
    setMastersMeta(null)
    setSalonsMeta(null)
    setMastersPage(1)
    setSalonsPage(1)
  }

  const [fetchMasters] = useLazyQuery(getMastersByService, {
    onCompleted(data: QueryResponse<IMaster>['data']) {
      const mastersData = data?.['masters'] || {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      }
      const fetchedMasters = flattenStrapiResponse(mastersData.data) || []
      const meta = mastersData.meta?.pagination

      setMasters(fetchedMasters)
      setMastersMeta(meta)
      setIsMastersLoading(false)
    },
    onError(error) {
      console.error('Error loading masters:', error)
      setIsMastersLoading(false)
      setMasters([])
      setMastersMeta(null)
    },
  })

  const [fetchSalons] = useLazyQuery(getSalonsByService, {
    onCompleted(data: QueryResponse<ISalon>['data']) {
      const salonsData = data?.['salons'] || {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      }
      const fetchedSalons = flattenStrapiResponse(salonsData.data) || []
      const meta = salonsData.meta?.pagination

      setSalons(fetchedSalons)
      setSalonsMeta(meta)
      setIsSalonsLoading(false)
    },
    onError(error) {
      console.error('Error loading salons:', error)
      setIsSalonsLoading(false)
      setSalons([])
      setSalonsMeta(null)
    },
  })

  const [fetchMoreMasters] = useLazyQuery(getMastersByService, {
    onCompleted(data: QueryResponse<IMaster>['data']) {
      const mastersData = data?.['masters'] || {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      }
      const newMasters = flattenStrapiResponse(mastersData.data) || []
      const meta = mastersData.meta?.pagination

      if (newMasters && newMasters.length > 0) {
        setMasters(prev => [...prev, ...newMasters])
        setMastersMeta(meta)
      }
      setIsMastersLoading(false)
    },
    onError(error) {
      console.error('Error loading more masters:', error)
      setIsMastersLoading(false)
    },
  })

  const [fetchMoreSalons] = useLazyQuery(getSalonsByService, {
    onCompleted(data: QueryResponse<ISalon>['data']) {
      const salonsData = data?.['salons'] || {
        data: [],
        meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
      }
      const newSalons = flattenStrapiResponse(salonsData.data) || []
      const meta = salonsData.meta?.pagination

      if (newSalons && newSalons.length > 0) {
        setSalons(prev => [...prev, ...newSalons])
        setSalonsMeta(meta)
      }
      setIsSalonsLoading(false)
    },
    onError(error) {
      console.error('Error loading more salons:', error)
      setIsSalonsLoading(false)
    },
  })

  useEffect(() => {
    if (serviceId) {
      const service = servicesWithCategories
        .flatMap(category => category.services)
        .find(service => service.id === serviceId)

      if (service) {
        setClickedService(service)
      }
      loadInitialData(serviceId)
    } else {
      resetResultData()
    }
  }, [serviceId])

  const loadInitialData = (serviceIdToFetch: string) => {
    setIsMastersLoading(true)
    setIsSalonsLoading(true)
    setMastersPage(1)
    setSalonsPage(1)

    fetchMasters({
      variables: {
        serviceId: serviceIdToFetch || '',
        page: 1,
        pageSize: MASTERS_PER_PAGE,
      },
    })

    fetchSalons({
      variables: {
        serviceId: serviceIdToFetch || '',
        page: 1,
        pageSize: SALONS_PER_PAGE,
      },
    })
  }

  useEffect(() => {
    if (mastersData && mastersData.length > 0) {
      setMasters(mastersData)
      setMastersPage(1)
    }
  }, [mastersData])

  useEffect(() => {
    if (salonsData && salonsData.length > 0) {
      setSalons(salonsData)
      setSalonsPage(1)
    }
  }, [salonsData])

  useEffect(() => {
    if (clickedService) {
      router.replace({
        query: {
          ...router.query,
          category:
            view !== 'all' ? [view, clickedService?.id] : clickedService?.id,
        },
      })
      if (clickedService.id !== serviceId) {
        loadInitialData(clickedService.id)
      }
    } else {
      router.replace({
        query: { ...router.query, category: undefined },
      })
      resetResultData()
    }
  }, [clickedService])

  useEffect(() => {
    if (view === 'master') {
      router.replace({
        query: {
          ...router.query,
          category: ['master', clickedService?.id] as string[],
        },
      })
    }
    if (view === 'salon') {
      router.replace({
        query: {
          ...router.query,
          category: ['salon', clickedService?.id] as string[],
        },
      })
    }
    if (view === 'all') {
      router.replace({
        query: { ...router.query, category: clickedService?.id },
      })
    }

    setMastersPage(1)
    setSalonsPage(1)
  }, [view])

  const popularServiceHandler = (service: IServiceInCategory) => {
    setClickedService(service)
  }

  const loadMoreMasters = () => {
    if (
      isMastersLoading ||
      !mastersMeta ||
      mastersMeta.page >= mastersMeta.pageCount
    )
      return

    setIsMastersLoading(true)
    const nextPage = mastersPage + 1
    setMastersPage(nextPage)

    fetchMoreMasters({
      variables: {
        serviceId: serviceId || clickedService?.id || '',
        page: nextPage,
        pageSize: MASTERS_PER_PAGE,
      },
    })
  }

  const loadMoreSalons = () => {
    if (
      isSalonsLoading ||
      !salonsMeta ||
      salonsMeta.page >= salonsMeta.pageCount
    )
      return

    setIsSalonsLoading(true)
    const nextPage = salonsPage + 1
    setSalonsPage(nextPage)

    fetchMoreSalons({
      variables: {
        serviceId: serviceId || clickedService?.id || '',
        page: nextPage,
        pageSize: SALONS_PER_PAGE,
      },
    })
  }

  const hasMoreMastersToLoad = mastersMeta
    ? mastersMeta.page < mastersMeta.pageCount
    : false
  const hasMoreSalonsToLoad = salonsMeta
    ? salonsMeta.page < salonsMeta.pageCount
    : false

  return (
    <MainContainer>
      <Wrapper>
        <ServicesFilter
          servicesCategoriesList={servicesWithCategories}
          clickedService={clickedService}
          setClickedService={setClickedService}
          masters={masters}
          setMasters={setMasters}
          salons={salons}
          setSalons={setSalons}
          resetMeta={() => {
            setMastersMeta(null)
            setSalonsMeta(null)
          }}
        />
        {clickedService?.id ? (
          <FilterWrap active={view}>
            <TextFilter active={view === 'all'} onClick={() => setView('all')}>
              Все
            </TextFilter>
            <TextFilter
              active={view === 'master'}
              onClick={() => setView('master')}
            >
              Мастера {mastersMeta?.total ? `(${mastersMeta.total})` : ''}
            </TextFilter>
            <TextFilter
              active={view === 'salon'}
              onClick={() => setView('salon')}
            >
              Салоны {salonsMeta?.total ? `(${salonsMeta.total})` : ''}
            </TextFilter>
          </FilterWrap>
        ) : null}
        {!masters.length && !salons.length && !clickedService?.id ? (
          <>
            <Title>Популярные услуги</Title>
            <ServicesList
              setClickedService={setClickedService}
              popularServiceHandler={(id: string) => {
                const service = servicesWithCategories
                  .flatMap(category => category.services)
                  .find(service => service.id === id)

                if (service) {
                  popularServiceHandler(service)
                }
              }}
            />
          </>
        ) : null}
        {masters &&
        masters.length > 0 &&
        (view === 'master' || view === 'all') ? (
          <>
            <ServicesList masters={masters} totalItems={mastersMeta?.total} />
            {hasMoreMastersToLoad && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                }}
              >
                <Button
                  onClick={loadMoreMasters}
                  disabled={isMastersLoading}
                  variant="dark"
                >
                  {isMastersLoading ? 'Загрузка...' : 'Загрузить еще'}
                </Button>
              </div>
            )}
          </>
        ) : null}
        {salons && salons.length > 0 && (view === 'salon' || view === 'all') ? (
          <>
            <ServicesList salons={salons} totalItems={salonsMeta?.total} />
            {hasMoreSalonsToLoad && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '20px 0',
                }}
              >
                <Button
                  onClick={loadMoreSalons}
                  disabled={isSalonsLoading}
                  variant="dark"
                >
                  {isSalonsLoading ? 'Загрузка...' : 'Загрузить еще'}
                </Button>
              </div>
            )}
          </>
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default ServicesPage

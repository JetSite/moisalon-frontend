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

const MASTERS_PER_PAGE = 10
const SALONS_PER_PAGE = 6

const ServicesPage: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData,
  salonsData,
  serviceId,
  hasMoreMasters = false,
  hasMoreSalons = false,
}) => {
  const [view, setView] = useState('all')
  const [masters, setMasters] = useState<IMaster[]>([])
  const [salons, setSalons] = useState<ISalon[]>([])
  const [clickedService, setClickedService] =
    useState<IServiceInCategory | null>(null)
  const router = useRouter()

  // Pagination states
  const [mastersPage, setMastersPage] = useState(1)
  const [salonsPage, setSalonsPage] = useState(1)
  const [isMastersLoading, setIsMastersLoading] = useState(false)
  const [isSalonsLoading, setIsSalonsLoading] = useState(false)
  const [noMoreMasters, setNoMoreMasters] = useState(!hasMoreMasters)
  const [noMoreSalons, setNoMoreSalons] = useState(!hasMoreSalons)

  // GraphQL queries for loading more
  const [fetchMoreMasters] = useLazyQuery(getMastersByService, {
    onCompleted(data: any) {
      console.log('data', data)
      const newMasters = flattenStrapiResponse(data?.masters) || []

      if (newMasters && newMasters.length > 0) {
        setMasters(prev => [...prev, ...newMasters.slice(0, MASTERS_PER_PAGE)])
        setNoMoreMasters(newMasters.length <= MASTERS_PER_PAGE)
      } else {
        setNoMoreMasters(true)
      }
      setIsMastersLoading(false)
    },
    onError(error: any) {
      console.error('Error loading more masters:', error)
      setIsMastersLoading(false)
    },
  })

  const [fetchMoreSalons] = useLazyQuery(getSalonsByService, {
    onCompleted(data: any) {
      const newSalons = flattenStrapiResponse(data?.salons) || []
      if (newSalons && newSalons.length > 0) {
        setSalons(prev => [...prev, ...newSalons.slice(0, SALONS_PER_PAGE)])
        setNoMoreSalons(newSalons.length <= SALONS_PER_PAGE)
      } else {
        setNoMoreSalons(true)
      }
      setIsSalonsLoading(false)
    },
    onError(error: any) {
      console.error('Error loading more salons:', error)
      setIsSalonsLoading(false)
    },
  })

  useEffect(() => {
    if (mastersData) {
      setMasters(mastersData)
      setMastersPage(1)
      setNoMoreMasters(!hasMoreMasters)
    }
  }, [mastersData, hasMoreMasters])

  useEffect(() => {
    if (salonsData) {
      setSalons(salonsData)
      setSalonsPage(1)
      setNoMoreSalons(!hasMoreSalons)
    }
  }, [salonsData, hasMoreSalons])

  useEffect(() => {
    if (clickedService) {
      router.replace({
        query: {
          ...router.query,
          category:
            view !== 'all' ? [view, clickedService?.id] : clickedService?.id,
        },
      })

      // Reset pagination when service changes
      setMastersPage(1)
      setSalonsPage(1)
    } else {
      router.replace({
        query: { ...router.query, category: undefined },
      })
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

    // Reset pagination when view changes
    setMastersPage(1)
    setSalonsPage(1)
  }, [view])

  const popularServiceHandler = (service: IServiceInCategory) => {
    setClickedService(service)
  }

  const loadMoreMasters = () => {
    if (isMastersLoading || noMoreMasters) return

    setIsMastersLoading(true)
    const nextPage = mastersPage + 1
    setMastersPage(nextPage)

    fetchMoreMasters({
      variables: {
        serviceId: serviceId || clickedService?.id || '',
        page: nextPage,
        pageSize: MASTERS_PER_PAGE + 1,
      },
    })
  }

  const loadMoreSalons = () => {
    if (isSalonsLoading || noMoreSalons) return

    setIsSalonsLoading(true)
    const nextPage = salonsPage + 1
    setSalonsPage(nextPage)

    fetchMoreSalons({
      variables: {
        serviceId: serviceId || clickedService?.id || '',
        page: nextPage,
        pageSize: SALONS_PER_PAGE + 1,
      },
    })
  }

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
        />
        {clickedService?.id && (mastersData || salonsData) ? (
          <FilterWrap active={view}>
            <TextFilter active={view === 'all'} onClick={() => setView('all')}>
              Все
            </TextFilter>
            <TextFilter
              active={view === 'master'}
              onClick={() => setView('master')}
            >
              Мастера
            </TextFilter>
            <TextFilter
              active={view === 'salon'}
              onClick={() => setView('salon')}
            >
              Салоны
            </TextFilter>
          </FilterWrap>
        ) : null}
        {!masters.length && !salons.length && !clickedService?.id ? (
          <>
            <Title>Популярные услуги</Title>
            <ServicesList
              setClickedService={setClickedService}
              popularServiceHandler={(id: string) => {
                // Find the service by ID and pass it to the handler
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
            <ServicesList masters={masters} />
            {!noMoreMasters && (
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
            <ServicesList salons={salons} />
            {!noMoreSalons && (
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

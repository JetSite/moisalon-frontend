import { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../styles/common'
import { Wrapper, Title, FilterWrap, TextFilter } from './styles'
import { useRouter } from 'next/router'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import ServicesFilter from './components/ServicesFilter'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import ServicesList from './components/ServicesList'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  mastersData: IMaster[]
  salonsData: ISalon[]
}

const ServicesPage: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData,
  salonsData,
}) => {
  const [view, setView] = useState('all')
  const [servicesList, setServicesList] = useState([])
  const [masters, setMasters] = useState<IMaster[]>([])
  const [salons, setSalons] = useState<ISalon[]>([])
  const [clickedService, setClickedService] =
    useState<IServiceInCategory | null>(null)
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  console.log('servicesWithCategories', servicesWithCategories)

  // useEffect(() => {
  //   if (router?.query?.id) {
  //     setClickedService({ id: router?.query?.id })
  //   }
  // }, [])

  useEffect(() => {
    setMasters(mastersData)
  }, [mastersData])

  useEffect(() => {
    setSalons(salonsData)
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
          category: ['master', clickedService?.id] as any,
        },
      })
    }
    if (view === 'salon') {
      router.replace({
        query: {
          ...router.query,
          category: ['salon', clickedService?.id] as any,
        },
      })
    }
    if (view === 'all') {
      router.replace({
        query: { ...router.query, category: clickedService?.id },
      })
    }
  }, [view])

  const popularServiceHandler = (service: any) => {
    setClickedService(service)
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
        {!masters && !salons && !clickedService?.id ? (
          <>
            <Title>Популярные услуги</Title>
            <ServicesList
              setClickedService={setClickedService}
              popularServiceHandler={popularServiceHandler}
            />
          </>
        ) : null}
        {mastersData && (view === 'master' || view === 'all') ? (
          <ServicesList masters={masters} />
        ) : null}
        {salonsData && (view === 'salon' || view === 'all') ? (
          <ServicesList salons={salons} />
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default ServicesPage

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { MainContainer } from '../../../styles/common'
import ServicesFilter from './components/ServicesFilter'
import ServicesList from './components/ServicesList'
import { Wrapper, Title, FilterWrap, TextFilter } from './styles'
import { useRouter } from 'next/router'
import { servicesWithMasterCount } from '../../../_graphql-legacy/services/servicesWithMasterCount'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const ServicesPage = () => {
  // const [view, setView] = useState(viewData || 'all')
  // const [servicesList, setServicesList] = useState(masterServices)
  // const [mastersData, setMastersData] = useState(masters)
  // const [salonsData, setSalonsData] = useState(salons)
  // const [clickedService, setClickedService] = useState({
  //   id: clickedServiceId,
  // })
  const [view, setView] = useState('all')
  const [servicesList, setServicesList] = useState([])
  const [mastersData, setMastersData] = useState([])
  const [salonsData, setSalonsData] = useState([])
  const [clickedService, setClickedService] = useState({
    id: 1,
  })
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const { data, refetch: refetchServices } = useQuery(servicesWithMasterCount, {
    skip: true,
    variables: {
      city: city.slug,
    },
    onCompleted: res => {
      setServicesList(res?.mastersServicesCount)
    },
  })

  useEffect(() => {
    refetchServices()
  }, [city])

  // useEffect(() => {
  //   if (router?.query?.id) {
  //     setClickedService({ id: router?.query?.id })
  //   }
  // }, [])

  // useEffect(() => {
  //   setMastersData(masters)
  // }, [masters])

  // useEffect(() => {
  //   setSalonsData(salons)
  // }, [salons])

  // useEffect(() => {
  //   if (clickedService) {
  //     router.replace({
  //       query: {
  //         ...router.query,
  //         category:
  //           view !== 'all' ? [view, clickedService?.id] : clickedService?.id,
  //       },
  //     })
  //   } else {
  //     router.replace({
  //       query: { ...router.query, category: undefined },
  //     })
  //   }
  // }, [clickedService])

  // useEffect(() => {
  //   if (view === 'master') {
  //     router.replace({
  //       query: { ...router.query, category: ['master', clickedService?.id] },
  //     })
  //   }
  //   if (view === 'salon') {
  //     router.replace({
  //       query: { ...router.query, category: ['salon', clickedService?.id] },
  //     })
  //   }
  //   if (view === 'all') {
  //     router.replace({
  //       query: { ...router.query, category: clickedService?.id },
  //     })
  //   }
  // }, [view])

  const popularServiceHandler = service => {
    setClickedService(service)
  }

  return (
    <MainContainer>
      <Wrapper>
        <ServicesFilter
          servicesList={servicesList}
          clickedService={clickedService}
          setClickedService={setClickedService}
          mastersData={mastersData}
          setMastersData={setMastersData}
          salonsData={salonsData}
          setSalonsData={setSalonsData}
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
        {!mastersData && !salonsData && !clickedService?.id ? (
          <>
            <Title>Популярные услуги</Title>
            <ServicesList
              setClickedService={setClickedService}
              popularServiceHandler={popularServiceHandler}
            />
          </>
        ) : null}
        {mastersData && (view === 'master' || view === 'all') ? (
          <ServicesList mastersData={mastersData} />
        ) : null}
        {salonsData && (view === 'salon' || view === 'all') ? (
          <ServicesList salonsData={salonsData} />
        ) : null}
      </Wrapper>
    </MainContainer>
  )
}

export default ServicesPage

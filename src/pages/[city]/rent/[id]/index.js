import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { salonQuery } from '../../../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../../../_graphql-legacy/salon/salonSlugQuery'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Salon/ViewSalon/components/About'
import { reviewsForSalon } from '../../../../_graphql-legacy/salon/reviewsForSalon'
import Contacts from '../../../../components/pages/Salon/ViewSalon/components/Contacts/index.tsx'
import SalonReviews from '../../../../components/pages/Salon/ViewSalon/components/SalonReviews'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import { citySuggestionsQuery } from '../../../../_graphql-legacy/city/citySuggestionsQuery'
import { cyrToTranslit } from '../../../../utils/translit'
import Header from '../../../../components/pages/Rent/ViewRent/components/Header'
import Ribbon from '../../../../components/pages/MainPage/components/Ribbon'
import RentSlider from '../../../../components/pages/Rent/ViewRent/components/RentSlider'
import Service from '../../../../components/pages/Rent/ViewRent/components/Service'
import { currentVacancies } from '../../../../_graphql-legacy/vacancies/currentVacancies'
import { getCategories } from '../../../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../../../_graphql-legacy/advices/getAll'
import Slider from '../../../../components/blocks/Slider'
import { scoreSalon } from '../../../../_graphql-legacy/salon/scoreSalon'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'

const Rent = ({
  salonData,
  dataReviews,
  vacancies,
  beautyCategories,
  beautyAllContent,
  dataScoreRes,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [dataScore, setDataScore] = useState(dataScoreRes)
  const [reviews, setReviews] = useState(dataReviews)
  const [salon, setSalon] = useState(salonData)
  const { me } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)

  const [seats, setSeats] = useState([])

  useEffect(() => {
    setSeats([])
    let arrSeats = []
    salon?.rooms?.map(item => item?.seats?.forEach(el => arrSeats?.push(el)))
    setSeats(arrSeats)
  }, [salonData])

  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }

  useEffect(() => {
    setSalon(salonData)
    setReviews(dataReviews)
    setDataScore(dataScoreRes)
  }, [salonData, dataReviews, dataScoreRes])

  const { refetch: refetchScore, loading: loadingScore } = useQuery(
    scoreSalon,
    {
      variables: { id: salon.id },
      onCompleted: res => {
        setDataScore(res.scoreSalon)
      },
    },
  )

  const { refetch: refetchSalon } = useQuery(salonQuery, {
    variables: { id: salon.id },
    skip: true,
    onCompleted: res => {
      setSalon(res.salon)
    },
  })

  const { refetch: refetchReviews } = useQuery(reviewsForSalon, {
    variables: { originId: salon.id },
    skip: true,
    onCompleted: res => {
      setReviews(res.reviewsForSalon)
    },
  })

  const salonServicesCatalog = catalogOrDefault(catalogs?.salonServicesCatalog)

  const isOwner = me?.salons?.find(item => item.id === salon.id)
  const groupsServices = salonServicesCatalog?.groups
    .map(group => {
      if (group.items === undefined) {
        return null
      }

      const items = group.items.filter(item =>
        salon?.services?.find(entry => entry.id === item.id),
      )

      if (items?.length === 0) {
        return null
      }
      return items
    })
    .filter(element => element !== null)
    .flat(1)
  return (
    <MainLayout>
      <Head>
        {salon?.seo?.title ? <title>{salon?.seo?.title}</title> : null}
        {salon?.seo?.description ? (
          <meta name="description" content={salon?.seo?.description} />
        ) : null}
        {salon?.logo?.url ? (
          <meta property="og:image" content={salon?.logo?.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header
          me={me}
          salon={salon}
          isOwner={isOwner}
          refetchSalon={refetchSalon}
          refetchScore={refetchScore}
          scoreSalonCount={dataScore?.value}
          loadingScore={loadingScore}
          dataReviews={reviews}
          setActiveTab={setActiveTab}
        />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          rent
          salon={salon}
          tabs={[
            { id: 1, text: 'О салоне', link: '#about', show: true },
            {
              id: 2,
              text: 'Аренда',
              link: '#rent',
              count: seats?.length,
              show: seats?.length,
            },
            {
              id: 3,
              text: 'Сервис',
              link: '#service',
              count: groupsServices?.length,
              show: groupsServices?.length,
            },
            {
              id: 5,
              text: 'Отзывы',
              link: '#reviews',
              count: reviews?.length || 0,
              show: true,
            },
            { id: 6, text: 'Контакты', link: '#contacts', show: true },
          ]}
        />
        <About salon={salon} />
        {seats?.length ? (
          <RentSlider me={me} title="Аренда рабочих мест" salon={salon} />
        ) : null}
        {groupsServices?.length ? <Service services={groupsServices} /> : null}
        {vacancies?.length ? (
          <Slider type="vacancies" title="Наши вакансии" items={vacancies} />
        ) : null}
        <SalonReviews
          me={me}
          salonId={salon.id}
          data={reviews}
          refetchReviews={refetchReviews}
        />
        <Contacts
          phones={salon?.phones}
          email={salon?.email}
          workingHours={salon?.workingHours}
          address={salon?.address}
          socialNetworkUrls={salon?.socialNetworkUrls}
        />
        <Ribbon
          title="Бьюти-лента"
          beautyCategories={beautyCategories}
          beautyAllContent={beautyAllContent}
        />
      </>
    </MainLayout>
  )
}

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo()

  const salonQueryRes = await apolloClient.query({
    query: salonSlugQuery,
    variables: { slug: params.id },
  })

  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: query?.city || '',
      count: 1,
    },
  })

  const id = salonQueryRes?.data?.salonSlug?.id

  const data = await Promise.all([
    apolloClient.query({
      query: salonQuery,
      variables: { id: id, filterDefinition: '' },
    }),
    apolloClient.query({
      query: reviewsForSalon,
      variables: {
        originId: id,
      },
    }),
    apolloClient.query({
      query: currentVacancies,
      variables: {
        originId: id,
      },
    }),
    apolloClient.query({
      query: getCategories,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: getAll,
      context: { uri: 'https://moi.salon/graphql' },
    }),
    apolloClient.query({
      query: scoreSalon,
      variables: {
        id: id,
      },
    }),
  ])

  if (
    !id ||
    !city?.data?.citySuggestions[0]?.data?.city ||
    (data[0]?.data?.salon?.address?.city &&
      cyrToTranslit(data[0]?.data?.salon?.address?.city) !== query?.city)
  ) {
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      salonData: data[0]?.data?.salon,
      dataReviews: data[1]?.data?.reviewsForSalon,
      vacancies: data[2]?.data?.currentVacancies || [],
      beautyCategories: data[3]?.data?.catagories,
      beautyAllContent: data[4]?.data?.pages,
      dataScoreRes: data[5]?.data,
    },
  })
}

export default Rent

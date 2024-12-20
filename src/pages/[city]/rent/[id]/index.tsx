import { FC, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Salon/ViewSalon/components/About'
import Contacts from '../../../../components/pages/Salon/ViewSalon/components/Contacts'
import SalonReviews from '../../../../components/pages/Salon/ViewSalon/components/SalonReviews'
import Ribbon from '../../../../components/pages/MainPage/components/Ribbon'
import RentSlider from '../../../../components/pages/Rent/ViewRent/components/RentSlider'
import Service from '../../../../components/pages/Rent/ViewRent/components/Service'
import Slider from '../../../../components/blocks/Slider'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { fetchCity } from 'src/api/utils/fetchCity'
import { ICity } from 'src/types'
import { ISalon, ISalonPage } from 'src/types/salon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getRating } from 'src/utils/newUtils/getRating'
import { GET_RENT_SALONS } from 'src/api/graphql/salon/queries/getRentSalons'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import Header from '../../../../components/pages/Rent/ViewRent/components/Header'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import Head from 'next/head'
import EntityDescription from 'src/components/newUI/EntityDescription'
import styled from 'styled-components'
import { laptopBreakpoint } from 'src/styles/variables'

const Wrapper = styled.div`
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

interface Props {
  cityData: ICity
  rentData: ISalonPage
  othersSalons: ISalon[]
  beautyCategories: any
  beautyAllContent: any
}

const Rent: FC<Props> = ({
  rentData,
  othersSalons,
  cityData,
  beautyCategories,
  beautyAllContent,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [salon, setSalon] = useState<ISalonPage>(rentData)
  const { user } = useAuthStore(getStoreData)
  const isOwner = !!user?.owner?.salons?.find(item => item.id === salon.id)

  const [workplaces, setWorkplaces] = useState(salon.workplaces)

  const { refetch: refetchRentSalon } = useQuery(getSalonPage, {
    variables: { id: salon.id },
    skip: true,
    onCompleted: res => {
      setSalon(flattenStrapiResponse(res.data.salon) as unknown as ISalonPage)
    },
  })

  return (
    <MainLayout>
      <Head>
        {salon.seoTitle ? <title>{salon.seoTitle}</title> : null}
        {salon.seoDescription ? (
          <meta name="description" content={salon.seoDescription} />
        ) : null}
        {salon.logo?.url ? (
          <meta property="og:image" content={salon.logo.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header salon={salon} isOwner={isOwner} setActiveTab={setActiveTab} />
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
              count: workplaces?.length,
              show: !!workplaces?.length,
            },
            {
              id: 3,
              text: 'Сервис',
              link: '#service',
              count: salon.services?.length,
              show: !!salon.services?.length,
            },
            {
              id: 5,
              text: 'Отзывы',
              link: '#reviews',
              count: salon.reviews.length || 0,
              show: true,
            },
            { id: 6, text: 'Контакты', link: '#contacts', show: true },
          ]}
        />
        <Wrapper>
          <EntityDescription description={salon.description} />
        </Wrapper>
        {workplaces?.length ? (
          <RentSlider title="Аренда рабочих мест" salon={salon} />
        ) : null}
        {salon.services?.length ? <Service services={salon.services} /> : null}
        {salon.servicesM?.length ? (
          <Service title="Сервис для мастеров" services={salon.servicesM} />
        ) : null}

        {salon.vacancies?.length ? (
          <Slider
            type="vacancies"
            title="Наши вакансии"
            items={salon.vacancies}
            city={salon.city}
          />
        ) : null}
        <SalonReviews salonId={salon.id} reviews={salon.reviews} />
        <Contacts
          metroStations={salon?.metro_stations}
          locationDirections={salon.locationDirections}
          coordinates={{ longitude: salon.longitude, latitude: salon.latitude }}
          phones={salon?.salonPhones}
          email={salon?.email}
          workingHours={salon?.workingHours}
          address={salon?.address}
          socialNetworkUrls={salon?.socialNetworks}
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

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const { params, query } = ctx
  const id = params?.id
  const apolloClient = initializeApollo()

  const cityData = await fetchCity(query.city as string)

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonPage,
      variables: { id },
    }),
    apolloClient.query({
      query: GET_RENT_SALONS,
      variables: { id, pageSize: 10, slug: cityData?.slug },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const rentData: ISalonPage | null =
    flattenStrapiResponse(data[0]?.data?.salon) || null

  const othersSalons: ISalon[] =
    flattenStrapiResponse(data[1]?.data?.salons) || []

  const reviewsCount = rentData?.reviews.length || 0
  const { rating, ratingCount } = getRating(rentData?.ratings)
    ? getRating(rentData?.ratings)
    : {
        rating: rentData?.rating || 0,
        ratingCount: rentData?.ratingCount || 0,
      }

  const beautyCategories = flattenStrapiResponse(data[2]?.data?.feedCategories)
  const beautyAllContent = flattenStrapiResponse(data[3]?.data?.feeds)

  return {
    notFound: !id || !cityData || !rentData,
    props: {
      rentData: rentData
        ? {
            ...rentData,
            rating,
            ratingCount,
            reviewsCount,
          }
        : null,
      othersSalons: othersSalons.map(e => {
        const reviewsCount = e.reviews.length || 0
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      cityData,
      beautyCategories,
      beautyAllContent,
    },
  }
}

export default Rent

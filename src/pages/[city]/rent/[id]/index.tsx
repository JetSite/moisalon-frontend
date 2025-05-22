import { FC, useState, Fragment } from 'react'
import { useQuery } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import TabsSlider from '../../../../components/ui/TabsSlider'
import Contacts from '../../../../components/pages/Salon/ViewSalon/components/Contacts'
import SalonReviews from '../../../../components/pages/Salon/ViewSalon/components/SalonReviews'
import Ribbon from '../../../../components/pages/MainPage/components/Ribbon'
import RentSlider from '../../../../components/pages/Rent/ViewRent/components/RentSlider'
import Service from '../../../../components/pages/Rent/ViewRent/components/Service'
import Slider from '../../../../components/blocks/Slider'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
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
import EntityDescription from 'src/components/newUI/EntityDescription'
import styled from 'styled-components'
import { laptopBreakpoint } from 'src/styles/variables'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { getFeedCategoriesForSlider } from '@/api/graphql/feed/queries/getFeedCategoriesForSlider'
import { getFeedsForSlider } from '@/api/graphql/feed/queries/getFeedsForSlider'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 140px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

interface Props {
  cityData: ICity
  rentData: ISalonPage
  othersSalons: ISalon[]
  beautyCategories: IBeautyCategories[]
  beautyAllContent: IFeed[]
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
      <Fragment>
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
        {rentData?.photos?.length ? (
          <Slider
            city={salon.city}
            type="photos"
            items={rentData.photos}
            isOwner={false}
            title="Фото салона"
            pt={52}
            pb={31}
          />
        ) : null}
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
      </Fragment>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const { params, query } = ctx
  const id = params?.['id']
  const apolloClient = initializeApollo()

  const cityData = await fetchCity(query['city'] as string)

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
      query: getFeedCategoriesForSlider,
    }),
    apolloClient.query({
      query: getFeedsForSlider,
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
      meta: {
        title: rentData?.name || 'Аренда салона | MOI salon',
        description:
          rentData?.description ||
          'Аренда салона красоты на платформе MOI salon',
        image: rentData?.photos?.[0]?.url || '/salons-page-bg.jpg',
        url: `https://moi.salon/${cityData.slug}/rent/${rentData?.id}`,
      },
      schema: {
        type: 'RealEstateListing',
        data: {
          name: rentData?.name,
          description: rentData?.description,
          url: `https://moi.salon/${cityData.slug}/rent/${rentData?.id}`,
          image: rentData?.photos
            ?.map(photo =>
              photo.url
                ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${photo.url}`
                : undefined,
            )
            .filter(Boolean) || ['https://moi.salon/salons-page-bg.jpg'],
          datePosted: rentData?.createdAt,
          aggregateRating: rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: rating,
                ratingCount: ratingCount,
                reviewCount: reviewsCount,
              }
            : undefined,
        },
      },
    },
  }
}

export default Rent

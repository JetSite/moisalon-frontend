import { FC, useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Salon/ViewSalon/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Salon/ViewSalon/components/About'
import Services from '../../../../components/pages/Salon/ViewSalon/components/Services'
import ServicesForClient from '../../../../components/pages/Salon/ViewSalon/components/ServicesForClient'
import { brandsSalon } from '../../../../_graphql-legacy/salon/brandsSalon'
import { reviewsForSalon } from '../../../../_graphql-legacy/salon/reviewsForSalon'
import Contacts from '../../../../components/pages/Salon/ViewSalon/components/Contacts'
import SalonReviews from '../../../../components/pages/Salon/ViewSalon/components/SalonReviews'
import InviteSalon from '../../../../components/pages/Salon/ViewSalon/components/Invite'
import MobileServicesComponent from '../../../../components/pages/Salon/ViewSalon/components/MobileServicesComponent/MobileServicesComponent'
import MobileServicesForClient from '../../../../components/pages/Salon/ViewSalon/components/MobileServicesComponent/MobileServicesForClient'
import MobileSalonPhotos from '../../../../components/pages/Salon/ViewSalon/components/MobileSalonPhotos'
import catalogOrDefault, { ICatalog } from '../../../../utils/catalogOrDefault'
import { removeSalonBrandsMutation } from '../../../../_graphql-legacy/salon/removeSalonBrandsMutation'
import Slider from '../../../../components/blocks/Slider'
import AddBrands from '../../../../components/pages/Salon/AddBrands'
import { NoItemsText } from '../../../../styles/common'
import { GetServerSideProps } from 'next'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IID, Nullable } from 'src/types/common'
import { getGroupedServices } from 'src/utils/getGrupedServices'
import { IBrand } from 'src/types/brands'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { getOtherSalons } from 'src/api/graphql/salon/queries/getOtherSalons'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import useBaseStore from 'src/store/baseStore'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { fetchCity } from 'src/api/utils/fetchCity'
import { setCookie } from 'cookies-next'
import { IRatingValue, getRating } from 'src/utils/newUtils/getRating'

interface Props {
  salonData: ISalonPage
  othersSalons: ISalon[]
  cityData: ICity
}

const Salon: FC<Props> = ({ salonData, othersSalons, cityData }) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [edit, setEdit] = useState<boolean>(false)
  const [editClientServices, setEditClientServices] = useState<boolean>(false)
  const [salon, setSalon] = useState<ISalonPage>(salonData)
  const [brands, setBrands] = useState<IBrand[]>(salonData?.brands)
  const { me } = useAuthStore(getStoreData)
  const groupedServices = useMemo(
    () => getGroupedServices(salon.services),
    [salon],
  )
  const groupedServicesM = useMemo(
    () => getGroupedServices(salon.servicesM),
    [salon],
  )

  const [isBrandsEditing, setIsBrandsEditing] = useState<boolean>(false)

  const { refetch: refetchSalon } = useQuery(getSalonPage, {
    skip: true,
    variables: { id: salon.id },
    onCompleted: res => {
      setSalon(flattenStrapiResponse(res.data.salon) as unknown as ISalonPage)
    },
  })

  const { refetch: refetchBrands } = useQuery(brandsSalon, {
    variables: { id: salon.id },
    skip: true,
    onCompleted: res => {
      if (res) {
        setBrands(res.brandsSalon)
      }
    },
  })

  const isOwner = !!me?.owner?.salons.find(e => e.id === salon.id)

  const handleRemoveBrand = (id: IID) => {}

  console.log(salonData)

  return (
    <MainLayout>
      <SearchBlock />
      <Header salon={salon} isOwner={isOwner} />
      <TabsSlider
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        salon={salon}
        tabs={[
          { id: 1, text: 'О салоне', link: '#about', show: true },
          {
            id: 2,
            text: 'Услуги',
            link: '#services',
            count: salon?.services?.length,
            show: !!salon?.services?.length || isOwner,
          },
          {
            id: 3,
            text: 'Бренды',
            link: '#brands',
            count: salon.brands?.length,
            show: !!salon.brands?.length || isOwner,
          },
          {
            id: 4,
            text: 'Мастера',
            link: '#masters',
            count: salon.masters?.length,
            show: !!salon.masters?.length,
          },
          {
            id: 5,
            text: 'Отзывы',
            link: '#reviews',
            count: salon.reviews?.length || 0,
            show: true,
          },
          { id: 6, text: 'Контакты', link: '#contacts', show: true },
        ]}
      />
      <About salon={salon} />
      {salon.services?.length || isOwner ? (
        <MobileServicesComponent
          isOwner={isOwner}
          groupedServices={groupedServicesM}
          salon={salon}
          refetchSalon={refetchSalon}
        />
      ) : null}
      {salon?.salonPhotos?.length > 0 && <MobileSalonPhotos salon={salon} />}
      {salon?.masters?.length || isOwner ? (
        <MobileServicesForClient
          isOwner={isOwner}
          groupedServices={groupedServices}
          salon={salon}
          refetchSalon={refetchSalon}
        />
      ) : null}
      {salon.services?.length || isOwner ? (
        <Services
          groupedServices={groupedServicesM}
          isOwner={isOwner}
          edit={edit}
          setEdit={setEdit}
          salon={salon}
          refetchSalon={refetchSalon}
          count={salon.services?.length}
        />
      ) : null}
      {salon?.masters.length || isOwner ? (
        <ServicesForClient
          groupedServices={groupedServices}
          isOwner={isOwner}
          edit={editClientServices}
          setEdit={setEditClientServices}
          salon={salon}
          count={salon?.services?.length}
          refetchSalon={refetchSalon}
        />
      ) : null}
      {salon.vacancies?.length ? (
        <Slider
          type="vacancies"
          title="Наши вакансии"
          items={salon.vacancies}
          city={salon.cities}
        />
      ) : null}
      {brands?.length || isOwner ? (
        <Slider
          city={cityData}
          salon={salon}
          type="brands"
          items={brands}
          isOwner={isOwner}
          title="Наши бренды"
          isEditing={isBrandsEditing}
          setIsEditing={setIsBrandsEditing}
          deleteFunction={handleRemoveBrand}
          noBottom
          noAll
          noAllButton
          pt={52}
          pb={31}
        >
          <>
            {!brands?.length && !isBrandsEditing && (
              <NoItemsText>
                Нет добавленных брендов. Нажмите на карандаш, чтобы добавить
                бренды
              </NoItemsText>
            )}
            {isBrandsEditing ? (
              <AddBrands refetchBrands={refetchBrands} salonId={salon.id} />
            ) : null}
          </>
        </Slider>
      ) : null}
      {salon.masters.length ? (
        <Slider
          city={cityData}
          type="masters"
          items={salon.masters}
          title="Наши мастера"
          bgColor="#f2f0f0"
          pt={52}
          pb={31}
          noBottom
          noAll
          noAllButton
        />
      ) : null}
      <SalonReviews salonId={salon.id} reviews={salon.reviews} />
      <Contacts
        phones={salon?.salonPhones}
        email={salon?.salonEmail}
        workingHours={salon?.workingHours}
        address={salon?.salonAddress}
        socialNetworkUrls={salon?.socialNetworks}
        metroStations={salon?.metro_stations}
        locationDirections={salon.locationDirections}
        coordinates={{ longitude: salon.longitude, latitude: salon.latitude }}
      />
      <InviteSalon me={me} />
      <Slider
        city={cityData}
        type="salons"
        title="Другие салоны поблизости"
        noBottom
        noAll
        noAllButton
        items={othersSalons || []}
        loading={false}
        pt={102}
        pb={91}
      />
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
      query: getOtherSalons,
      variables: { id },
    }),
  ])

  const salonData: ISalonPage | null =
    flattenStrapiResponse(data[0]?.data?.salon) || null

  const othersSalons: ISalon[] =
    flattenStrapiResponse(data[1]?.data?.salons) || []

  const reviewsCount = salonData?.reviews.length || 0
  const { rating, ratingCount } = getRating(salonData?.ratings)
    ? getRating(salonData?.ratings)
    : {
        rating: salonData?.rating || 0,
        ratingCount: salonData?.ratingCount || 0,
      }

  return {
    notFound: !id || !cityData || !salonData,
    props: {
      salonData: salonData
        ? {
            ...salonData,
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
    },
  }
}

export default Salon

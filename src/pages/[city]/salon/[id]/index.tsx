import { FC, useContext, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { salonQuery } from '../../../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../../../_graphql-legacy/salon/salonSlugQuery'
import { addApolloState, initializeApollo } from '../../../../apollo-client'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Salon/ViewSalon/components/Header/index'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Salon/ViewSalon/components/About'
import Services from '../../../../components/pages/Salon/ViewSalon/components/Services'
import ServicesForClient from '../../../../components/pages/Salon/ViewSalon/components/ServicesForClient'
import { brandsSalon } from '../../../../_graphql-legacy/salon/brandsSalon'
import { reviewsForSalon } from '../../../../_graphql-legacy/salon/reviewsForSalon'
import Contacts from '../../../../components/pages/Salon/ViewSalon/components/Contacts/index'
import SalonReviews from '../../../../components/pages/Salon/ViewSalon/components/SalonReviews'
import InviteSalon from '../../../../components/pages/Salon/ViewSalon/components/Invite'
import MobileServicesComponent from '../../../../components/pages/Salon/ViewSalon/components/MobileServicesComponent/MobileServicesComponent'
import MobileServicesForClient from '../../../../components/pages/Salon/ViewSalon/components/MobileServicesComponent/MobileServicesForClient'
import MobileSalonPhotos from '../../../../components/pages/Salon/ViewSalon/components/MobileSalonPhotos'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import { mastersSalon } from '../../../../_graphql-legacy/salon/mastersSalon'
import {
  CatalogsContext,
  CityContext,
  MeContext,
} from '../../../../searchContext'
import { salonsRandom } from '../../../../_graphql-legacy/salon/salonsRandom'
import { citySuggestionsQuery } from '../../../../_graphql-legacy/city/citySuggestionsQuery'
import { cyrToTranslit } from '../../../../utils/translit'
import { currentVacancies } from '../../../../_graphql-legacy/vacancies/currentVacancies'
import { removeSalonBrandsMutation } from '../../../../_graphql-legacy/salon/removeSalonBrandsMutation'
import Slider from '../../../../components/blocks/Slider'
import AddBrands from '../../../../components/pages/Salon/AddBrands'
import { NoItemsText } from '../../../../styles/common'
import { useSearchHistoryContext } from '../../../../searchHistoryContext'
import { getSalonsThroughCity } from 'src/graphql/salon/queries/getSalonsThroughCity'
import { GetServerSideProps } from 'next'
import { getCities } from 'src/graphql/city/getCities'
import { getSalonId } from 'src/graphql/salon/queries/getSalonId'
import {
  flattenStrapiResponse,
  isArray,
  isObject,
} from 'src/utils/flattenStrapiResponse'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IID } from 'src/types/common'
import { getGroupedServices } from 'src/utils/getGrupedServices'
import { IBrand } from 'src/types/brands'
import { getSalonPage } from 'src/graphql/salon/queries/getSalon'
import { getOtherSalons } from 'src/graphql/salon/queries/getOtherSalons'

interface Props {
  salonData: ISalonPage
  othersSalons: ISalon[]
  brandsData: any
  dataReviews: any
  dataScoreRes: any
  mastersData: any
  vacancies: any
}

const Salon: FC<Props> = ({
  salonData,
  othersSalons,
  brandsData,
  dataReviews,
  dataScoreRes,
  mastersData,
  vacancies,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [edit, setEdit] = useState<boolean>(false)
  const [editClientServices, setEditClientServices] = useState<boolean>(false)
  const [reviews, setReviews] = useState(salonData.review)
  const [dataScore, setDataScore] = useState<number>(salonData.salonRating)
  const [salon, setSalon] = useState<ISalonPage>(salonData)
  const [brands, setBrands] = useState<IBrand[]>(salonData.brands)
  const [city, setCity] = useContext(CityContext)
  setCity(salonData.cities.cityName)

  const [me, setMe] = useContext(MeContext)
  const [catalogs, setCatalogs] = useContext(CatalogsContext)

  const groupedServices = useMemo(
    () => getGroupedServices(salon.services),
    [salon],
  )
  const [isBrandsEditing, setIsBrandsEditing] = useState<boolean>(false)

  // let cityInStorage
  // if (typeof window !== 'undefined') {
  //   cityInStorage = localStorage.getItem('citySalon')
  // }

  // const { setChosenItemId } = useSearchHistoryContext()

  // useEffect(() => {
  //   setChosenItemId(salon.id)
  // }, [])

  // const { data, loading, refetch } = useQuery(salonsRandom, {
  //   variables: {
  //     count: 10,
  //     city:
  //       me && me?.info && me?.info?.city
  //         ? me?.info?.city
  //         : cityInStorage
  //         ? cityInStorage
  //         : '',
  //   },
  //   fetchPolicy: 'network-only',
  // })

  useEffect(() => {
    setSalon(salonData)
    setBrands(salonData.brands)
    setReviews(salonData.review)
    // setDataScore(dataScoreRes)
    // refetch()
  }, [salonData])

  const { refetch: refetchSalon } = useQuery(getSalonPage, {
    variables: { id: salon.id },
    onCompleted: res => {
      setSalon(flattenStrapiResponse(res.data.salon) as unknown as ISalonPage)
    },
  })

  const { refetch: refetchScore, loading: loadingScore } = useQuery(
    getOtherSalons,
    {
      variables: { id: salon.id },
      onCompleted: res => {
        setDataScore(res.getOtherSalons)
      },
    },
  )

  const { refetch: refetchReviews } = useQuery(reviewsForSalon, {
    variables: { originId: salon.id },
    skip: true,
    onCompleted: res => {
      setReviews(res.reviewsForSalon)
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

  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog,
  )
  // const salonWorkplacesServicesCatalog = catalogOrDefault(
  //   catalogs?.salonWorkplacesServicesCatalog,
  // )
  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog,
  )

  // const salonServicesMasterCatalog = catalogOrDefault(
  //   catalogs?.salonServicesMasterCatalog,
  // )

  const isOwner = !!me?.salons?.find(
    (item: { id: string | number }) => item.id === salon.id,
  )

  // const groupsServices = salonWorkplacesServicesCatalog?.groups
  //   .map(group => {
  //     if (group.items === undefined) {
  //       return null
  //     }

  //     const items = group.items.filter(item =>
  //       salon?.workplacesServices?.find(entry => entry.id === item.id),
  //     )

  //     if (items?.length === 0) {
  //       return null
  //     }
  //     return items
  //   })
  //   .filter(element => element !== null)
  //   .flat(1)

  const [removeBrands] = useMutation(removeSalonBrandsMutation, {
    onCompleted: () => {
      refetchBrands()
    },
  })

  const handleRemoveBrand = (id: IID) => {
    removeBrands({
      variables: {
        ids: [id],
        salonId: salon.id,
      },
    })
  }

  // const { data: data1 } = useQuery(getOtherSalons, {
  //   variables: { id: 3 },
  // })

  return (
    <MainLayout>
      {/* <Head>
        {salon.data.attributes.salonName? <title>{salon?.seo?.title}</title> : null}
        {salon?.seo?.description ? (
          <meta name="description" content={salon?.seo?.description} />
        ) : null}
        {salon?.logo?.url ? (
          <meta property="og:image" content={salon?.logo?.url} />
        ) : null}
      </Head> */}
      <SearchBlock />
      <Header
        me={me}
        salon={salon}
        isOwner={isOwner}
        refetchSalon={refetchSalon}
        refetchScore={refetchScore}
        loadingScore={loadingScore}
        salonActivitiesCatalog={salonActivitiesCatalog}
      />
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
            count: salon.review?.length || 0,
            show: true,
          },
          { id: 6, text: 'Контакты', link: '#contacts', show: true },
        ]}
      />
      <About salon={salon} />
      {salon.services?.length || isOwner ? (
        <MobileServicesComponent
          isOwner={isOwner}
          groupedServices={groupedServices}
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
          groupedServices={groupedServices}
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
      {/* {vacancies?.length ? (
        <Slider type="vacancies" title="Наши вакансии" items={vacancies} />
      ) : null} */}
      {brands?.length || isOwner ? (
        <Slider
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
      <SalonReviews
        me={me}
        salonId={salon.id}
        data={reviews}
        refetchReviews={refetchReviews}
      />
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
export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const apolloClient = initializeApollo()

  const salonIdRes = await apolloClient.query({
    query: getSalonId,
    variables: { slug: params?.id },
  })

  const { data: city } = await apolloClient.query({
    query: getCities,
    variables: { citySlug: ['Москва'] },
  })

  // const id = salonIdRes.data.salons.data[0].id
  const id = params?.id

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonPage,
      variables: { id },
    }),
    apolloClient.query({
      query: getOtherSalons,
      variables: { id },
    }),
    //   apolloClient.query({
    //     query: reviewsForSalon,
    //     variables: {
    //       originId: id,
    //     },
    //   }),
    // apolloClient.query({
    //   query: scoreSalon,
    //   variables: {
    //     id: id,
    //   },
    // }),
    //   apolloClient.query({
    //     query: mastersSalon,
    //     variables: {
    //       salonId: id,
    //     },
    //   }),
    //   apolloClient.query({
    //     query: currentVacancies,
    //     variables: {
    //       originId: id,
    //     },
    //   }),
  ])

  // if (
  //   !id ||
  //   !city?.data?.citySuggestions[0]?.data?.city ||
  //   (data[0]?.data?.salon?.address?.city &&
  //     cyrToTranslit(data[0]?.data?.salon?.address?.city) !== query?.city)
  // ) {
  //   return {
  //     notFound: true,
  //   }
  // }

  const salonData = flattenStrapiResponse(
    data[0]?.data?.salon,
  ) as unknown as ISalonPage | null

  const othersSalons = flattenStrapiResponse(
    data[1]?.data?.salons,
  ) as unknown as ISalon | null

  return addApolloState(apolloClient, {
    props: {
      salonData,
      othersSalons,
      // brandsData: data[1]?.data?.brandsSalon || [],
      // dataReviews: data[2]?.data?.reviewsForSalon,
      // dataScoreRes: data[3]?.data,
      // mastersData: data[4]?.data?.salonMasters || [],
      // vacancies: data[5]?.data?.currentVacancies || [],
    },
  })
}

export default Salon

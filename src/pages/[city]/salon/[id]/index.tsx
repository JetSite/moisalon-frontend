import { FC, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import MainLayout from '../../../../layouts/MainLayout'
import { salonQuery } from '../../../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../../../_graphql-legacy/salon/salonSlugQuery'
import { scoreSalon } from '../../../../_graphql-legacy/salon/scoreSalon'
import { addApolloState, initializeApollo } from '../../../../apollo-client'
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
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import { mastersSalon } from '../../../../_graphql-legacy/salon/mastersSalon'
import { CatalogsContext, MeContext } from '../../../../searchContext'
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
import { getSalon } from 'src/graphql/salon/queries/getSalon'

interface Props {
  salonData: any
  brandsData: any
  dataReviews: any
  dataScoreRes: any
  mastersData: any
  vacancies: any
}

const Salon: FC<Props> = ({
  salonData,
  brandsData,
  dataReviews,
  dataScoreRes,
  mastersData,
  vacancies,
}) => {
  // const [activeTab, setActiveTab] = useState(0)
  // const [edit, setEdit] = useState(false)
  // const [editClientServices, setEditClientServices] = useState(false)
  // const [reviews, setReviews] = useState(dataReviews)
  // const [dataScore, setDataScore] = useState(dataScoreRes)
  const [salon, setSalon] = useState(salonData)
  const [me, setMe] = useContext(MeContext)
  // const catalogs = useContext(CatalogsContext)
  // const [brands, setBrands] = useState(brandsData)
  // const [isBrandsEditing, setIsBrandsEditing] = useState(false)

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

  // useEffect(() => {
  //   setSalon(salonData)
  //   setBrands(brandsData)
  //   setReviews(dataReviews)
  //   setDataScore(dataScoreRes)
  //   refetch()
  // }, [salonData, brandsData, dataReviews, dataScoreRes])

  // const { refetch: refetchSalon } = useQuery(salonQuery, {
  //   variables: { id: salon.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setSalon(res.salon)
  //   },
  // })

  // const { refetch: refetchScore, loading: loadingScore } = useQuery(
  //   scoreSalon,
  //   {
  //     variables: { id: salon.id },
  //     onCompleted: res => {
  //       setDataScore(res.scoreSalon)
  //     },
  //   },
  // )

  // const { refetch: refetchReviews } = useQuery(reviewsForSalon, {
  //   variables: { originId: salon.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setReviews(res.reviewsForSalon)
  //   },
  // })

  // const { refetch: refetchBrands } = useQuery(brandsSalon, {
  //   variables: { id: salon.id },
  //   skip: true,
  //   onCompleted: res => {
  //     if (res) {
  //       setBrands(res.brandsSalon)
  //     }
  //   },
  // })

  // const salonActivitiesCatalog = catalogOrDefault(
  //   catalogs?.salonActivitiesCatalog,
  // )
  // const salonWorkplacesServicesCatalog = catalogOrDefault(
  //   catalogs?.salonWorkplacesServicesCatalog,
  // )
  // const masterSpecializationsCatalog = catalogOrDefault(
  //   catalogs?.masterSpecializationsCatalog,
  // )

  // const salonServicesMasterCatalog = catalogOrDefault(
  //   catalogs?.salonServicesMasterCatalog,
  // )

  // const isOwner = me?.salons?.find(item => item.id === salon.id)

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

  // const [removeBrands] = useMutation(removeSalonBrandsMutation, {
  //   onCompleted: () => {
  //     refetchBrands()
  //   },
  // })

  // const handleRemoveBrand = id => {
  //   removeBrands({
  //     variables: {
  //       ids: [id],
  //       salonId: salon.id,
  //     },
  //   })
  // }

  // const { data: data1 } = useQuery(getSalon, {
  //   variables: { id: 3 },
  // })

  // console.log(salon)

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
      {/* <Header
        me={me}
        salon={salon}
        isOwner={isOwner}
        refetchSalon={refetchSalon}
        refetchScore={refetchScore}
        scoreSalonCount={dataScore?.value}
        loadingScore={loadingScore}
        salonActivitiesCatalog={salonActivitiesCatalog}
      /> */}
    </MainLayout>
    // <MainLayout>
    //   <Head>
    //     {salon?.seo?.title ? <title>{salon?.seo?.title}</title> : null}
    //     {salon?.seo?.description ? (
    //       <meta name="description" content={salon?.seo?.description} />
    //     ) : null}
    //     {salon?.logo?.url ? (
    //       <meta property="og:image" content={salon?.logo?.url} />
    //     ) : null}
    //   </Head>
    //   <>
    //     <SearchBlock />
    //     <Header
    //       me={me}
    //       salon={salon}
    //       isOwner={isOwner}
    //       refetchSalon={refetchSalon}
    //       refetchScore={refetchScore}
    //       scoreSalonCount={dataScore?.value}
    //       loadingScore={loadingScore}
    //       salonActivitiesCatalog={salonActivitiesCatalog}
    //     />
    //     <TabsSlider
    //       activeTab={activeTab}
    //       setActiveTab={setActiveTab}
    //       tabs={[
    //         { id: 1, text: 'О салоне', link: '#about', show: true },
    //         {
    //           id: 2,
    //           text: 'Услуги',
    //           link: '#services',
    //           count: salon?.servicesMaster?.length,
    //           show: salon?.servicesMaster?.length || isOwner,
    //         },
    //         {
    //           id: 3,
    //           text: 'Бренды',
    //           link: '#brands',
    //           count: brands?.length,
    //           show: brands?.length || isOwner,
    //         },
    //         {
    //           id: 4,
    //           text: 'Мастера',
    //           link: '#masters',
    //           count: mastersData?.length,
    //           show: mastersData?.length,
    //         },
    //         {
    //           id: 5,
    //           text: 'Отзывы',
    //           link: '#reviews',
    //           count: reviews?.length || 0,
    //           show: true,
    //         },
    //         { id: 6, text: 'Контакты', link: '#contacts', show: true },
    //       ]}
    //     />
    //     <About salon={salon} />
    //     {/* {groupsServices?.length || isOwner ? (
    //       <MobileServicesComponent
    //         isOwner={isOwner}
    //         services={salon?.workplacesServices}
    //         salon={salon}
    //         catalogs={catalogs}
    //         refetchSalon={refetchSalon}
    //       />
    //     ) : null} */}
    //     {salon?.photos?.length > 0 && <MobileSalonPhotos salon={salon} />}
    //     {salon?.servicesMaster?.length || isOwner ? (
    //       <MobileServicesForClient
    //         isOwner={isOwner}
    //         services={salon?.servicesMaster}
    //         salon={salon}
    //         catalogs={catalogs}
    //         refetchSalon={refetchSalon}
    //       />
    //     ) : null}
    //     {/* {groupsServices?.length || isOwner ? (
    //       <Services
    //         services={salon?.workplacesServices}
    //         salonWorkplacesServicesCatalog={salonWorkplacesServicesCatalog}
    //         isOwner={isOwner}
    //         edit={edit}
    //         setEdit={setEdit}
    //         salon={salon}
    //         refetchSalon={refetchSalon}
    //         count={groupsServices?.length}
    //       />
    //     ) : null} */}
    //     {salon?.servicesMaster?.length || isOwner ? (
    //       <ServicesForClient
    //         services={salon?.servicesMaster}
    //         salonServicesMasterCatalog={salonServicesMasterCatalog}
    //         isOwner={isOwner}
    //         edit={editClientServices}
    //         setEdit={setEditClientServices}
    //         salon={salon}
    //         count={salon?.servicesMaster?.length}
    //         refetchSalon={refetchSalon}
    //       />
    //     ) : null}
    //     {vacancies?.length ? (
    //       <Slider type="vacancies" title="Наши вакансии" items={vacancies} />
    //     ) : null}
    //     {brands?.length || isOwner ? (
    //       <Slider
    //         type="brands"
    //         items={brands}
    //         isOwner={isOwner}
    //         title="Наши бренды"
    //         isEditing={isBrandsEditing}
    //         setIsEditing={setIsBrandsEditing}
    //         deleteFunction={handleRemoveBrand}
    //         noBottom
    //         noAll
    //         noAllButton
    //         pt={52}
    //         pb={31}
    //       >
    //         <>
    //           {!brands?.length && !isBrandsEditing && (
    //             <NoItemsText>
    //               Нет добавленных брендов. Нажмите на карандаш, чтобы добавить
    //               бренды
    //             </NoItemsText>
    //           )}
    //           {isBrandsEditing ? (
    //             <AddBrands refetchBrands={refetchBrands} salonId={salon.id} />
    //           ) : null}
    //         </>
    //       </Slider>
    //     ) : null}
    //     {mastersData.length ? (
    //       <Slider
    //         type="masters"
    //         items={mastersData}
    //         title="Наши мастера"
    //         catalog={masterSpecializationsCatalog}
    //         bgColor="#f2f0f0"
    //         pt={52}
    //         pb={31}
    //         noBottom
    //         noAll
    //         noAllButton
    //       />
    //     ) : null}
    //     <SalonReviews
    //       me={me}
    //       salonId={salon.id}
    //       data={reviews}
    //       refetchReviews={refetchReviews}
    //     />
    //     <Contacts
    //       phones={salon?.phones}
    //       email={salon?.email}
    //       workingHours={salon?.workingHours}
    //       address={salon?.address}
    //       socialNetworkUrls={salon?.socialNetworkUrls}
    //       route={salon?.locationDirections}
    //     />
    //     <InviteSalon me={me} />
    //     <Slider
    //       type="salons"
    //       title="Другие салоны поблизости"
    //       noBottom
    //       noAll
    //       noAllButton
    //       items={data?.salonsRandom || []}
    //       loading={loading}
    //       pt={102}
    //       pb={91}
    //     />
    //   </>
    // </MainLayout>
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

  const id = salonIdRes.data.salons.data[0].id
  console.log(id)

  const data = await Promise.all([
    apolloClient.query({
      query: getSalon,
      variables: { id: id },
    }),
    //   apolloClient.query({
    //     query: brandsSalon,
    //     variables: { id: id },
    //   }),
    //   apolloClient.query({
    //     query: reviewsForSalon,
    //     variables: {
    //       originId: id,
    //     },
    //   }),
    //   apolloClient.query({
    //     query: scoreSalon,
    //     variables: {
    //       id: id,
    //     },
    //   }),
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

  return addApolloState(apolloClient, {
    props: {
      salonData: data[0]?.data?.salon,
      // brandsData: data[1]?.data?.brandsSalon || [],
      // dataReviews: data[2]?.data?.reviewsForSalon,
      // dataScoreRes: data[3]?.data,
      // mastersData: data[4]?.data?.salonMasters || [],
      // vacancies: data[5]?.data?.currentVacancies || [],
    },
  })
}

export default Salon

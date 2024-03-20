import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { addApolloState, initializeApollo } from '../../../../apollo-client'
import { useQuery, useMutation } from '@apollo/client'
import { masterQuery } from '../../../../_graphql-legacy/master/masterQuery'
import { brandQuery } from '../../../../_graphql-legacy/master/brandQuery'
import { reviewsForMaster } from '../../../../_graphql-legacy/master/reviewsForMaster'
import MainLayout from '../../../../layouts/MainLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Master/ViewMaster/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Master/ViewMaster/components/About'
import MobileServicesForClient from '../../../../components/pages/Master/ViewMaster/components/MobileServicesComponent/MobileServicesForClient'
import Resume from '../../../../components/pages/Master/ViewMaster/components/Resume'
import ReviewsMaster from '../../../../components/pages/Master/ViewMaster/components/MasterReviews'
import Line from '../../../../components/pages/MainPage/components/Line'
import InviteMaster from '../../../../components/pages/Master/ViewMaster/components/Invite'
import catalogOrDefault from '../../../../utils/catalogOrDefault'
import { scoreMaster } from '../../../../_graphql-legacy/master/scoreMaster'
import { updateMasterPhotoWorksMutation } from '../../../../_graphql-legacy/master/updateMasterPhotoWorksMutation'
import { updateMasterPhotoDiplomaMutation } from '../../../../_graphql-legacy/master/updateMasterPhotoDiplomaMutation'
import { removeUserBrandsMutation } from '../../../../_graphql-legacy/master/removeUserBrandsMutation'
import { removeUserSalonsMutation } from '../../../../_graphql-legacy/master/removeUserSalonsMutation'
import Contacts from '../../../../components/pages/Master/ViewMaster/components/Contacts'
import ServicesForClient from '../../../../components/pages/Master/ViewMaster/components/ServicesForClient'
import { masterSlugQuery } from '../../../../_graphql-legacy/master/masterSlugQuery'
import { CatalogsContext, MeContext } from '../../../../searchContext'
import { mastersRandomQuery } from '../../../../_graphql-legacy/mastersRandomQuery'
import { citySuggestionsQuery } from '../../../../_graphql-legacy/city/citySuggestionsQuery'
import Slider from '../../../../components/blocks/Slider'
import AddBrands from '../../../../components/pages/Master/AddBrands'
import AddSalons from '../../../../components/pages/Master/AddSalons'
import PhotoAdd from '../../../../components/pages/Master/ViewMaster/components/PhotoAdd'
import { NoItemsText } from '../../../../styles/common'
import { useSearchHistory } from '../../../../hooks/useSearchHistory'
import { useSearchHistoryContext } from '../../../../searchHistoryContext'
import { getMaster } from 'src/graphql/master/queries/getMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const Master = ({ masterData }) => {
  const [master, setMaster] = useState(masterData)
  const [me, setMe] = useContext(MeContext)
  const catalogs = useContext(CatalogsContext)
  const [editClientServices, setEditClientServices] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isBrandsEditing, setIsBrandsEditing] = useState(false)
  const [isSalonsEditing, setIsSalonsEditing] = useState(false)
  const [isPortfolioEditing, setIsPortfolioEditing] = useState(false)
  const [isDiplomsEditing, setIsDiplomsEditing] = useState(false)

  let cityInStorage
  if (typeof window !== 'undefined') {
    cityInStorage = localStorage.getItem('citySalon')
  }
  // const { data, loading, refetch } = useQuery(mastersRandomQuery, {
  //   variables: {
  //     count: 10,
  //     city:
  //       me && me?.info && me?.info?.city
  //         ? me?.info?.city
  //         : cityInStorage
  //         ? cityInStorage
  //         : '',
  //   },
  // })

  useEffect(() => {
    if (masterData?.data) {
      setMaster(flattenStrapiResponse(masterData.data))
    }
    // refetch()
  }, [masterData])

  const { setChosenItemId } = useSearchHistoryContext()

  useEffect(() => {
    setChosenItemId(master.id)
  }, [])

  const servicesCount = master?.serviceCategories?.reduce((acc, category) => {
    return acc + category.services.length
  }, 0)

  // const { refetch: refetchMaster } = useQuery(masterQuery, {
  //   variables: { id: master.id },
  //   skip: true,
  //   onCompleted: res => {
  //     setMaster(res.master)
  //   },
  // })

  // const [updateMasterPhotoWorks] = useMutation(updateMasterPhotoWorksMutation, {
  //   onCompleted: () => {
  //     refetchMaster()
  //   },
  // })

  // const [updateMasterPhotoDiploma] = useMutation(
  //   updateMasterPhotoDiplomaMutation,
  //   {
  //     onCompleted: () => {
  //       refetchMaster()
  //     },
  //   },
  // )

  const { refetch: refetchReviews } = useQuery(reviewsForMaster, {
    variables: { originId: master.id },
    skip: true,
    onCompleted: res => {
      setReviews(res.reviewsForMaster)
    },
  })

  // const { refetch: refetchBrands } = useQuery(brandQuery, {
  //   variables: { id: master.id },
  //   skip: true,
  //   onCompleted: res => {
  //     if (res) {
  //       setBrands(res.brandsMaster)
  //     }
  //   },
  // })

  // const masterSpecializationsCatalog = catalogOrDefault(
  //   catalogs?.masterSpecializationsCatalog,
  // )

  // const salonServicesMasterCatalog = catalogOrDefault(
  //   catalogs?.salonServicesMasterCatalog,
  // )

  // const salonsId = master?.salonIds || []

  // const { refetch: refetchScore, loading: loadingScore } = useQuery(
  //   scoreMaster,
  //   {
  //     variables: { id: master.id },
  //     onCompleted: res => {
  //       setDataScore(res.scoreMaster)
  //     },
  //   },
  // )

  // const onAdd = photoId => {
  //   const oldArr = master?.photosWorks
  //     ? master?.photosWorks.map(item => item.id)
  //     : []
  //   const newArr = [...oldArr, photoId]
  //   updateMasterPhotoWorks({
  //     variables: { input: { photoWorksIds: newArr, id: master?.id } },
  //   })
  // }

  // const onDelete = photoId => {
  //   const oldArr = master?.photosWorks
  //     ? master?.photosWorks.map(item => item.id)
  //     : []
  //   const newArr = oldArr.filter(item => item !== photoId)
  //   updateMasterPhotoWorks({
  //     variables: { input: { photoWorksIds: newArr, id: master?.id } },
  //   })
  // }

  // const onAddDiploma = photoId => {
  //   const oldArr = master?.photosDiploma
  //     ? master?.photosDiploma.map(item => item.id)
  //     : []
  //   const newArr = [...oldArr, photoId]
  //   updateMasterPhotoDiploma({
  //     variables: { input: { photoDiplomaIds: newArr, id: master?.id } },
  //   })
  // }

  // const onDeleteDiploma = photoId => {
  //   const oldArr = master?.photosDiploma
  //     ? master?.photosDiploma.map(item => item.id)
  //     : []
  //   const newArr = oldArr.filter(item => item !== photoId)
  //   updateMasterPhotoDiploma({
  //     variables: { input: { photoDiplomaIds: newArr, id: master?.id } },
  //   })
  // }

  // const [removeBrands] = useMutation(removeUserBrandsMutation, {
  //   onCompleted: () => {
  //     refetchBrands()
  //   },
  // })

  // const handleRemoveBrand = id => {
  //   removeBrands({
  //     variables: {
  //       ids: [id],
  //       masterId: me?.master?.id,
  //     },
  //   })
  // }

  // const [removeSalons] = useMutation(removeUserSalonsMutation, {
  //   onCompleted: () => {
  //     refetchMaster()
  //   },
  // })

  // const handleRemoveSalon = id => {
  //   removeSalons({
  //     variables: {
  //       ids: [id],
  //       masterId: me?.master?.id,
  //     },
  //   })
  // }

  const isOwner = me?.master?.id === master?.id

  return (
    <MainLayout>
      <Head>
        {master?.seo?.title ? <title>{master?.seo?.title}</title> : null}
        {master?.seo?.description ? (
          <meta name="description" content={master?.seo?.description} />
        ) : null}
        {master?.photo?.url ? (
          <meta property="og:image" content={master?.photo?.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <Header
          me={me}
          master={master}
          isOwner={isOwner}
          // refetchMaster={refetchMaster}
          // refetchScore={refetchScore}
          // scoreMasterCount={dataScore?.value}
          // loadingScore={loadingScore}
          // masterSpecializationsCatalog={masterSpecializationsCatalog}
        />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          noPadding
          tabs={[
            { id: 1, text: 'О себе', link: '#about', show: true },
            {
              id: 2,
              text: 'Услуги',
              link: '#services',
              count: servicesCount,
              show: master?.serviceCategories?.length || isOwner,
            },
            {
              id: 3,
              text: 'Примеры',
              link: '#portfolio',
              count: master?.photosWorks?.length,
              show: master?.photosWorks?.length || isOwner,
            },
            {
              id: 4,
              text: 'Дипломы',
              link: '#diploms',
              count: master?.photosDiploma?.length,
              show: master?.photosDiploma?.length || isOwner,
            },
            {
              id: 5,
              text: 'Бренды',
              link: '#brands',
              count: master?.brands?.length,
              show: master?.brands?.length || isOwner,
            },
            {
              id: 6,
              text: 'Отзывы',
              link: '#reviews',
              count: master?.reviews?.length,
              show: true,
            },
            { id: 7, text: 'Контакты', link: '#contacts', show: true },
          ]}
        />
        <About master={master} />
        {master?.serviceCategories?.length || isOwner ? (
          <ServicesForClient
            serviceCategories={master?.serviceCategories}
            isOwner={isOwner}
            master={master}
            // masterDataQuery={refetchMaster}
            // edit={editClientServices}
            // setEdit={setEditClientServices}
            count={master?.service?.length}
          />
        ) : null}
        {master?.serviceCategories?.length || isOwner ? (
          <MobileServicesForClient
            serviceCategories={master?.serviceCategories}
            master={master}
            isOwner={isOwner}
            // refetchMaster={refetchMaster}
          />
        ) : null}
        {master?.photosWorks?.length || isOwner ? (
          <>
            <Slider
              type="portfolio"
              items={master?.photosWorks}
              isOwner={isOwner}
              title="Примеры работ"
              isEditing={isPortfolioEditing}
              setIsEditing={setIsPortfolioEditing}
              // deleteFunction={onDelete}
              pt={52}
              pb={31}
            >
              {isPortfolioEditing ? <PhotoAdd onAdd={onAdd} /> : null}
              {isPortfolioEditing && isOwner ? (
                <NoItemsText>Нажмите плюс, чтобы добавить работы</NoItemsText>
              ) : !master?.photosWorks?.length && isOwner ? (
                <NoItemsText>
                  Нет добавленных работ. Нажмите на карандаш, чтобы добавить
                  работы в портфолио
                </NoItemsText>
              ) : null}
            </Slider>
          </>
        ) : null}
        {master?.photosDiploma?.length || isOwner ? (
          <Slider
            type="diploms"
            items={master?.photosDiploma}
            isOwner={isOwner}
            title="Дипломы и сертификаты"
            isEditing={isDiplomsEditing}
            setIsEditing={setIsDiplomsEditing}
            // deleteFunction={onDeleteDiploma}
            pt={52}
            pb={31}
          >
            <>
              {isDiplomsEditing ? <PhotoAdd onAdd={onAddDiploma} /> : null}
              {isDiplomsEditing && isOwner ? (
                <NoItemsText>
                  Нажмите плюс, чтобы добавить сертификаты или дипломы
                </NoItemsText>
              ) : !master?.photosDiploma?.length && isOwner ? (
                <NoItemsText>
                  Нет добавленных работ. Нажмите на карандаш, чтобы добавить
                  сертификаты или дипломы в портфолио
                </NoItemsText>
              ) : null}
            </>
          </Slider>
        ) : null}
        {master?.salons?.length || isOwner ? (
          // <SalonMasterSlider
          //   title="Салоны, в которых я работаю"
          //   isOwner={isOwner}
          //   me={me}
          //   master={master}
          //   salonsId={salonsId}
          //   loading={false}
          //   catalogs={catalogs}
          //   refetchMaster={refetchMaster}
          // />
          <Slider
            type="salons"
            items={master.salons}
            isOwner={isOwner}
            title="Салоны, в которых я работаю"
            isEditing={isSalonsEditing}
            setIsEditing={setIsSalonsEditing}
            // deleteFunction={handleRemoveSalon}
            pt={52}
            pb={31}
          >
            <>
              {!master?.salons?.length ? (
                !isSalonsEditing ? (
                  <NoItemsText>
                    Нет добавленных салонов. Нажмите на карандаш, чтобы добавить
                    салоны
                  </NoItemsText>
                ) : null
              ) : null}
              {isSalonsEditing ? (
                <AddSalons master={master} refetchMaster={refetchMaster} />
              ) : null}
            </>
          </Slider>
        ) : null}
        {master?.brands?.length || isOwner ? (
          <Slider
            type="brands"
            items={master?.brands}
            isOwner={isOwner}
            title="Бренды, с которыми я работаю"
            isEditing={isBrandsEditing}
            setIsEditing={setIsBrandsEditing}
            // deleteFunction={handleRemoveBrand}
            pt={52}
            pb={31}
            noAll
            noAllButton
            noBottom
          >
            <>
              {!master?.brands?.length && !isBrandsEditing && (
                <NoItemsText>
                  Нет добавленных брендов. Нажмите на карандаш, чтобы добавить
                  бренды
                </NoItemsText>
              )}
              {isBrandsEditing ? (
                <AddBrands refetch={refetchBrands} master={me?.master} />
              ) : null}
            </>
          </Slider>
        ) : null}
        {/* {me?.salons?.length && master?.resume ? (
          <Resume master={master} />
        ) : null} */}
        <ReviewsMaster
          data={master?.reviews}
          me={me}
          masterId={master.id}
          refetchReviews={refetchReviews}
        />
        <Contacts
          phone={master?.masterPhone}
          email={master?.masterEmail}
          address={master?.masterAddress}
          addressCoordinates={{
            latitude: master?.latitude,
            longitude: master?.longitude,
          }}
          socials={master?.socialNetworks}
          haveTelegram={master?.haveTelegram}
          haveWhatsApp={master?.haveWhatsApp}
          haveViber={master?.haveViber}
        />
        <InviteMaster me={me} />
        <Line text="Вы мастер или владелец салона? Расскажите о себе и мы поможем найти новых клиентов и мастеров!" />
        {/* <Slider
          type="masters"
          title="Ближайшие мастера"
          items={data?.mastersRandom || []}
          loading={loading}
          noBottom
          noAll
          noAllButton
          catalog={masterSpecializationsCatalog}
          bgColor="#f2f0f0"
          pt={102}
          pb={91}
        /> */}
      </>
    </MainLayout>
  )
}

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo()

  const id = params.id

  const masterQueryRes = await apolloClient.query({
    query: getMaster,
    variables: { id },
  })

  const master = masterQueryRes?.data?.master

  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: query?.city || '',
  //     count: 1,
  //   },
  // })

  // if (!id || !city?.data?.citySuggestions[0]?.data?.city) {
  //   return {
  //     notFound: true,
  //   }
  // }

  if (!id) {
    return {
      notFound: true,
    }
  }

  return addApolloState(apolloClient, {
    props: {
      masterData: master,
    },
  })
}

export default Master

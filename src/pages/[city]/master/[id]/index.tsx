import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import { useQuery } from '@apollo/client'
import { reviewsForMaster } from '../../../../_graphql-legacy/master/reviewsForMaster'
import MainLayout from '../../../../layouts/MainLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import Header from '../../../../components/pages/Master/ViewMaster/components/Header'
import TabsSlider from '../../../../components/ui/TabsSlider'
import About from '../../../../components/pages/Master/ViewMaster/components/About'
import MobileServicesForClient from '../../../../components/pages/Master/ViewMaster/components/MobileServicesComponent/MobileServicesForClient'
import ReviewsMaster from '../../../../components/pages/Master/ViewMaster/components/MasterReviews'
import Line from '../../../../components/pages/MainPage/components/Line'
import InviteMaster from '../../../../components/pages/Master/ViewMaster/components/Invite'
import Contacts from '../../../../components/pages/Master/ViewMaster/components/Contacts'
import ServicesForClient from '../../../../components/pages/Master/ViewMaster/components/ServicesForClient'
import Slider from '../../../../components/blocks/Slider'
import AddBrands from '../../../../components/pages/Master/AddBrands'
import AddSalons from '../../../../components/pages/Master/AddSalons'
import PhotoAdd from '../../../../components/pages/Master/ViewMaster/components/PhotoAdd'
import { NoItemsText } from '../../../../styles/common'
import { getMaster } from 'src/api/graphql/master/queries/getMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { getServicesByCategory } from 'src/utils/serviceCatalog'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { GetServerSideProps } from 'next'
import Resume from 'src/components/pages/Master/ViewMaster/components/Resume'
import { cyrToTranslit } from 'src/utils/translit'
import { defaultCitySlug, defaultcCitiesList } from 'src/api/authConfig'

const Master: FC<Props> = ({ masterData, randomMasters }) => {
  const [master, setMaster] = useState(masterData)
  const { me, city } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)
  const [editClientServices, setEditClientServices] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isBrandsEditing, setIsBrandsEditing] = useState(false)
  const [isSalonsEditing, setIsSalonsEditing] = useState(false)
  const [isPortfolioEditing, setIsPortfolioEditing] = useState(false)
  const [isDiplomsEditing, setIsDiplomsEditing] = useState(false)

  const { refetch: getMe, loading: meLoading } = useQuery(getMasters, {
    variables: { city: 'Москва', itemsCount: 10 },
    onCompleted: data => {
      console.log(data)
    },
    onError: err => {
      console.log(err)
    },
  })

  console.log('randomMasters', randomMasters)
  console.log(city)

  useEffect(() => {
    if (masterData?.data) {
      setMaster(flattenStrapiResponse(masterData.data))
    }
    // refetch()
  }, [masterData])

  const isOwner = me?.master?.id === master?.id

  const servicesData = getServicesByCategory(master?.services)

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
              count: master?.services?.length,
              show: master?.services?.length || isOwner,
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
        {master?.services?.length || isOwner ? (
          <ServicesForClient
            servicesData={servicesData}
            isOwner={isOwner}
            master={master}
            // masterDataQuery={refetchMaster}
            // edit={editClientServices}
            // setEdit={setEditClientServices}
            count={master?.service?.length}
          />
        ) : null}
        {master?.services?.length || isOwner ? (
          <MobileServicesForClient
            servicesData={servicesData}
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
        {me?.salons?.length && master?.resume ? (
          <Resume master={master} />
        ) : null}
        <ReviewsMaster
          data={master?.reviews}
          me={me}
          masterId={master.id}
          refetchReviews={() => {}}
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
        <Slider
          type="masters"
          title="Ближайшие мастера"
          items={randomMasters || []}
          // loading={loading}
          noBottom
          noAll
          noAllButton
          // catalog={masterSpecializationsCatalog}
          bgColor="#f2f0f0"
          pt={102}
          pb={91}
        />
      </>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const apolloClient = initializeApollo()

  const id = params?.id

  console.log(query.city)

  const data = await Promise.all([
    apolloClient.query({
      query: getMaster,
      variables: { id },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        citySlug: query?.city || defaultCitySlug,
        excludeId: id,
        itemsCount: 10,
      },
    }),
  ])

  const masterData = flattenStrapiResponse(data[0]?.data?.master?.data)
  const randomMasters = flattenStrapiResponse(data[1]?.data?.masters?.data)

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
      masterData,
      randomMasters,
    },
  })
}

export default Master

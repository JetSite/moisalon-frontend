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
import ReviewsMaster from '../../../../components/pages/Master/ViewMaster/components/MasterReviews/index'
import Line from '../../../../components/pages/MainPage/components/Line'
import InviteMaster from '../../../../components/pages/Master/ViewMaster/components/Invite'
import Contacts from '../../../../components/pages/Master/ViewMaster/components/Contacts'
import ServicesForClient from '../../../../components/pages/Master/ViewMaster/components/ServicesForClient'
import Slider from '../../../../components/blocks/Slider'
import AddBrands from '../../../../components/pages/Master/AddBrands'
import AddSalons from '../../../../components/pages/Master/AddSalons'
import PhotoAdd from '../../../../components/pages/Master/ViewMaster/components/PhotoAdd'
import { NoItemsText } from '../../../../styles/common'
import { MASTER_PAGE } from 'src/api/graphql/master/queries/masterPage'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { getServicesByCategory } from 'src/utils/serviceCatalog'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { GetServerSideProps } from 'next'
import Resume from 'src/components/pages/Master/ViewMaster/components/Resume'
import { defaultValues, defaultcCitiesList } from 'src/api/authConfig'
import { fetchCity } from 'src/api/utils/fetchCity'
import { IMaster } from 'src/types/masters'
import { ICity } from 'src/types'
import { getGroupedServices } from 'src/utils/getGrupedServices'
import { getRating } from 'src/utils/newUtils/getRating'
import { Nullable } from 'src/types/common'

interface Props {
  masterData: IMaster
  randomMasters: IMaster[]
  cityData: ICity
}

const Master: FC<Props> = ({ masterData, randomMasters, cityData }) => {
  const [master, setMaster] = useState<IMaster>(masterData)
  const { me, city } = useAuthStore(getStoreData)
  const { catalogs } = useBaseStore(getStoreData)
  const [editClientServices, setEditClientServices] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isBrandsEditing, setIsBrandsEditing] = useState(false)
  const [isSalonsEditing, setIsSalonsEditing] = useState(false)
  const [isPortfolioEditing, setIsPortfolioEditing] = useState(false)
  const [isDiplomsEditing, setIsDiplomsEditing] = useState(false)
  const salonServicesMasterCatalog: any[] = []

  const isOwner = !!me?.owner?.masters.find(e => e.id === master?.id)

  const servicesData = getServicesByCategory(master?.services)

  console.log(master)

  return (
    <MainLayout>
      {/* <Head>
        {master?.seo?.title ? <title>{master?.seo?.title}</title> : null}
        {master?.seo?.description ? (
          <meta name="description" content={master?.seo?.description} />
        ) : null}
        {master?.photo?.url ? (
          <meta property="og:image" content={master?.photo?.url} />
        ) : null}
      </Head> */}
      <>
        <SearchBlock />
        <Header master={master} isOwner={isOwner} />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { id: 1, text: 'О себе', link: '#about', show: true },
            {
              id: 2,
              text: 'Услуги',
              link: '#services',
              count: master?.services?.length,
              show: !!master?.services?.length || isOwner,
            },
            {
              id: 3,
              text: 'Примеры',
              link: '#portfolio',
              count: master?.photosWorks?.length,
              show: !!master?.photosWorks?.length || isOwner,
            },
            {
              id: 4,
              text: 'Дипломы',
              link: '#diploms',
              count: master?.photosDiploma?.length,
              show: !!master?.photosDiploma?.length || isOwner,
            },
            {
              id: 5,
              text: 'Бренды',
              link: '#brands',
              count: master?.brands?.length,
              show: !!master?.brands?.length || isOwner,
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
            salonServicesMasterCatalog={salonServicesMasterCatalog}
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
              city={city}
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
              {isPortfolioEditing ? <PhotoAdd onAdd={() => {}} /> : null}
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
            city={city}
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
              {isDiplomsEditing ? <PhotoAdd onAdd={() => {}} /> : null}
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
          <Slider
            city={city}
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
                <AddSalons master={master} refetchMaster={() => {}} />
              ) : null}
            </>
          </Slider>
        ) : null}
        {master?.brands?.length || isOwner ? (
          <Slider
            city={city}
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
                <AddBrands refetch={() => {}} master={me?.master} />
              ) : null}
            </>
          </Slider>
        ) : null}
        {me?.salons?.length && master?.resume ? (
          <Resume master={master} />
        ) : null}
        <ReviewsMaster reviews={master?.reviews} masterId={master?.id} />
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
          city={city}
        />
      </>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Nullable<Props>> = async ({
  params,
  query,
  res,
}) => {
  const apolloClient = initializeApollo()
  const id = params?.id
  const cityData = await fetchCity(query.city as string)

  const data = await Promise.all([
    apolloClient.query({
      query: MASTER_PAGE,
      variables: { id },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        citySlug: cityData?.citySlug,
        excludeId: id,
        itemsCount: 10,
      },
    }),
  ])

  const masterData: IMaster | null =
    flattenStrapiResponse(data[0]?.data?.master?.data) || null
  const randomMasters: IMaster[] =
    flattenStrapiResponse(data[1]?.data?.masters?.data) || []

  const reviewsCount = masterData?.reviews?.length || 0
  const { rating, ratingCount } = getRating(masterData?.ratings)

  const salons =
    masterData?.salons.map(e => {
      const reviewsCount = e.reviews?.length || 0
      const { rating, ratingCount } = getRating(e.ratings)
      return { ...e, rating, ratingCount, reviewsCount }
    }) || []

  return {
    notFound: !id || !cityData || !masterData,
    props: {
      masterData: masterData
        ? { ...masterData, salons, rating, ratingCount, reviewsCount }
        : null,
      randomMasters: randomMasters.map(e => {
        const reviewsCount = e.reviews?.length
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      cityData,
    },
  }
}

export default Master

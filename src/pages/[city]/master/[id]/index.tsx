import { FC, useEffect, useState, Fragment } from 'react'
import { initializeApollo } from '../../../../api/apollo-client'
import { useMutation } from '@apollo/client'
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
import AddSalons from '../../../../components/pages/Master/AddSalons'
import { NoItemsText } from '../../../../styles/common'
import { MASTER_PAGE } from 'src/api/graphql/master/queries/masterPage'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import {
  IGroupedServices,
  getServicesByCategory,
} from 'src/utils/serviceCatalog'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { GetServerSideProps } from 'next'
import { fetchCity } from 'src/api/utils/fetchCity'
import { IMaster } from 'src/types/masters'
import { ICity, IPhoto } from 'src/types'
import { getRating } from 'src/utils/newUtils/getRating'
import { Nullable } from 'src/types/common'
import Resume from 'src/components/pages/Master/ViewMaster/components/Resume'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import AddBrands from 'src/components/pages/Master/AddBrands'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { IServiceCategory, IServices } from 'src/types/services'
import AutoFocusedForm from 'src/components/blocks/Form/AutoFocusedForm'
import PhotoArrayField from 'src/components/blocks/Form/PhotoArrayField'
import MasterPage from 'src/components/pages/MasterPage'

interface Props {
  masterData: IMaster
  randomMasters: IMaster[]
  allServices: IServiceCategory[]
  cityData: ICity
  meta: {
    title: string
    description: string
    image: string
    url: string
  }
}

const Master: FC<Props> = ({
  masterData: master,
  randomMasters,
  allServices,
}) => {
  // const [master, setMaster] = useState<IMaster>(masterData)
  const { user, city } = useAuthStore(getStoreData)
  const [activeTab, setActiveTab] = useState(0)
  const [isBrandsEditing, setIsBrandsEditing] = useState(false)
  const [isSalonsEditing, setIsSalonsEditing] = useState(false)
  const [isPortfolioEditing, setIsPortfolioEditing] = useState(false)
  const [isDiplomsEditing, setIsDiplomsEditing] = useState(false)
  const [works, setWorks] = useState<IPhoto[]>(master?.photosWorks || [])
  const [diplomas, setDiplomas] = useState<IPhoto[]>(
    master?.photosDiploma || [],
  )
  const [salons, setSalons] = useState<ISalon[]>(master?.salons || [])
  const [brands, setBrands] = useState<IBrand[]>(master?.brands || [])
  const [services, setServices] = useState<IServices[]>(master?.services || [])

  const isOwner = !!user?.owner?.masters?.find(e => e.id === master?.id)
  const servicesData: IGroupedServices[] = getServicesByCategory(services)

  const [updateMaster] = useMutation(UPDATE_MASTER)

  useEffect(() => {
    if (works.length !== master.photosWorks.length) {
      updateMaster({
        variables: {
          masterId: master.id,
          input: {
            photosWorks: [...works.map(e => e.id)],
          },
        },
      })
    }
  }, [works])

  useEffect(() => {
    if (master?.photosDiploma?.length !== diplomas.length) {
      updateMaster({
        variables: {
          masterId: master.id,
          input: {
            photosDiploma: [...diplomas.map(e => e.id)],
          },
        },
      })
    }
  }, [diplomas])

  // const addDiplomasHandler = (photo: IPhoto) => {
  //   setDiplomas(prevState => [...prevState, photo])
  // }

  useEffect(() => {
    if (salons.length !== master.salons.length) {
      updateMaster({
        variables: {
          masterId: master.id,
          input: {
            salons: salons.map(salon => salon.id),
          },
        },
      })
    }
  }, [salons])

  const handleRemoveSalon = (id: string) => {
    setSalons(prevState => prevState.filter(e => e.id !== id))
  }

  useEffect(() => {
    if (brands.length !== master.brands.length) {
      updateMaster({
        variables: {
          masterId: master.id,
          input: {
            brands: brands.map(salon => salon.id),
          },
        },
      })
    }
  }, [brands])

  const handleRemoveBrand = (id: string) => {
    setBrands(prevState => prevState.filter(e => e.id !== id))
  }

  return (
    <MainLayout>
      <>
        <SearchBlock />
        <Header
          master={master}
          isOwner={isOwner}
          categoriesName={servicesData.map(e => e.category).join(', ')}
        />
        <TabsSlider
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { id: 1, text: 'О себе', link: '#about', show: true },
            {
              id: 2,
              text: 'Услуги',
              link: '#services',
              count: services?.length,
              show: !!services?.length || isOwner,
            },
            {
              id: 3,
              text: 'Примеры',
              link: '#portfolio',
              count: works?.length,
              show: !!works?.length || isOwner,
            },
            {
              id: 4,
              text: 'Дипломы',
              link: '#diploms',
              count: diplomas?.length,
              show: !!diplomas?.length || isOwner,
            },
            {
              id: 5,
              text: 'Бренды',
              link: '#brands',
              count: brands?.length,
              show: !!brands?.length || isOwner,
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
            entries={master}
            allServices={allServices}
            setServices={setServices}
          />
        ) : null}
        {master?.services?.length || isOwner ? (
          <MobileServicesForClient
            servicesData={servicesData}
            entries={master}
            isOwner={isOwner}
            allServices={allServices}
            setServices={setServices}
          />
        ) : null}
        {works?.length || isOwner ? (
          <>
            <Slider
              id="portfolio"
              city={city}
              type="photos"
              items={works}
              isOwner={isOwner}
              title="Примеры работ"
              isEditing={isPortfolioEditing}
              setIsEditing={setIsPortfolioEditing}
              pt={52}
              pb={31}
            >
              {isPortfolioEditing ? (
                <AutoFocusedForm
                  initialValues={{ photos: master.photosWorks }}
                  render={() => {
                    return (
                      <PhotoArrayField
                        photoType="salonPhoto"
                        kind="small"
                        setPhotosArray={setWorks}
                      />
                    )
                  }}
                />
              ) : null}
              {isPortfolioEditing && isOwner ? (
                <NoItemsText>Нажмите плюс, чтобы добавить работы</NoItemsText>
              ) : !works?.length && isOwner ? (
                <NoItemsText>
                  Нет добавленных работ. Нажмите на карандаш, чтобы добавить
                  работы в портфолио
                </NoItemsText>
              ) : null}
            </Slider>
          </>
        ) : null}
        {diplomas?.length || isOwner ? (
          <Slider
            id="diploms"
            city={city}
            type="photos"
            items={diplomas}
            isOwner={isOwner}
            title="Дипломы и сертификаты"
            isEditing={isDiplomsEditing}
            setIsEditing={setIsDiplomsEditing}
            // deleteFunction={onDeleteDiploma}
            pt={52}
            pb={31}
          >
            <>
              {isDiplomsEditing ? (
                <AutoFocusedForm
                  initialValues={{ photos: master.photosDiploma }}
                  render={() => {
                    return (
                      <PhotoArrayField
                        photoType="salonPhoto"
                        kind="small"
                        setPhotosArray={setDiplomas}
                      />
                    )
                  }}
                />
              ) : null}
              {isDiplomsEditing && isOwner ? (
                <NoItemsText>
                  Нажмите плюс, чтобы добавить сертификаты или дипломы
                </NoItemsText>
              ) : !diplomas?.length && isOwner ? (
                <NoItemsText>
                  Нет добавленных дипломов или сертификатов. Нажмите на
                  карандаш, чтобы добавить сертификаты или дипломы в портфолио
                </NoItemsText>
              ) : null}
            </>
          </Slider>
        ) : null}
        {salons?.length || isOwner ? (
          <Slider
            city={city}
            type="salons"
            items={salons}
            isOwner={isOwner}
            title="Салоны, в которых я работаю"
            isEditing={isSalonsEditing}
            setIsEditing={setIsSalonsEditing}
            deleteFunction={handleRemoveSalon}
            pt={52}
            pb={31}
          >
            <>
              {!salons?.length ? (
                !isSalonsEditing ? (
                  <NoItemsText>
                    Нет добавленных салонов. Нажмите на карандаш, чтобы добавить
                    салоны
                  </NoItemsText>
                ) : null
              ) : null}
              {isSalonsEditing ? (
                <AddSalons
                  master={master}
                  salons={salons}
                  setSalons={setSalons}
                />
              ) : null}
            </>
          </Slider>
        ) : null}
        {brands?.length || isOwner ? (
          <Slider
            city={city}
            type="brands"
            items={brands}
            isOwner={isOwner}
            title="Бренды, с которыми я работаю"
            isEditing={isBrandsEditing}
            setIsEditing={setIsBrandsEditing}
            deleteFunction={handleRemoveBrand}
            pt={52}
            pb={31}
            noAll
            noAllButton
            noBottom
          >
            <>
              {!brands?.length && !isBrandsEditing && (
                <NoItemsText>
                  Нет добавленных брендов. Нажмите на карандаш, чтобы добавить
                  бренды
                </NoItemsText>
              )}
              {isBrandsEditing ? (
                <AddBrands
                  entries={master}
                  brands={brands}
                  setBrands={setBrands}
                />
              ) : null}
            </>
          </Slider>
        ) : null}
        {master?.resume ? <Resume resume={master.resume} /> : null}
        <ReviewsMaster reviews={master?.reviews} masterId={master?.id} />
        <Contacts
          phone={master?.phone || master?.phone}
          email={master?.email || master?.email}
          address={master?.address}
          addressCoordinates={{
            latitude: master?.latitude,
            longitude: master?.longitude,
          }}
          socials={master?.socialNetworks}
          haveTelegram={master?.haveTelegram}
          haveWhatsApp={master?.haveWhatsApp}
          haveViber={master?.haveViber}
        />
        <InviteMaster me={user} />
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
  const id = params?.['id']
  const cityData = await fetchCity(query['city'] as string)

  const data = await Promise.all([
    apolloClient.query({
      query: MASTER_PAGE,
      variables: { id },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        slug: cityData?.slug,
        excludeId: id,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getServiceCategories,
    }),
  ])

  const masterData: IMaster | null =
    flattenStrapiResponse(data[0]?.data?.master?.data) || null
  const randomMasters: IMaster[] =
    flattenStrapiResponse(data[1]?.data?.masters?.data) || []
  const allServices =
    flattenStrapiResponse(data[2]?.data?.serviceCategories?.data) || []

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
      allServices,
      cityData,
      meta: {
        title: masterData?.name || `Мастер | MOI salon`,
        description:
          masterData?.seoDescription ||
          `Мастер в ${cityData.name}. Услуги, портфолио, отзывы и контакты на MOI salon`,
        image: masterData?.photo?.url || '/masters-page-right.png',
        url: `https://moi.salon/${cityData.name}/master/${masterData?.id}`,
      },
    },
  }
}

export default Master

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  StaticProps,
  getEntityStaticPaths,
  getStaticPropsForEntityPage,
} from 'src/api/utils/entityGetStaticPaths'
import { NextPage } from 'next'
import Header from 'src/components/pages/Salon/ViewSalon/components/Header'
import About from 'src/components/pages/Salon/ViewSalon/components/About'
import Contacts from 'src/components/pages/Salon/ViewSalon/components/Contacts'
import { ISalonPage } from 'src/types/salon'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import Slider from '../../../../../components/blocks/Slider'
import Service from '../../../../../components/pages/Rent/ViewRent/components/Service'
import RentSlider from '../../../../../components/pages/Rent/ViewRent/components/RentSlider'
import MainLayout from 'src/layouts/MainLayout'
import { RENT_STATIC_PATH } from 'src/api/graphql/entitiesQuery/staticPaths'

const DynamicPage: NextPage<StaticProps<ISalonPage>> = ({
  city,
  id,
  entity,
}) => {
  const router = useRouter()
  // useEffect(() => {
  //   router.push(`/${city}/entity/${id}`)
  // })

  return entity ? (
    <MainLayout>
      <Header salon={entity} isOwner={false} />
      <About salon={entity} />
      {entity.vacancies?.length ? (
        <Slider
          type="vacancies"
          title="Наши вакансии"
          items={entity.vacancies}
          city={entity.city}
        />
      ) : null}
      {entity.workplaces?.length ? (
        <RentSlider title="Аренда рабочих мест" salon={entity} />
      ) : null}
      {entity.services?.length ? <Service services={entity.services} /> : null}
      {entity.servicesM?.length ? (
        <Service title="Сервис для мастеров" services={entity.servicesM} />
      ) : null}
      {entity.masters.length ? (
        <Slider
          city={entity.city}
          type="masters"
          items={entity.masters}
          title="Наши мастера"
          bgColor="#f2f0f0"
          pt={52}
          pb={31}
          noBottom
          noAll
          noAllButton
        />
      ) : null}
      <Contacts
        phones={entity?.salonPhones}
        email={entity?.email}
        workingHours={entity?.workingHours}
        address={entity?.address}
        socialNetworkUrls={entity?.socialNetworks}
        metroStations={entity?.metro_stations}
        locationDirections={entity.locationDirections}
        coordinates={{ longitude: entity.longitude, latitude: entity.latitude }}
      />
    </MainLayout>
  ) : null
}

export const getStaticPaths = getEntityStaticPaths<ISalonPage>(
  RENT_STATIC_PATH,
  'salons',
)

export const getStaticProps = getStaticPropsForEntityPage<ISalonPage>(
  getSalonPage,
  'salon',
)

export default DynamicPage

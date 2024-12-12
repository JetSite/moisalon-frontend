import { useEffect } from 'react'

import { useRouter } from 'next/router'
import {
  StaticProps,
  getEntityStaticPaths,
  getStaticPropsForEntityPage,
} from 'src/api/utils/entityGetStaticPaths'
import { MASTERS_STATIC_PATH } from 'src/api/graphql/entitiesQuery/staticPaths'
import { NextPage } from 'next'
import Slider from '../../../../../components/blocks/Slider'
import Service from '../../../../../components/pages/Rent/ViewRent/components/Service'
import MainLayout from 'src/layouts/MainLayout'
import { MASTER_PAGE } from 'src/api/graphql/master/queries/masterPage'
import { IMaster } from 'src/types/masters'
import {
  IGroupedServices,
  getServicesByCategory,
} from 'src/utils/serviceCatalog'
import Header from 'src/components/pages/Master/ViewMaster/components/Header'
import About from 'src/components/pages/Master/ViewMaster/components/About'
import Contacts from 'src/components/pages/Master/ViewMaster/components/Contacts'

const DynamicPage: NextPage<StaticProps<IMaster>> = ({ city, id, entity }) => {
  const router = useRouter()
  const servicesData: IGroupedServices[] | null = entity
    ? getServicesByCategory(entity.services)
    : null

  // useEffect(() => {
  //   router.push(`/${city}/entity/${id}`)
  // })

  return entity ? (
    <MainLayout>
      <Header
        master={entity}
        isOwner={false}
        categoriesName={servicesData?.map(e => e.category).join(', ')}
      />
      {entity.description ? <About master={entity} /> : null}

      {entity.services?.length ? <Service services={entity.services} /> : null}

      {entity.salons.length ? (
        <Slider
          city={entity.city}
          type="salons"
          items={entity.salons}
          isOwner={false}
          title="Салоны, в которых я работаю"
          pt={52}
          pb={31}
        />
      ) : null}
      {entity.brands.length ? (
        <Slider
          city={entity.city}
          type="brands"
          items={entity.brands}
          isOwner={false}
          title="Бренды, с которыми я работаю"
          pt={52}
          pb={31}
          noAll
          noAllButton
          noBottom
        />
      ) : null}
      <Contacts
        phone={entity.phone}
        email={entity.email}
        address={entity.address}
        addressCoordinates={{
          latitude: entity.latitude,
          longitude: entity.longitude,
        }}
        socials={entity.socialNetworks}
        haveTelegram={entity.haveTelegram}
        haveWhatsApp={entity.haveWhatsApp}
        haveViber={entity.haveViber}
      />
    </MainLayout>
  ) : null
}

export const getStaticPaths = getEntityStaticPaths<IMaster>(
  MASTERS_STATIC_PATH,
  'masters',
)

export const getStaticProps = getStaticPropsForEntityPage<IMaster>(
  MASTER_PAGE,
  'master',
)

export default DynamicPage

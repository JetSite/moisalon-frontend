import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import RentSeat, { IRentSeatProps } from '../../components/pages/Salon/RentSeat'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { PAYMENT_METHODS } from 'src/api/graphql/paymentMethods/getPaymentMethods'
import { RENTAL_PERIODS } from 'src/api/graphql/salon/queries/getRentalPeriods'
import { GetServerSideProps, NextPage } from 'next'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { EQUIPMENT } from 'src/api/graphql/equipment/quries/getEquipment'
import { getGroupedServices } from 'src/utils/getGrupedServices'
import { Nullable } from 'src/types/common'
import { WORKPLACE_TYPES } from 'src/api/graphql/salon/queries/getWorkplaceTypes'
import { ISalonPage } from '@/types/salon'

type Props = IRentSeatProps

const RentSalonSeat: NextPage<Props> = ({
  salonData,
  rentalPeriods,
  groupedEquipments,
  paymentMethods,
  workplaceTypes,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    router.push('/login')
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else if (!salonData.rent) {
    router.push('/masterCabinet')
    return <CreatePageSkeleton />
  }

  const ownedSalonIds = me?.owner?.salons?.map(s => String(s.id)) || []
  if (!ownedSalonIds.includes(salonData.id)) {
    router.push('/masterCabinet')
    return <CreatePageSkeleton />
  }

  return (
    <RentSeat
      salonData={salonData}
      rentalPeriods={rentalPeriods}
      groupedEquipments={groupedEquipments}
      paymentMethods={paymentMethods}
      workplaceTypes={workplaceTypes}
    />
  )
}

export const getServerSideProps: GetServerSideProps<Nullable<Props>> = async ({
  query,
}) => {
  const apolloClient = initializeApollo()

  if (!query?.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/masterCabinet',
      },
    }
  }

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonPage,
      variables: {
        id: query?.id,
      },
    }),
    apolloClient.query({
      query: PAYMENT_METHODS,
    }),
    apolloClient.query({
      query: RENTAL_PERIODS,
    }),
    apolloClient.query({
      query: EQUIPMENT,
    }),
    apolloClient.query({
      query: WORKPLACE_TYPES,
    }),
  ])

  const salonData: ISalonPage = flattenStrapiResponse(data[0].data.salon)
  const paymentMethods = flattenStrapiResponse(data[1].data.paymentMethods)
  const rentalPeriods = flattenStrapiResponse(data[2].data.rentalPeriods)
  const equipments = flattenStrapiResponse(data[3].data.equipments)
  const workplaceTypes = flattenStrapiResponse(data[4].data.salonWorkplaceTypes)

  const groupedEquipments = getGroupedServices(equipments)

  return addApolloState(apolloClient, {
    props: {
      salonData,
      paymentMethods,
      rentalPeriods,
      groupedEquipments,
      workplaceTypes,
      meta: {
        title: `Аренда места в салоне ${salonData?.name || ''} | MOI salon`,
        description: `Управление арендой рабочего места в салоне красоты ${
          salonData?.name || ''
        } на платформе MOI salon`,
        image: '/salons-page-bg.png',
        url: `https://moi.salon/rentSalonSeat?id=${query?.id}`,
      },
      schema: {
        type: 'RealEstateListing',
        data: {
          name: `Аренда места в салоне ${salonData?.name || ''} | MOI salon`,
          description: `Управление арендой рабочего места в салоне красоты ${
            salonData?.name || ''
          } на платформе MOI salon`,
          url: `https://moi.salon/rentSalonSeat?id=${query?.id}`,
          image: 'https://moi.salon/salons-page-bg.png',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: salonData?.city?.name,
            addressCountry: 'RU',
            streetAddress: salonData?.address,
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            validFrom: salonData?.createdAt,
          },
          amenityFeature: [
            ...(salonData?.workingHours
              ? [
                  {
                    '@type': 'LocationFeatureSpecification',
                    name: 'Working Hours',
                    value: salonData.workingHours
                      .map(
                        hours =>
                          `${hours.dayOfWeek}: ${hours.startTime}-${hours.endTime}`,
                      )
                      .join(', '),
                  },
                ]
              : []),
          ],
        },
      },
    },
  })
}

export default RentSalonSeat

import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import SalonCabinet, {
  ISalonCabinetProps,
} from '../../components/pages/Salon/SalonCabinet'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { Nullable } from 'src/types/common'
import { GetServerSideProps, NextPage } from 'next'

type Props = ISalonCabinetProps

const SalonCabinetPage: NextPage<Props> = ({ salonData }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <SalonCabinet salonData={salonData} />
  }
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

  const data = await apolloClient.query({
    query: getSalonPage,
    variables: {
      id: query?.id,
    },
  })

  const salonData = flattenStrapiResponse(data.data.salon) || null

  return addApolloState(apolloClient, {
    props: {
      salonData,
      meta: {
        title: salonData?.name
          ? `Личный кабинет салона ${salonData.name} | MOI salon`
          : 'Личный кабинет салона | MOI salon',
        description:
          salonData?.description ||
          'Управление профилем салона на платформе MOI salon',
        image: salonData?.photos?.[0]?.url || '/salons-page-bg.jpg',
        url: `https://moi.salon/salonCabinet?id=${query?.id}`,
      },
      schema: {
        type: 'ProfilePage',
        data: {
          name: salonData?.name
            ? `Личный кабинет салона ${salonData.name} | MOI salon`
            : 'Личный кабинет салона | MOI salon',
          description:
            salonData?.description ||
            'Управление профилем салона на платформе MOI salon',
          url: `https://moi.salon/salonCabinet?id=${query?.id}`,
          image: salonData?.photos?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${salonData.photos[0].url}`
            : 'https://moi.salon/salons-page-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'BeautySalon',
            name: salonData?.name,
            description: salonData?.description,
            image: salonData?.photos?.[0]?.url
              ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${salonData.photos[0].url}`
              : 'https://moi.salon/salons-page-bg.jpg',
            address: {
              '@type': 'PostalAddress',
              addressLocality: salonData?.city?.name,
              addressCountry: 'RU',
              streetAddress: salonData?.address,
            },
            aggregateRating: salonData?.rating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: salonData.rating,
                  ratingCount: salonData.ratingCount,
                  reviewCount: salonData.reviews?.length || 0,
                }
              : undefined,
          },
        },
      },
    },
  })
}

export default SalonCabinetPage

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
import { Fragment } from 'react'
import MainHead from '../MainHead'

type Props = ISalonCabinetProps

const SalonCabinetPage: NextPage<Props> = ({ salonData }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return (
      <Fragment>
        <MainHead
          title="Личный кабинет салона | MOI salon"
          description="Управление профилем салона на платформе MOI salon"
          image="/salons-page-bg.jpg"
        />
        <CreatePageSkeleton />
      </Fragment>
    )
  }
  if (me && !me.info) {
    router.push('/login')
    return (
      <Fragment>
        <MainHead
          title="Личный кабинет салона | MOI salon"
          description="Управление профилем салона на платформе MOI salon"
          image="/salons-page-bg.jpg"
        />
        <CreatePageSkeleton />
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <MainHead
          title={`Личный кабинет ${salonData?.name || 'салона'} | MOI salon`}
          description="Управление профилем салона, услугами и расписанием на платформе MOI salon"
          image={salonData?.photo?.url || '/salons-page-bg.jpg'}
        />
        <SalonCabinet salonData={salonData} />
      </Fragment>
    )
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
    props: { salonData },
  })
}

export default SalonCabinetPage

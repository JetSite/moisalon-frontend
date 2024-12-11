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

interface Props extends ISalonCabinetProps {}

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
    props: { salonData },
  })
}

export default SalonCabinetPage

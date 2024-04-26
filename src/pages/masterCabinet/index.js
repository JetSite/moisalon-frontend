import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import MasterCabinet from '../../components/pages/Master/MasterCabinet'
import { userBrandsQuery } from '../../_graphql-legacy/brand/userBrandsQuery'
import { userOrders } from '../../_graphql-legacy/userOrders'
import Cabinet from '../../components/blocks/Cabinet'

import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

const CabinetPage = () => {
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)
  const router = useRouter()
  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: res => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      })
    },
  })
  const { data: brands } = useQuery(userBrandsQuery)

  const userBrands = brands?.userBrands || []

  const { data: ordersData } = useQuery(userOrders)
  const orders = ordersData?.ordersUser

  const meData = me
    ? {
        info: me?.info,
        master: me?.master,
        salons: me?.salons,
        requests: me?.rentalRequests,
        locationByIp: me?.locationByIp,
        userBrands,
        orders,
      }
    : null

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return !meData?.info?.displayName ||
      !meData?.info?.defaultCity ||
      !meData?.info?.phoneNumber ||
      !meData?.info?.email ? (
      <Cabinet refetch={refetch} currentMe={meData} />
    ) : (
      <MasterCabinet currentMe={meData} refetch={refetch} />
    )
  }
}

export default CabinetPage

import { useLazyQuery, useQuery } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getMe } from 'src/api/graphql/me/queries/getMe'
import { getCookie } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'
import { authConfig } from 'src/api/authConfig'
import { FC, useEffect } from 'react'
import CreatePageSkeleton from 'src/components/ui/ContentSkeleton/CreatePageSkeleton'
import Cabinet from 'src/components/blocks/Cabinet'
import MasterCabinet from 'src/components/pages/Master/MasterCabinet'
interface Props {
  accessToken?: string
}

const CabinetPage: FC<Props> = ({ accessToken }) => {
  const { me, loading } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  if (loading || !me) return <CreatePageSkeleton />

  return !me.info?.username ||
    // !me.info?.city?.cityName ||
    !me.info?.phone ||
    !me.info?.email ? (
    <Cabinet />
  ) : (
    <MasterCabinet />
  )
}

export async function getServerSideProps(context: OptionsType) {
  const accessToken = getCookie(authConfig.tokenKeyName, context)

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  } else {
    return { props: { accessToken } }
  }
}

export default CabinetPage

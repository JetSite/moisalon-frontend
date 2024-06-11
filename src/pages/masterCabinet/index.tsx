import { useLazyQuery, useQuery } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
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
  const { user, loading } = useAuthStore(getStoreData)

  if (loading || !user) return <CreatePageSkeleton />

  return !user.info?.username ||
    !user.info?.city?.name ||
    !user.info?.phone ||
    !user.info?.email ? (
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

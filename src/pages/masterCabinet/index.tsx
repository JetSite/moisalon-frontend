import { useLazyQuery, useQuery } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getMe } from 'src/graphql/me/queries/getMe'
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
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)
  const { refetch, loading } = useQuery(getMe, {
    fetchPolicy: 'network-only',
    skip: !!me && !accessToken,
    onCompleted: res => {
      setMe({
        info: res?.me,
      })
    },
  })

  console.log(me)

  // useEffect(() => {
  //   if (!loading && me === null) {
  //     refetch()
  //   }
  // }, [])

  if (loading) return <CreatePageSkeleton />

  // return !me?.info?.name ||
  //   !me?.info?.defaultCity ||
  //   !me?.info?.phoneNumber ||
  //   !me?.info?.email ? (
  //   <Cabinet refetch={refetch} currentMe={me} />
  // ) : (
  //   <MasterCabinet currentMe={me} refetch={refetch} />
  // )
  return !!me && <MasterCabinet currentMe={me} refetch={refetch} />
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

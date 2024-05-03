import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { authConfig } from 'src/api/authConfig'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IChildren } from 'src/types/common'

const AuthProvider: FC<{ children: IChildren }> = ({ children }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const setLoading = useAuth(state => state.setLoading)
  const setUser = useAuth((state: UseAuthState) => state.setUser)
  const setTimeZone = useAuth((state: UseAuthState) => state.setTimeZone)
  const setTimeZonesArr = useAuth(
    (state: UseAuthState) => state.setTimeZonesArr,
  )
  const setData = useTrening(state => state.setData)
  const flowData = useTrening(getStoreData)
  const setFirstMountFalse = useTrening(state => state.setFirstMountFalse)
  const { refetch: getTimeZones } = useQuery(TIME_ZONES, {
    onCompleted: data => {
      const prepareTimeZones = data.timeZones.data.map(
        (e: { id: IID; attributes: { value: string } }) => ({
          id: e.id,
          title: e.attributes.value,
        }),
      )
      setTimeZonesArr(prepareTimeZones)
    },
  })

  const getMeCB = {
    onCompleted: (data: any) => {
      setUser(data.me)
      getFlows({ id: data.me.id })
      setTimeZone({
        title: data.me.timeZone.data.attributes.value as string,
        id: data.me.timeZone.data.id,
      })
    },
    onError: () => {
      setLoading(false)
    },
    skip: true,
  }

  const { refetch: getMe } = useQuery(ME, getMeCB)

  const { refetch: getFlows } = useQuery(FLOWS, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      setFirstMountFalse()
      setData(formatData(data, 'usersPermissionsUser', router))
      setLoading(false)
    },
    onError: () => {
      setFirstMountFalse()
      setLoading(false)
    },
    skip: true,
  })

  const { refetch: getUpdateFlows } = useQuery(UPDATE_FLOWS, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      setFirstMountFalse()
      setData({ ...flowData, ...formatData(data) })
      setLoading(false)
    },
    onError: () => {
      setFirstMountFalse()
      setLoading(false)
    },
    skip: true,
  })

  useEffect(() => {
    if (!router.asPath.includes(authConfig.notAuthLink)) {
      if (!user) {
        getMe()
      }
    }
  }, [user, router])

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined
    if (!router.asPath.includes('auth') && user) {
      interval = setInterval(() => {
        getUpdateFlows({ id: user?.id })
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [user, router])

  return <>{children}</>
}

export default AuthProvider

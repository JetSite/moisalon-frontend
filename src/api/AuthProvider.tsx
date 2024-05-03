import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { IChildren } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getMe as ME } from '../graphql/me/queries/getMe'
import { authConfig } from './authConfig'
import { getCookie } from 'cookies-next'

const AuthProvider: FC<{ children: IChildren }> = ({ children }) => {
  const router = useRouter()
  const { me, loading } = useAuthStore(getStoreData)
  const { setMe, setLoading } = useAuthStore(getStoreEvent)
  const accessToken = getCookie(authConfig.tokenKeyName)

  const getMeCB = {
    onCompleted: (data: any) => {
      setMe({
        info: data?.me,
      })
    },
    onError: () => {
      setLoading(false)
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
  }

  const { refetch: getMe, loading: meLoading } = useQuery(ME, getMeCB)

  useEffect(() => {
    setLoading(meLoading)
    if (router.asPath !== authConfig.notAuthLink) {
      if (!me && accessToken) {
        getMe()
      }
    }
  }, [me, router])

  return <>{!loading && children}</>
}

export default AuthProvider

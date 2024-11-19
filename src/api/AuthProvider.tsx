import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { IChildren } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ME } from './graphql/me/queries/getMe'
import { authConfig } from './authConfig'
import { getCookie } from 'cookies-next'
import { USER } from './graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getPrepareUser } from './utils/getPrepareUser'
import { useShallow } from 'zustand/react/shallow'
import MainSkeleton from 'src/components/ui/ContentSkeleton/MainSkeleton'
import { PageProps } from './apollo-client'
import { IAppProps } from 'src/pages/_app'
import { useCollectAuth } from './utils/useCollectAuth'

const AuthProvider: FC<{
  children: IChildren
  pageProps: PageProps<IAppProps>
}> = ({ children, pageProps }) => {
  const pageCity = pageProps.props.city ?? null
  const router = useRouter()
  const accessToken = getCookie(authConfig.tokenKeyName)
  const { me, loading, user } = useAuthStore(useShallow(getStoreData))
  const { setMe, setLoading, logout } = useAuthStore(useShallow(getStoreEvent))

  const onError = () => {
    logout(router, '/login')
    setLoading(false)
  }

  const [getMe] = useLazyQuery(ME, {
    onCompleted: (data: any) => {
      setMe({
        info: data?.me,
      })
    },
    onError,
  })
  const [getUser] = useLazyQuery(USER, {
    onCompleted: data => {
      const prepareUser = getPrepareUser(
        flattenStrapiResponse(data.usersPermissionsUser),
      )

      if (prepareUser && !user) {
        debugger
        useCollectAuth({ prepareUser, pageCity })
      }
    },
    onError,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (user || !accessToken) return

    // const pageUser = pageProps.user
    const pageUser = pageProps.props.user || null
    const prepareUser = getPrepareUser(pageUser)

    if (prepareUser) {
      debugger
      useCollectAuth({ prepareUser, pageCity })
      return
    }
    if (router.asPath !== authConfig.notAuthLink) {
      if (!me) {
        getMe()
      } else if (!user) {
        getUser({ variables: { id: me.info.id } })
      } else {
        setLoading(false)
      }
    }
    console.log('AuthProvider me', me)
    console.log('AuthProvider user', user)
  }, [me, router, pageProps])

  return <>{loading ? <MainSkeleton /> : children}</>
}

export default AuthProvider

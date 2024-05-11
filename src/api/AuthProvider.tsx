import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { IChildren } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getMe as ME } from './graphql/me/queries/getMe'
import { authConfig } from './authConfig'
import { getCookie } from 'cookies-next'
import { getUser as USER } from './graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo, IMeThings } from 'src/types/me'
import { getCities } from './graphql/city/getCities'
import { IVacancy } from 'src/types/vacancies'
import { IReview } from 'src/types/reviews'
import { ICity } from 'src/types'

const AuthProvider: FC<{ children: IChildren }> = ({ children }) => {
  const router = useRouter()
  const { me, loading, city } = useAuthStore(getStoreData)
  const { setMe, setLoading, setCity } = useAuthStore(getStoreEvent)
  const accessToken = getCookie(authConfig.tokenKeyName)
  const cityCookie = getCookie(authConfig.cityKeyName)
  // const cityStorage = window || localStorage.getItem(authConfig.cityKeyName)

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
  const { refetch: getUser, loading: userLoading } = useQuery(USER, {
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.usersPermissionsUser)
      const info: IMeInfo = {
        city: prepareData.city,
        username: prepareData.username,
        phone: prepareData.phone,
        id: prepareData.id,
        email: prepareData.email,
        avatar: prepareData.avatar,
      }
      const owner: IMeThings = {
        salons: prepareData.salons,
        masters: prepareData.masters,
        brand: prepareData.brands,
      }

      const favorite: IMeThings = {
        salons: prepareData.favorited_salons,
        masters: prepareData.favorited_masters,
        brand: prepareData.favorited_brands,
      }
      console.log('usersPermissionsUser', data.usersPermissionsUser)

      setMe({
        info,
        owner,
        favorite,
        vacancies: prepareData.vacancies as IVacancy[],
        reviews: prepareData.reviews as IReview[],
      })
      setCity(prepareData.selected_city as ICity)
    },
    onError: err => console.log(err),
    skip: true,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (!city.id)
      setCity(
        cityCookie
          ? JSON.parse(cityCookie)
          : // : cityStorage
            // ? JSON.parse(cityStorage)
            null,
      )
  }, [])

  useEffect(() => {
    console.log('AuthProvider', me, city)

    setLoading(meLoading || userLoading)
    if (router.asPath !== authConfig.notAuthLink) {
      if (!me && accessToken) {
        getMe()
      }
      if (me && !me.favorite && router.asPath === '/masterCabinet') {
        getUser({ id: me.info.id })
      }
    }
  }, [me, router])

  return <>{!loading && children}</>
}

export default AuthProvider

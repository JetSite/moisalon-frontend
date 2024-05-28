import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { IChildren, INextContext } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ME } from './graphql/me/queries/getMe'
import { authConfig, defaultValues } from './authConfig'
import { getCookie, setCookie } from 'cookies-next'
import { USER } from './graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo, IUserThings } from 'src/types/me'
import { getCities } from './graphql/city/getCities'
import { IVacancy } from 'src/types/vacancies'
import { IReview } from 'src/types/reviews'
import { ICity } from 'src/types'
import { fetchCity } from './utils/fetchCity'
import { changeMe } from './graphql/me/mutations/changeMe'
import { Nullable } from '../types/common'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { IServerProps } from './server/types'

const AuthProvider: FC<{ children: IChildren; cityData?: IServerProps }> = ({
  children,
  cityData,
}) => {
  // console.log(cityData)

  const router = useRouter()
  const { me, loading, user } = useAuthStore(getStoreData)
  const { setMe, setLoading, setCity, setUser } = useAuthStore(getStoreEvent)
  const accessToken = getCookie(authConfig.tokenKeyName)
  const cityCookie = getCookie(authConfig.cityKeyName)

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
  const [changeCityFunc] = useMutation(changeMe, {
    onCompleted: res => {
      const newCity: ICity = flattenStrapiResponse(
        res.updateUsersPermissionsUser,
      ).selected_city
      setCity(newCity)
    },
  })

  const { refetch: getMe, loading: meLoading } = useQuery(ME, getMeCB)
  const { refetch: getUser, loading: userLoading } = useQuery(USER, {
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.usersPermissionsUser)

      if (!prepareData.selected_city) {
        changeCityFunc({
          variables: {
            id: prepareData.id,
            data: { selected_city: cityData?.id || 1 },
          },
        })
      }
      const info: IMeInfo = {
        city: prepareData.city,
        username: prepareData.username,
        phone: prepareData.phone,
        id: prepareData.id,
        email: prepareData.email,
        avatar: prepareData.avatar,
      }
      const owner: IUserThings = {
        salons: prepareData.salons,
        masters: prepareData.masters,
        brand: prepareData.brands,
      }

      const favorite: IUserThings = {
        salons: prepareData.favorited_salons,
        masters: prepareData.favorited_masters,
        brand: prepareData.favorited_brands,
      }
      // console.log('usersPermissionsUser', data.usersPermissionsUser)

      setUser({
        info,
        owner,
        favorite,
        vacancies: prepareData.vacancies as IVacancy[],
        reviews: prepareData.reviews as IReview[],
      })
      setMe({
        info,
      })
      setCity(prepareData.selected_city as ICity)
      setCookie(
        authConfig.cityKeyName,
        prepareData.selected_city?.citySlug || defaultValues.citySlug,
      )
    },
    onError: err => console.log(err),
    skip: true,
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    const initializeCity = async () => {
      if (cityData?.cityName) {
        setCity(cityData)
      } else {
        const cityDataRes = await fetchCity(cityCookie)
        setCity(cityDataRes)
      }
    }
    initializeCity()
  }, [cityCookie])

  useEffect(() => {
    // console.log('AuthProvider', me, city)

    setLoading(meLoading || userLoading)
    if (router.asPath !== authConfig.notAuthLink) {
      if (!me && accessToken) {
        getMe()
      }
      if (me && !user) {
        getUser({ id: me.info.id })
      }
    }
  }, [me, router])

  return <>{!loading && children}</>
}

export default AuthProvider

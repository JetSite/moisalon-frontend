import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { IChildren } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ME } from './graphql/me/queries/getMe'
import { authConfig, defaultValues } from './authConfig'
import { getCookie, setCookie } from 'cookies-next'
import { getUser as USER } from './graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo, IMeThings } from 'src/types/me'
import { getCities } from './graphql/city/getCities'
import { IVacancy } from 'src/types/vacancies'
import { IReview } from 'src/types/reviews'
import { ICity } from 'src/types'
import { fetchCity } from './utils/fetchCity'
import { changeMe } from './graphql/me/mutations/changeMe'

const AuthProvider: FC<{ children: IChildren; cityData?: ICity }> = ({
  children,
  cityData,
}) => {
  const router = useRouter()
  const { me, loading, city } = useAuthStore(getStoreData)
  const { setMe, setLoading, setCity } = useAuthStore(getStoreEvent)
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
  }
  const [changeCityFunc] = useMutation(changeMe, {
    onCompleted: res => {
      const newCity: ICity = flattenStrapiResponse(
        res.updateUsersPermissionsUser,
      ).selected_city
      setCity(newCity)
    },
  })

  const [getMe, { loading: meLoading }] = useLazyQuery(ME, getMeCB)
  const [getUser, { loading: userLoading }] = useLazyQuery(USER, {
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.usersPermissionsUser)
      console.log('prepareData', prepareData)

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

      setMe({
        info,
        owner,
        favorite,
        vacancies: prepareData.vacancies as IVacancy[],
        reviews: prepareData.reviews as IReview[],
      })
      setCity(prepareData.selected_city as ICity)
      setCookie(
        authConfig.cityKeyName,
        prepareData.selected_city?.citySlug || defaultValues.citySlug,
      )
    },
    onError: err => console.log(err),
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
      if (me && !me.favorite) {
        getUser({ variables: { id: me.info.id } })
      }
    }
  }, [me, router])

  return <>{!loading && children}</>
}

export default AuthProvider

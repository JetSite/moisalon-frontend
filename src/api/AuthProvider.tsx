import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { IChildren, IID } from 'src/types/common'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ME } from './graphql/me/queries/getMe'
import { authConfig, defaultValues } from './authConfig'
import { getCookie, setCookie } from 'cookies-next'
import { USER } from './graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMeInfo, IOwnersIds, IUserThings } from 'src/types/me'
import { IVacancy } from 'src/types/vacancies'
import { IReview } from 'src/types/reviews'
import { ICity } from 'src/types'
import { changeMe } from './graphql/me/mutations/changeMe'
import useBaseStore from 'src/store/baseStore'
import { getPrepareUser } from './utils/getPrepareUser'
import { useShallow } from 'zustand/react/shallow'

const AuthProvider: FC<{ children: IChildren; pageProps: any }> = ({
  children,
  pageProps,
}) => {
  const router = useRouter()
  const { me, loading, user } = useAuthStore(useShallow(getStoreData))
  const data = useAuthStore(getStoreData)

  const { setMe, setLoading, setCity, setUser } = useAuthStore(
    useShallow(getStoreEvent),
  )
  const { setCart } = useBaseStore(getStoreEvent)
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

      if (!prepareData.selected_city) {
        changeCityFunc({
          variables: {
            id: prepareData.id,
            data: { selected_city: pageProps?.props?.city?.id || 1 },
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
        brands: prepareData.brands,
        cart: prepareData.cart,
      }

      const favorite: IUserThings = {
        salons: prepareData.favorited_salons,
        masters: prepareData.favorited_masters,
        brands: prepareData.favorited_brands,
      }
      setUser({
        info,
        owner,
        favorite,
        vacancies: prepareData.vacancies as IVacancy[],
        reviews: prepareData.reviews as IReview[],
        orders: prepareData.orders as any,
      })
      setMe({
        info,
      })
      setCity(prepareData.selected_city as ICity)
      setCookie(
        authConfig.cityKeyName,
        prepareData.selected_city?.slug || defaultValues.citySlug,
      )
      if (prepareData.cart) {
        setCart(prepareData.cart)
      }
    },
    onError: err => console.log(err),
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    // const initializeCity = async () => {
    //   if (cityData?.name) {
    //     setCity(cityData)
    //   } else {
    //     const cityDataRes = await fetchCity(cityCookie)
    //     setCity(cityDataRes)
    //   }
    // }
    // initializeCity()
  }, [cityCookie])
  useEffect(() => {
    if (!accessToken) return
    setLoading(meLoading || userLoading)
    if (pageProps.user && !user) {
      const prepareUser = getPrepareUser(pageProps.user)
      if (prepareUser) {
        const ownerKeys = Object.keys(prepareUser.owner) as Array<
          keyof IUserThings
        >
        const ownersID = {} as IOwnersIds
        ownerKeys.forEach(key => {
          ownersID[key] = prepareUser.owner[key].map((e: { id: IID }) => ({
            id: e.id,
          }))
        })
        setUser(prepareUser)
        setMe({ info: prepareUser.info, owner: ownersID })
        setCity(prepareUser.selected_city)
        if (!cityCookie) {
          setCookie(
            authConfig.cityKeyName,
            prepareUser.selected_city?.slug || defaultValues.citySlug,
          )
        }
      }

      return
    } else {
      if (router.asPath !== authConfig.notAuthLink) {
        if (!me) {
          getMe()
        }
        if (me && !user) {
          getUser({ variables: { id: me.info.id } })
        }
      }
      console.log('AuthProvider', me)
    }
  }, [me, router, pageProps])

  return <>{!loading && children}</>
}

export default AuthProvider

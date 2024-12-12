import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { cyrToTranslit } from '../utils/translit'
import { useQuery, useMutation } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

const useCheckCity = cityData => {
  const router = useRouter()
  const { setCity, setMe } = useAuthStore(getStoreEvent)

  const query = { query: '' } //TODO: query
  const setQuery = e => {} //TODO: query

  // const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
  //   skip: true,
  //   onCompleted: res => {
  //     setMe({
  //       info: res?.me?.info,
  //       master: res?.me?.master,
  //       locationByIp: res?.locationByIp,
  //       salons: res?.me?.salons,
  //       rentalRequests: res?.me?.rentalRequests,
  //     })
  //   },
  // })

  // const [changeCityFunc] = useMutation(changeCityMutation, {
  //   onCompleted: () => {
  //     refetch()
  //   },
  // })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.getItem('citySalon') !== cityData ||
        (localStorage.getItem('citySalon') === 'Москва' &&
          router?.query?.city !== 'moskva')
      ) {
        localStorage.setItem('citySalon', cityData)
        changeCityFunc({
          variables: {
            city: cityData,
          },
        })
        setCity(cityData)
        setQuery({ ...query, city: cityData })
        if (router?.query?.city !== 'moskva' && cityData === 'Москва') {
          router.replace({
            query: { ...router.query, city: cyrToTranslit(cityData) },
          })
        }
      }
    }
  }, [])
}

export default useCheckCity

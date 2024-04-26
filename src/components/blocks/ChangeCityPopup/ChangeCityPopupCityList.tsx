import { useMutation } from '@apollo/react-hooks'
import { changeCityMutation } from '../../../_graphql-legacy/city/changeCityMutation'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import CitiesList from 'src/components/pages/MainPage/components/CitySelect/CitiesList'
import { cyrToTranslit } from 'src/utils/translit'
import { useRouter } from 'next/router'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IID } from 'src/types/common'
import { FC } from 'react'
import { IMe } from 'src/types/me'

interface Props {
  setMe: (me: IMe) => void
  handlePopupClose: () => void
}

const ChangeCityPopupCityList: FC<Props> = ({ handlePopupClose, setMe }) => {
  const router = useRouter()
  const { cities, city } = useBaseStore(getStoreData)
  const { setCity } = useBaseStore(getStoreEvent)

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: res => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      })
    },
  })

  const [changeCityFunc] = useMutation(changeCityMutation, {
    onCompleted: () => {
      refetch()
    },
  })

  const cityClickHandler = async (index: IID) => {
    handlePopupClose()
    localStorage.setItem('citySalon', city ? city : 'Москва')
    await changeCityFunc({
      variables: {
        city: city ? city : 'Москва',
      },
    })
    setCity(city ? city : 'Москва')
    if (router.pathname === '/[city]/salon/[id]' && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/salon`)
      return
    }
    if (
      router.pathname === '/[city]/brand/[id]/products' &&
      router?.query?.city
    ) {
      router.push(`/${cyrToTranslit(city)}/brand`)
      return
    }
    if (router.pathname === '/[city]/rent/[id]' && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/rent`)
      return
    }
    if (
      router.pathname === '/[city]/rent/[id]room/[roomId]/seat/[seatId]' &&
      router?.query?.city
    ) {
      router.push(`/${cyrToTranslit(city)}/rent`)
      return
    }
    if (router.pathname === '/[city]/master/[id]' && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/master`)
      return
    }
    if (router.pathname === '/[city]/brand/[id]' && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/brand`)
      return
    }
    if (router?.query?.city) {
      router.replace({ query: { ...router.query, city: cyrToTranslit(city) } })
    }
  }

  return <CitiesList cities={cities} cityClickHandler={cityClickHandler} />
}

export default ChangeCityPopupCityList

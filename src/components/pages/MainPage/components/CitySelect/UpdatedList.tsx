import React, { FC, Dispatch, SetStateAction } from 'react'
import { useCitySuggestions } from './useCitySuggestions'
import CitiesList from './CitiesList'

import { useRouter } from 'next/router'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { ICity } from 'src/types'
import { defaultCitySlug } from 'src/api/authConfig'
import { IAppoloMutationCallback } from 'src/types/common'

interface PropsUpdatedList {
  cityInput: string
  setCityInput: Dispatch<SetStateAction<string>>
  setShowCitySelect: Dispatch<SetStateAction<boolean>>
  setShowHamburgerMenu?: Dispatch<SetStateAction<boolean>>
  changeCityFunc: IAppoloMutationCallback
}

export const UpdatedList: FC<PropsUpdatedList> = ({
  cityInput,
  setCityInput,
  setShowCitySelect,
  setShowHamburgerMenu,
  changeCityFunc,
}) => {
  const { suggestions } = useCitySuggestions(cityInput)
  const unicSuggestion = Array.from(new Set(suggestions))
  const router = useRouter()

  console.log(suggestions)

  const { setCity } = useAuthStore(getStoreEvent)

  const cityClickHandler = (city: ICity) => {
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    setCityInput('')

    changeCityFunc({
      variables: {
        city: city.citySlug || defaultCitySlug,
      },
    })

    setCity(city || null)

    if (router.pathname === '/[city]/salon/[id]' && router?.query?.city) {
      router.push(`/${city.citySlug}/salon`)
      return
    }
    if (router.pathname === '/[city]/master/[id]' && router?.query?.city) {
      router.push(`/${city.citySlug}/master`)
      return
    }
    if (router.pathname === '/[city]/brand/[id]' && router?.query?.city) {
      router.push(`/${city.citySlug}/brand`)
      return
    }
    if (
      router.pathname === '/[city]/brand/[id]/products' &&
      router?.query?.city
    ) {
      router.push(`/${city.citySlug}/brand`)
      return
    }
    if (router.pathname === '/[city]/rent/[id]' && router?.query?.city) {
      router.push(`/${city.citySlug}/rent`)
      return
    }
    if (
      router.pathname === '/[city]/rent/[id]room/[roomId]/seat/[seatId]' &&
      router?.query?.city
    ) {
      router.push(`/${city.citySlug}/rent`)
      return
    }
    if (router?.query?.city) {
      router.replace({
        query: { ...router.query, city: city.citySlug },
      })
    }
  }

  return (
    <CitiesList cities={unicSuggestion} cityClickHandler={cityClickHandler} />
  )
}

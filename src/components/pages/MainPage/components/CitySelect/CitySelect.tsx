import React, {
  useState,
  useRef,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  RefObject,
  ChangeEvent,
} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useCitySuggestions } from './useCitySuggestions'
import { changeCityMutation } from '../../../../../_graphql-legacy/city/changeCityMutation'
import CitiesList from './CitiesList'
import {
  Wrapper,
  TitleWrapper,
  Title,
  CloseWrapper,
  InputWrapper,
  CityInput,
  CityPingWrap,
  Blur,
} from './styles'
import CityPingIcon from '../Header/icons/CityPingIcon'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { useRouter } from 'next/router'
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IMe } from 'src/types/me'
import { defaultcCitiesList } from 'src/api/authConfig'
import { IID } from 'src/types/common'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { UpdatedList } from './UpdatedList'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'

const prepareCitiesList: ICity[] = defaultcCitiesList.map((city, i) => ({
  cityName: city,
  citySlug: cyrToTranslit(city) as string,
  id: (i + 1).toString(),
}))

interface Props {
  showCitySelect: boolean
  setShowCitySelect: Dispatch<SetStateAction<boolean>>
  setShowHamburgerMenu?: Dispatch<SetStateAction<boolean>>
  setMe: (me: IMe) => void
}

const CitySelect: FC<Props> = ({
  showCitySelect,
  setShowCitySelect,
  setShowHamburgerMenu,
  setMe,
}) => {
  const { city } = useAuthStore(getStoreData)
  const { setCity } = useAuthStore(getStoreEvent)
  const [citiesList, setCitiesList] = useState<ICity[]>([])
  const { refetch, loading } = useQuery(getCities, {
    variables: { itemsCount: 10 },
    onCompleted: data => {
      const prepareData = flattenStrapiResponse(data.cities) as ICity[]
      setCitiesList(prepareData.length ? prepareData : prepareCitiesList)
    },
    onError: err => {
      console.log(err)
      setCitiesList(prepareCitiesList)
    },
    skip: true,
    notifyOnNetworkStatusChange: true,
  })

  console.log(city)

  useEffect(() => {
    refetch()
  }, [])

  // useEffect(() => {
  //   if (showCitySelect) {
  //     document.body.style.overflow = "hidden";
  // document.documentElement.style.overflowY = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  // document.documentElement.style.overflowY = "scroll";
  //   };
  // });
  const router = useRouter()

  const [cityInput, setCityInput] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [changeCityFunc] = useMutation(changeMe, {
    onCompleted: res => {
      const newCity: ICity = flattenStrapiResponse(
        res.updateUsersPermissionsUser,
      ).selected_city
      setCity(newCity)
    },
  })

  const outsideClick = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const clickOutsideHandler = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setShowCitySelect(false)
        }
      }
      document.addEventListener('mousedown', clickOutsideHandler)
      return () => {
        document.removeEventListener('mousedown', clickOutsideHandler)
      }
    }, [ref])
  }
  outsideClick(wrapperRef)

  const closeHandler = () => {
    setShowCitySelect(false)
  }

  const changeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value)
  }

  const cityClickHandler = async (slug: string) => {
    const city = citiesList.find(city => cyrToTranslit(city) === slug)
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    localStorage.setItem('citySalon', city ? city.citySlug : 'moskva')
    // await changeCityFunc({
    //   variables: {
    //     city: city ? city : "Москва",
    //   },
    // });
    setCity(city || null)
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

  let component = (
    <CitiesList cities={citiesList} cityClickHandler={cityClickHandler} />
  )

  if (cityInput.length >= 2) {
    component = (
      <UpdatedList
        cityInput={cityInput}
        setCityInput={setCityInput}
        setShowCitySelect={setShowCitySelect}
        changeCityFunc={changeCityFunc}
        setShowHamburgerMenu={setShowHamburgerMenu}
      />
    )
  }

  return (
    <>
      <Blur showCitySelect={showCitySelect} />
      <Wrapper
        id="VestingWidget"
        showCitySelect={showCitySelect}
        ref={wrapperRef}
      >
        <TitleWrapper>
          <CityPingWrap>
            <CityPingIcon />
          </CityPingWrap>
          <CloseWrapper onClick={closeHandler} />
          <Title>Выберите город:</Title>
        </TitleWrapper>
        <InputWrapper>
          <CityInput
            type="text"
            name="city-select"
            value={cityInput}
            placeholder="Найти ваш город"
            onChange={changeCity}
          />
        </InputWrapper>
        {!loading ? component : null}
      </Wrapper>
    </>
  )
}

export default CitySelect

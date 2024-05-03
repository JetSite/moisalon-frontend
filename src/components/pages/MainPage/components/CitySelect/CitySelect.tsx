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

let cities = [
  'Москва',
  'Санкт-Петербург',
  'Екатеринбург',
  'Новосибирск',
  'Нижний Новгород',
  'Казань',
  'Самара',
  'Ростов-на-Дону',
  'Челябинск',
  'Саратов',
  'Хабаровск',
  'Волгоград',
]

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
    onCompleted: res => {
      // refetch();
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

  let citiesList = cities

  const closeHandler = () => {
    setShowCitySelect(false)
  }

  const changeCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value)
  }

  const cityClickHandler = async (index: number) => {
    const city = citiesList.find((city, i) => i == index)
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    localStorage.setItem('citySalon', city ? city : 'Москва')
    // await changeCityFunc({
    //   variables: {
    //     city: city ? city : "Москва",
    //   },
    // });
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

  let component = (
    <CitiesList cities={citiesList} cityClickHandler={cityClickHandler} />
  )

  if (cityInput.length > 2) {
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
        {component}
      </Wrapper>
    </>
  )
}

export default CitySelect

interface PropsUpdatedList {
  cityInput: string
  setCityInput: Dispatch<SetStateAction<string>>
  setShowCitySelect: Dispatch<SetStateAction<boolean>>
  setShowHamburgerMenu?: Dispatch<SetStateAction<boolean>>
  changeCityFunc: any //TODO: any
}

const UpdatedList: FC<PropsUpdatedList> = ({
  cityInput,
  setCityInput,
  setShowCitySelect,
  setShowHamburgerMenu,
  changeCityFunc,
}) => {
  const { suggestions } = useCitySuggestions(cityInput)
  const unicSuggestion = Array.from(new Set(suggestions))
  const router = useRouter()

  const { city } = useAuthStore(getStoreData)
  const { setCity } = useAuthStore(getStoreEvent)

  const cityClickHandler = (index: number) => {
    const city = unicSuggestion.find((city, i) => i == index)
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    setCityInput('')

    localStorage.setItem('citySalon', city ? (city as string) : 'Москва')
    changeCityFunc({
      variables: {
        city: city ? city : 'Москва',
      },
    })
    setCity(city ? (city as string) : 'Москва')
    if (router.pathname === '/[city]/salon/[id]' && router?.query?.city) {
      router.push(`/${cyrToTranslit(city)}/salon`)
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
    if (router?.query?.city) {
      router.replace({
        query: { ...router.query, city: cyrToTranslit(city) },
      })
    }
  }

  return (
    <CitiesList cities={unicSuggestion} cityClickHandler={cityClickHandler} />
  )
}

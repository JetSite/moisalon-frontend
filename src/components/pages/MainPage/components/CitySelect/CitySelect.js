import React, { useState, useRef, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useCitySuggestions } from './useCitySuggestions'
import { changeCityMutation } from '../../../../../_graphql-legacy/city/changeCityMutation'
import {
  CityContext,
  SearchMainQueryContext,
} from '../../../../../searchContext'
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

const CitySelect = ({
  showCitySelect,
  setShowCitySelect,
  setShowHamburgerMenu,
  setMeInfo,
  me,
}) => {
  const [city, setCity] = useContext(CityContext)
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
  const wrapperRef = useRef(null)
  const [query, setQuery] = useContext(SearchMainQueryContext)

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: res => {
      setMeInfo({
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

  const outsideClick = ref => {
    useEffect(() => {
      const clickOutsideHandler = e => {
        if (ref.current && !ref.current.contains(e.target)) {
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

  const changeCity = e => {
    setCityInput(e.target.value)
  }

  const cityClickHandler = async index => {
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
    setQuery({ ...query, city: city })
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
        setMeInfo={setMeInfo}
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

const UpdatedList = ({
  cityInput,
  setCityInput,
  setShowCitySelect,
  setShowHamburgerMenu,
  changeCityFunc,
}) => {
  const [query, setQuery] = useContext(SearchMainQueryContext)
  const { suggestions } = useCitySuggestions(cityInput)
  const [city, setCity] = useContext(CityContext)
  const unicSuggestion = Array.from(new Set(suggestions))
  const router = useRouter()

  const cityClickHandler = index => {
    const city = unicSuggestion.find((city, i) => i == index)
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    setCityInput('')

    localStorage.setItem('citySalon', city ? city : 'Москва')
    changeCityFunc({
      variables: {
        city: city ? city : 'Москва',
      },
    })
    setCity(city ? city : 'Москва')
    setQuery({ ...query, city: city })
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

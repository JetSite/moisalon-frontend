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
import { cyrToTranslit } from '../../../../../utils/translit'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { authConfig, defaultcCitiesList } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { UpdatedList } from './UpdatedList'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { setCookie } from 'cookies-next'
import { redirectCityRoutes } from 'src/utils/newUtils/redirectCityRoutes'
import { useRouter } from 'next/router'
import { ISetState } from 'src/types/common'

const prepareCitiesList: ICity[] = defaultcCitiesList.map((city, i) => ({
  cityName: city,
  citySlug: cyrToTranslit(city) as string,
  id: (i + 1).toString(),
}))

interface Props {
  showCitySelect: boolean
  setShowCitySelect: ISetState<boolean>
  setShowHamburgerMenu?: ISetState<boolean>
}

const CitySelect: FC<Props> = ({
  showCitySelect,
  setShowCitySelect,
  setShowHamburgerMenu,
}) => {
  const { setCity } = useAuthStore(getStoreEvent)
  const { me } = useAuthStore(getStoreData)
  const [citiesList, setCitiesList] = useState<ICity[]>([])
  const router = useRouter()
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

  useEffect(() => {
    refetch()
  }, [])

  // useEffect(() => {
  //   if (showCitySelect) {
  //     document.body.style.overflow = 'hidden'
  //     document.documentElement.style.overflowY = 'hidden'
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset'
  //     document.documentElement.style.overflowY = 'scroll'
  //   }
  // })

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

  const cityClickHandler = async (city: ICity) => {
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
    setCookie(authConfig.cityKeyName, city.citySlug)
    if (me?.info.id) {
      changeCityFunc({
        variables: { id: me.info.id, data: { selected_city: city.id } },
      })
    }
    setCity(city || null)
    redirectCityRoutes(city.citySlug, router)
  }

  let component = (
    <CitiesList cities={citiesList} cityClickHandler={cityClickHandler} />
  )

  if (cityInput.length >= 2) {
    component = (
      <UpdatedList
        me={me}
        cityInput={cityInput}
        setCityInput={setCityInput}
        changeCityFunc={changeCityFunc}
        setShowCitySelect={setShowCitySelect}
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

import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Popup from '../../ui/Popup'
import Button from '../../ui/Button'
import { Box } from '@material-ui/core'
import { changeCityMutation } from '../../../_graphql-legacy/city/changeCityMutation'
import { Input } from './styles'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { IMe } from 'src/types/me'
import ChangeCityPopupCityList from './ChangeCityPopupCityList'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICity } from 'src/types'
import { changeMe } from 'src/api/graphql/me/mutations/changeMe'
import { setCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { redirectCityRoutes } from 'src/utils/newUtils/redirectCityRoutes'
import { ISetState } from 'src/types/common'

interface Props {
  openPopup: boolean
  setPopupOpen: ISetState<boolean>
  me: IMe | null
}

const ChangeCityPopup: FC<Props> = ({ openPopup, setPopupOpen, me }) => {
  const [changeCity, setChangeCity] = useState<boolean>(false)
  const [cityInput, setCityInput] = useState<string>('')
  const { city } = useAuthStore(getStoreData)
  const { setCity } = useAuthStore(getStoreEvent)

  const [changeCityFunc] = useMutation(changeMe, {
    onCompleted: res => {
      const newCity: ICity = flattenStrapiResponse(
        res.updateUsersPermissionsUser,
      ).selected_city
      setCity(newCity)
    },
  })

  return (
    <Popup
      isOpen={openPopup}
      onClose={() => setPopupOpen(false)}
      title={
        changeCity ? 'Выберите Ваш город' : 'Вы находитесь в населенном пункте '
      }
      city={changeCity ? '' : `${city.cityName}`}
    >
      {!changeCity ? (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button
            onClick={() => setPopupOpen(false)}
            size="popUp"
            variant="red"
            font="popUp"
          >
            Да
          </Button>
          <Button
            onClick={() => setChangeCity(true)}
            size="popUp"
            variant="darkTransparentWithoutBorder"
            font="popUp"
          >
            Нет, выбрать другой
          </Button>
        </Box>
      ) : (
        <>
          <form style={{ width: '100%' }}>
            {/* <Box marginBottom="20px">
              <input type="text" />
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>

            </Box> */}
            <Box marginBottom="20px">
              <Input
                type="text"
                placeholder="Введите город"
                onChange={e => setCityInput(e.target.value)}
              />
              {cityInput && cityInput.length >= 2 && (
                <ChangeCityPopupCityList
                  me={me}
                  cityInput={cityInput}
                  setCityInput={setCityInput}
                  changeCityFunc={changeCityFunc}
                  setShowCitySelect={setPopupOpen}
                />
              )}
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button
                onClick={e => {
                  e.preventDefault()
                  setPopupOpen(false)
                }}
                size="popUp"
                variant="darkTransparentWithoutBorder"
                font="popUp"
              >
                Отмена
              </Button>
              {/* <Button
                onClick={handleSubmit}
                size="popUp"
                variant="red"
                font="popUp"
              >
                Выбрать
              </Button> */}
            </Box>
          </form>
        </>
      )}
    </Popup>
  )
}

export default ChangeCityPopup

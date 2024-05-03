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

interface Props {
  openPopup: boolean
  setPopupOpen: Dispatch<SetStateAction<boolean>>
  me: IMe | null
}

const ChangeCityPopup: FC<Props> = ({ openPopup, setPopupOpen, me }) => {
  const [changeCity, setChangeCity] = useState<boolean>(false)
  const [cityInput, setCityInput] = useState<string>('')
  const { city } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

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

  const handleSubmit = () => {
    if (!me?.info) {
      localStorage.setItem(
        'citySalon',
        me?.info?.city
          ? me.info.city
          : localStorage.getItem('citySalon')
          ? localStorage.getItem('citySalon')
          : me?.locationByIp
          ? me.locationByIp.data.city
          : 'Москва',
      )
      setPopupOpen(false)
    } else {
      changeCityFunc({
        variables: {
          city: me?.info?.city
            ? me.info.city
            : localStorage.getItem('citySalon')
            ? localStorage.getItem('citySalon')
            : me?.locationByIp
            ? me.locationByIp.data.city
            : 'Москва',
        },
      })
      setPopupOpen(false)
    }
  }

  return (
    <Popup
      isOpen={openPopup}
      onClose={() => setPopupOpen(false)}
      title={
        changeCity ? 'Выберите Ваш город' : 'Вы находитесь в населенном пункте '
      }
      city={changeCity ? '' : `${city}`}
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
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
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
              {cityInput && cityInput.length > 2 && (
                <ChangeCityPopupCityList
                  setMe={setMe}
                  handlePopupClose={() => () => setPopupOpen(false)}
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

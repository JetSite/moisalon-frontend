import { useContext, useState } from 'react'
import { CatalogsContext } from '../../../../../../searchContext'
import { MobileHidden, MobileVisible } from '../../../../../../styles/common'
import catalogOrDefault from '../../../../../../utils/catalogOrDefault'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import ActivitiesList from './ActivitiesList'
import RentalInfo from './RentalInfo'
import {
  Desc,
  Subdesc,
  Title,
  CustomButton,
  DescPhoto,
  SupportText,
  SupportLink,
  ButtonsBlockText,
  SupportTextBottom,
} from './styles'
import { createRoomMutation } from '../../../../../../_graphql-legacy/salon/createRoomMutation'
import { createSeatMutation } from '../../../../../../_graphql-legacy/salon/createSeatMutation'
import { updateSeatMutation } from '../../../../../../_graphql-legacy/salon/updateSeatMutation'
import { updateRoomMutation } from '../../../../../../_graphql-legacy/salon/updateRoomMutation'
import { useMutation } from '@apollo/client'
import RentalAdditionalInfo from './RentalAdditionalInfo'
import { useEffect } from 'react'
import { PHOTO_URL } from '../../../../../../variables'
import Success from './Success'
import DefaultPhoto from './DefaultPhoto'
import PhotoGallery from './PhotoGallery'
import SupportPopup from './SupportPopup'

function convertNumber(text) {
  if (text === undefined) {
    return undefined
  }

  if (text === '') {
    return undefined
  }

  const int = parseInt(text, 10)

  if (Number.isNaN(int)) {
    return undefined
  }

  return int
}

const findServices = (type, catalog, roomServices) => {
  const resultArray = []
  catalog
    .filter(subgroup => subgroup.id === type)[0]
    .items.map(item => {
      roomServices?.map(service => {
        if (service.id === item.id) {
          resultArray.push(item.id)
        }
      })
    })
  return resultArray
}

const CreateSeat = ({
  salon,
  seatSalon,
  room,
  setCreateSeat,
  refetchSalon,
  setSeatSalon,
  setRoomSeatId,
  setRoom,
  roomSeatId,
  seatActivities,
  seatEquipment,
}) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [roomId, setRoomId] = useState(roomSeatId)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [showSupportPopup, setShowSupportPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [rentalRate, setRentalRate] = useState(
    seatSalon?.rentalPricing?.hour ||
      seatSalon?.rentalPricing?.day ||
      seatSalon?.rentalPricing?.week ||
      seatSalon?.rentalPricing?.month
      ? []
      : ['rentalCustom'],
  )
  const [chosenRentalRents, setChosenRentalRents] = useState({
    hour: seatSalon?.rentalPricing?.hour || null,
    day: seatSalon?.rentalPricing?.day || null,
    week: seatSalon?.rentalPricing?.week || null,
    month: seatSalon?.rentalPricing?.month || null,
  })
  const [defaultPhoto, setDefaultPhoto] = useState(seatSalon?.photo?.id)

  const catalogs = useContext(CatalogsContext)
  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog,
  )

  const resetRentalRate = () => {
    setRentalRate(['rentalCustom'])
    setChosenRentalRents({
      hour: null,
      day: null,
      week: null,
      month: null,
    })
  }

  const equipment_lighting = findServices(
    'equipment_lighting',
    catalogs.salonRoomServicesCatalog.groups[0].subGroups,
    room?.services,
  )

  const equipment_vent = findServices(
    'equipment_vent',
    catalogs.salonRoomServicesCatalog.groups[0].subGroups,
    room?.services,
  )
  const equipment_water = findServices(
    'equipment_water',
    catalogs.salonRoomServicesCatalog.groups[0].subGroups,
    room?.services,
  )
  const equipment_heating = findServices(
    'equipment_heating',
    catalogs.salonRoomServicesCatalog.groups[0].subGroups,
    room?.services,
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [success, showAdditionalInfo])

  useEffect(() => {
    const rentals = []
    if (seatSalon?.rentalPricing?.hour) {
      rentals.push('rentalHour')
    }
    if (seatSalon?.rentalPricing?.day) {
      rentals.push('rentalDay')
    }
    if (seatSalon?.rentalPricing?.week) {
      rentals.push('rentalWeek')
    }
    if (seatSalon?.rentalPricing?.month) {
      rentals.push('rentalMonth')
    }
    if (rentals.length) {
      setRentalRate(rentals)
    } else {
      setRentalRate(['rentalCustom'])
    }
  }, [])

  const [createRoom] = useMutation(createRoomMutation, {
    onCompleted: res => {
      setRoomId(res?.createSalonRoom?.id)
      setRoomSeatId(res?.createSalonRoom?.id)
    },
    onError: error => {
      setLoading(false)
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [createSeat] = useMutation(createSeatMutation, {
    onCompleted: async () => {
      await refetchSalon()
      setLoading(false)
    },
    onError: error => {
      setLoading(false)
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [updateSeat] = useMutation(updateSeatMutation, {
    onCompleted: async () => {
      await refetchSalon()
      setLoading(false)
    },
    onError: error => {
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [updateRoom] = useMutation(updateRoomMutation, {
    onCompleted: async () => {
      await refetchSalon()
      setLoading(false)
    },
    onError: error => {
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = async values => {
    const { photos = [] } = values

    setLoading(true)
    if (!photos.length) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }

    if (!values.activities) {
      setErrors(['Необходимо добавить назначение рабочего кабинета'])
      setErrorPopupOpen(true)
      return
    }

    const roomServices = []

    values?.equipment_heating?.map(item => {
      roomServices.push({ id: item, value: 1 })
    })
    values?.equipment_lighting?.map(item => {
      roomServices.push({ id: item, value: 1 })
    })
    values?.equipment_vent?.map(item => {
      roomServices.push({ id: item, value: 1 })
    })
    values?.equipment_water?.map(item => {
      roomServices.push({ id: item, value: 1 })
    })

    if (values?.electricity_sockets_count) {
      roomServices.push({
        id: 'electricity_sockets_count',
        value: +values?.electricity_sockets_count,
      })
    }
    if (values?.electricity_sockets_extenders_count) {
      roomServices.push({
        id: 'electricity_sockets_extenders_count',
        value: +values?.electricity_sockets_extenders_count,
      })
    }
    if (values?.electricity_sockets_ups_count) {
      roomServices.push({
        id: 'electricity_sockets_ups_count',
        value: +values?.electricity_sockets_ups_count,
      })
    }

    const seatInput = {
      activities: values?.activities || [],
      rentalPricing: rentalRate.includes('rentalCustom')
        ? {
            hour: null,
            day: null,
            week: null,
            month: null,
            year: null,
          }
        : {
            hour: +chosenRentalRents.hour || null,
            day: +chosenRentalRents.day || null,
            week: +chosenRentalRents.week || null,
            month: +chosenRentalRents.month || null,
            year: null,
          },
      allowJointRental: values.allowJointRental || false,
      allowSublease: values.allowSublease || false,
      isAvailableForRent: values?.isAvailableForRent || false,
      rentalPaymentMethods: {
        cash: values?.rentalPaymentMethods?.cash || false,
        bankingCard: values?.rentalPaymentMethods?.bankingCard || false,
        wireTransfer: values?.rentalPaymentMethods?.wireTransfer || false,
        appleOrGooglePay:
          values?.rentalPaymentMethods?.appleOrGooglePay || false,
      },
      salonId: salon.id,
      photoId: defaultPhoto,
      services: [],
      withLicense: values.withLicense || false,
      equipments: values?.equipment || [],
    }

    const roomInput = {
      title: 'title',
      seatCount: 1000,
      description: values?.description || '',
      videoLink: 'title',
      defaultPhotoId: defaultPhoto,
      wetPointsHands: +values?.wetPointsHands || 0,
      wetPointsHead: +values?.wetPointsHead || 0,
      wetPointsShower: +values?.wetPointsShower || 0,
      hasWindows: values?.hasWindows || false,
      space: +values?.space || 10,
      floor: +values?.floor || 1,
      photoIds: photos?.map(photo => photo.id),
      services: roomServices || [],
    }

    if (seatSalon) {
      updateRoom({
        variables: {
          salonId: salon.id,
          roomId: roomSeatId,
          input: roomInput,
        },
      })
      updateSeat({
        variables: {
          salonId: salon.id,
          roomId: roomSeatId,
          seatId: seatSalon.id,
          input: { ...seatInput, roomId: roomSeatId },
        },
      })
      setSuccess(true)
      return
    }

    const createdRoom = await createRoom({
      variables: {
        salonId: salon.id,
        input: roomInput,
      },
    })
    createSeat({
      variables: {
        salonId: salon.id,
        roomId: createdRoom?.data?.createSalonRoom?.id,
        input: {
          ...seatInput,
          roomId: createdRoom?.data?.createSalonRoom?.id,
        },
      },
    })

    setSuccess(true)
  }

  const showAdditionalHandler = form => {
    if (!form.getFieldState('photos').value) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }
    setShowAdditionalInfo(true)
  }

  const photos = room?.photoIds?.map(photoId => {
    return {
      id: photoId,
      kind: 'original',
      url: `${PHOTO_URL}${photoId}/original`,
    }
  })

  return (
    <AutoFocusedForm
      onSubmit={onSubmit}
      initialValues={
        seatSalon
          ? {
              isAvailableForRent: seatSalon?.isAvailableForRent,
              activities: seatSalon?.activities,
              rentalPricing: seatSalon?.rentalPricing,
              seatNumber: seatSalon?.seatNumber,
              allowJointRental: seatSalon?.allowJointRental,
              allowSublease: seatSalon?.allowSublease,
              rentalPaymentMethods: seatSalon?.rentalPaymentMethods,
              services: seatSalon?.services,
              withLicense: seatSalon?.withLicense,
              wetPointsHands: room?.wetPointsHands,
              wetPointsHead: room?.wetPointsHead,
              wetPointsShower: room?.wetPointsShower,
              electricity_sockets_count:
                room?.services?.filter(
                  service => service.id === 'electricity_sockets_count',
                )[0]?.value || 0,
              electricity_sockets_extenders_count:
                room?.services?.filter(
                  service =>
                    service.id === 'electricity_sockets_extenders_count',
                )[0]?.value || 0,
              electricity_sockets_ups_count:
                room?.services?.filter(
                  service => service.id === 'electricity_sockets_ups_count',
                )[0]?.value || 0,
              space: room?.space,
              floor: room?.floor,
              description: room?.description,
              photos,
              equipment_heating,
              equipment_lighting,
              equipment_vent,
              equipment_water,
              hasWindows: room?.hasWindows,
              equipment: seatSalon?.equipments,
            }
          : { isAvailableForRent: true }
      }
      render={({ handleSubmit, form, pristine }) => {
        return (
          <form onSubmit={handleSubmit}>
            {success ? (
              <Success
                salon={salon}
                seatSalon={seatSalon}
                setShowAdditionalInfo={setShowAdditionalInfo}
                setSuccess={setSuccess}
                setSeatSalon={setSeatSalon}
                setRoom={setRoom}
                setRoomSeatId={setRoomSeatId}
                resetRentalRate={resetRentalRate}
                roomSeatId={roomSeatId}
                activitiesCatalog={seatActivities.groups}
              />
            ) : showAdditionalInfo ? (
              <RentalAdditionalInfo
                catalogs={catalogs}
                equipmentCatalog={seatEquipment.groups}
                setShowAdditionalInfo={setShowAdditionalInfo}
              >
                <MobileHidden>
                  <CustomButton
                    variant="red"
                    size="noWidth"
                    font="small"
                    type="submit"
                    // disabled={pristine || loading}
                  >
                    Сохранить и разместить на платформе
                  </CustomButton>
                </MobileHidden>
                <MobileVisible>
                  <CustomButton
                    variant="red"
                    size="fullWidth"
                    font="popUp"
                    type="submit"
                    style={{ marginBottom: 20 }}
                    // disabled={pristine || loading}
                  >
                    Сохранить и разместить на платформе
                  </CustomButton>
                </MobileVisible>
              </RentalAdditionalInfo>
            ) : (
              <>
                <SupportPopup
                  showSupportPopup={showSupportPopup}
                  setShowSupportPopup={setShowSupportPopup}
                />
                <Title>Фото и назначение сдаваемого рабочего места</Title>
                <DescPhoto>Загрузите главное фото*</DescPhoto>
                <DefaultPhoto
                  defaultPhoto={defaultPhoto}
                  setDefaultPhoto={setDefaultPhoto}
                />
                <Desc>Загрузите фотографии в фотогалерею*</Desc>
                <PhotoGallery />
                <Desc>Выберите назначение рабочего места/кабинета*</Desc>
                {/* <Subdesc>
                  Выберите один или несколько видов деятельности, которые
                  осуществляют на этом рабочем месте
                </Subdesc> */}
                <ActivitiesList
                  catalog={seatActivities.groups}
                  mbDesc={30}
                  onlyOneChoose
                />
                <SupportText>
                  Если не нашли свое направление работы, обратитесь в{' '}
                  <SupportLink onClick={() => setShowSupportPopup(true)}>
                    службу поддержки
                  </SupportLink>
                  , и мы поможем разобраться
                </SupportText>
                <Desc>Стоимость и период аренды*</Desc>
                <Subdesc>
                  Выберите оптимальные для вас периоды аренды рабочего места и
                  укажите цену. Заполните только нужные вам поля, а остальные
                  оставьте пустыми
                </Subdesc>
                <RentalInfo
                  rentalRate={rentalRate}
                  setRentalRate={setRentalRate}
                  chosenRentalRents={chosenRentalRents}
                  setChosenRentalRents={setChosenRentalRents}
                />
                <Error
                  errors={errors}
                  isOpen={isErrorPopupOpen}
                  setOpen={setErrorPopupOpen}
                />
                <MobileHidden>
                  <CustomButton
                    variant="red"
                    size="noWidth"
                    font="small"
                    type="submit"
                    // disabled={pristine || loading}
                  >
                    Разместить на платформе
                  </CustomButton>
                  <ButtonsBlockText>или</ButtonsBlockText>
                  <CustomButton
                    variant="darkTransparent"
                    size="noWidth"
                    font="small"
                    onClick={() => showAdditionalHandler(form)}
                  >
                    Дополнить информацию о кресле/кабинете
                  </CustomButton>
                </MobileHidden>
                <MobileVisible>
                  <CustomButton
                    variant="red"
                    size="fullWidth"
                    font="popUp"
                    type="submit"
                    style={{ marginBottom: 20 }}
                    // disabled={pristine || loading}
                  >
                    Разместить на платформе
                  </CustomButton>
                  <ButtonsBlockText>или</ButtonsBlockText>
                  <CustomButton
                    variant="darkTransparent"
                    size="noWidth"
                    onClick={() => showAdditionalHandler(form)}
                  >
                    Дополнить информацию о кресле/кабинете
                  </CustomButton>
                </MobileVisible>
                <SupportTextBottom>
                  Возникли сложности с заполнением?
                  <br />
                  <SupportLink onClick={() => setShowSupportPopup(true)}>
                    Обратитесь к нашим специалистам за помощью
                  </SupportLink>
                </SupportTextBottom>
              </>
            )}
          </form>
        )
      }}
    />
  )
}
export default CreateSeat

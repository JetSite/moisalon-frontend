import { useMutation } from '@apollo/client'
import { FC, useState } from 'react'
import AutoFocusedForm from 'src/components/blocks/Form/AutoFocusedForm'
import { ISalonWorkplaces } from 'src/types'
import { IApolloRefetch, IChildren, IID, ISetState } from 'src/types/common'
import { ISalonPage } from 'src/types/salon'

interface Props {
  salon: ISalonPage
  workplace: ISalonWorkplaces | null
  setWorkplace: ISetState<ISalonWorkplaces | null>
  refetchSalon: IApolloRefetch
  setWorkplaceId: ISetState<IID | null>
  workplaceId: IID | null
  setCreateWorkplace: ISetState<boolean>
  children: IChildren
}

export const ChangeWorkplaceForm: FC<Props> = ({
  salon,
  children,
  workplace,
  workplaceId,
  refetchSalon,
  setCreateWorkplace,
  setWorkplaceId,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [roomId, setRoomId] = useState(workplaceId)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [showSupportPopup, setShowSupportPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [defaultPhoto, setDefaultPhoto] = useState(workplace?.photo?.id)
  const [rentalRate, setRentalRate] = useState(
    workplace?.rentalPricing?.hour ||
      workplace?.rentalPricing?.day ||
      workplace?.rentalPricing?.week ||
      workplace?.rentalPricing?.month
      ? []
      : ['rentalCustom'],
  )
  const [chosenRentalRents, setChosenRentalRents] = useState({
    hour: workplace?.rentalPricing?.hour || null,
    day: workplace?.rentalPricing?.day || null,
    week: workplace?.rentalPricing?.week || null,
    month: workplace?.rentalPricing?.month || null,
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

    const [createRoom] = useMutation(createRoomMutation, {
      onCompleted: res => {
        setRoomId(res?.createSalonRoom?.id)
        setWorkplaceId(res?.createSalonRoom?.id)
      },
      onError: error => {
        setLoading(false)
        const errorMessages = error.graphQLErrors
          .filter(
            e =>
              e.extensions &&
              e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
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
              e.extensions &&
              e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
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
              e.extensions &&
              e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
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
              e.extensions &&
              e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
          )
          .map(e => e.message)
        setErrors(errorMessages)
        setErrorPopupOpen(true)
      },
    })

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

    if (workplace) {
      updateRoom({
        variables: {
          salonId: salon.id,
          roomId: workplaceId,
          input: roomInput,
        },
      })
      updateSeat({
        variables: {
          salonId: salon.id,
          roomId: workplaceId,
          seatId: workplace.id,
          input: { ...seatInput, roomId: workplaceId },
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
  return (
    <AutoFocusedForm
      onSubmit={onSubmit}
      initialValues={
        workplace
          ? {
              isAvailableForRent: workplace?.isAvailableForRent,
              activities: workplace?.activities,
              rentalPricing: workplace?.rentalPricing,
              seatNumber: workplace?.seatNumber,
              allowJointRental: workplace?.allowJointRental,
              allowSublease: workplace?.allowSublease,
              rentalPaymentMethods: workplace?.rentalPaymentMethods,
              services: workplace?.services,
              withLicense: workplace?.withLicense,
              wetPointsHands: workplace?.wetPointsHands,
              wetPointsHead: workplace?.wetPointsHead,
              wetPointsShower: workplace?.wetPointsShower,
              electricity_sockets_count:
                workplace?.services?.filter(
                  service => service.id === 'electricity_sockets_count',
                )[0]?.value || 0,
              electricity_sockets_extenders_count:
                workplace?.services?.filter(
                  service =>
                    service.id === 'electricity_sockets_extenders_count',
                )[0]?.value || 0,
              electricity_sockets_ups_count:
                workplace?.services?.filter(
                  service => service.id === 'electricity_sockets_ups_count',
                )[0]?.value || 0,
              space: workplace?.space,
              floor: workplace?.floor,
              description: workplace?.description,
              photos,
              equipment_heating,
              equipment_lighting,
              equipment_vent,
              equipment_water,
              hasWindows: workplace?.hasWindows,
              equipment: workplace?.equipments,
            }
          : { isAvailableForRent: true }
      }
      render={({ handleSubmit, form, pristine }) => {
        return children
      }}
    />
  )
}

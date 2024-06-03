import {
  useState,
  useMemo,
  FC,
  RefObject,
  RefAttributes,
  LegacyRef,
  MutableRefObject,
} from 'react'
import { useRouter } from 'next/router'
import { Wrapper, Title } from './styled'
import { MobileVisible, MobileHidden } from '../../../../../../styles/common'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import Button from '../../../../../ui/Button'
import About from './components/About'
import Socials from './components/Socials'
import SalonActivities from './components/SalonActivities'
import SalonServices from './components/SalonServices'
import Schedule from './components/Schedule'
import Administrator from './components/Administrator'
import catalogOrDefault from '../../../../../../utils/catalogOrDefault'
import { useMutation } from '@apollo/react-hooks'
import { createSalonMutation } from '../../../../../../_graphql-legacy/salon/createSalonMutation'
import { updateSalonMutation } from '../../../../../../_graphql-legacy/salon/updateSalonMutation'
import { updateSalonIdentityMutation } from '../../../../../../_graphql-legacy/salon/updateSalonIdentityMutation'
import { updateSalonLogoMutation } from '../../../../../../_graphql-legacy/salon/updateSalonLogoMutation'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IID, ISetState } from 'src/types/common'
import { IServiceInForm } from 'src/types/services'
import { IHandleClickNextTabInForm } from '../..'

interface Props {
  allTabs: RefObject<HTMLFormElement>
  ref1: RefObject<HTMLDivElement>
  ref2: RefObject<HTMLDivElement>
  ref3: RefObject<HTMLDivElement>
  ref4: RefObject<HTMLDivElement>
  ref5: RefObject<HTMLDivElement>
  ref6: RefObject<HTMLDivElement>
  lessor: boolean
  handleClickNextTab: IHandleClickNextTabInForm
  salon: ISalon
  setNoPhotoError: ISetState<boolean>
  photoSalonId: IID | null
}

const RegistrationForm: FC<Props> = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
  handleClickNextTab,
  photoSalonId,
  salon,
  setNoPhotoError,
  lessor,
}) => {
  const router = useRouter()
  const [clickAddress, setClickAddress] = useState<boolean>(true)
  const [errors, setErrors] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const { services, activities } = useBaseStore(getStoreData)

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

  const salonServicesCatalog: IServiceInForm[] = services?.length
    ? services?.map(
        ({ id, serviceCategoryName, services: insideServices }) => ({
          id,
          description: serviceCategoryName,
          items: insideServices.map(({ id, serviceName }) => ({
            groupName: serviceName,
            title: serviceName,
            id,
          })),
        }),
      )
    : []

  console.log('services')

  const salonActivitiesCatalog = activities
    ? activities.map(({ activityName, id }) => ({
        id,
        name: id,
        title: activityName,
      }))
    : []

  const salonWithInitialArrays = useMemo(() => {
    return {
      ...salon,
      salonPhones: [
        {
          haveTelegram: false,
          haveViber: false,
          haveWhatsApp: false,
          phoneNumber: '',
        },
      ],
      workingHours: [
        {
          startDayOfWeek: 'MONDAY',
          startHour: 0,
          startMinute: 0,
          endDayOfWeek: 'FRIDAY',
          endHour: 23,
          endMinute: 59,
        },
      ],
      contactPersonWorkingHours: [
        {
          startDayOfWeek: 'MONDAY',
          startHour: 0,
          startMinute: 0,
          endDayOfWeek: 'FRIDAY',
          endHour: 23,
          endMinute: 59,
        },
      ],
      address: salon?.salonAddress,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [mutate, { loading }] = useMutation(updateSalonMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async () => {
      await refetch()
      router.push(
        {
          pathname: lessor ? '/rentSalonSeat' : '/masterCabinet',
          query: { id: salon.id },
        },
        lessor ? '/rentSalonSeat' : '/masterCabinet',
      )
    },
  })

  const [mutateNameAndAddress] = useMutation(updateSalonIdentityMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [mutateLogo] = useMutation(updateSalonLogoMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [createSalon, { loadingCreate }] = useMutation(createSalonMutation, {
    onCompleted: async ({ createSalon }) => {
      await refetch()
      router.push(
        {
          pathname: lessor ? '/rentSalonSeat' : '/masterCabinet',
          query: { id: createSalon.id },
        },
        lessor ? '/rentSalonSeat' : '/masterCabinet',
      )
    },

    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = values => {
    console.log(values)

    //   if (!clickAddress || !values.address) {
    //     setErrors(['Выберите адрес салона из выпадающего списка'])
    //     setErrorPopupOpen(true)
    //     return
    //   }
    //   if (!salon && !photoSalonId) {
    //     setNoPhotoError(true)
    //     setErrors(['Необходимо добавить логотип салона'])
    //     setErrorPopupOpen(true)
    //     return
    //   }
    //   if (!salon && !values.photos) {
    //     setErrors(['Необходимо добавить фото салона'])
    //     setErrorPopupOpen(true)
    //     return
    //   }

    //   if (!salon) {
    //     const { photos = [], contactPersonPhone = {} } = values
    //     const personPhone = {
    //       haveTelegram: false,
    //       haveViber: false,
    //       haveWhatsApp: false,
    //       phoneNumber: '',
    //     }

    //     createSalon({
    //       variables: {
    //         input: {
    //           ...values,
    //           contactPersonPhone: { ...personPhone, ...contactPersonPhone },
    //           isNotRent: false,
    //           photoIds: photos.map(photo => photo.id),
    //           logoId: photoSalonId,
    //           lessor: lessor ? true : false,
    //         },
    //       },
    //     })
    //   }

    //   if (salon) {
    //     const { photos = [], contactPersonPhone = {} } = values
    //     const personPhone = {
    //       haveTelegram: false,
    //       haveViber: false,
    //       haveWhatsApp: false,
    //       phoneNumber: '',
    //     }

    //     if (
    //       salon?.name !== values.name ||
    //       salon?.address?.full !== values.address
    //     ) {
    //       mutateNameAndAddress({
    //         variables: {
    //           input: {
    //             name: values.name,
    //             address: values.address,
    //             salonId: salon.id,
    //           },
    //         },
    //       })
    //     }

    //     if (photoSalonId) {
    //       mutateLogo({
    //         variables: { input: { salonId: salon.id, logoId: photoSalonId } },
    //       })
    //     }

    //     mutate({
    //       variables: {
    //         input: {
    //           ...values,
    //           isNotRent: false,
    //           contactPersonPhone: { ...personPhone, ...contactPersonPhone },
    //           salonId: salon.id,
    //           photoIds: photos.map(t => t.id),
    //           lessor: salon?.lessor ? true : false,
    //         },
    //       },
    //     })
    //   }
  }

  return (
    <Wrapper>
      <Title>Расскажите о своем салоне</Title>
      <AutoFocusedForm
        initialValues={salonWithInitialArrays}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        onSubmit={onSubmit}
        render={({ handleSubmit, form, pristine, ...rest }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setClickAddress={setClickAddress}
                number={1}
                handleClickNextTab={handleClickNextTab}
              />
              <SalonActivities
                ref2={ref2}
                number={2}
                activities={salonActivitiesCatalog}
                handleClickNextTab={handleClickNextTab}
              />
              <SalonServices
                ref3={ref3}
                number={3}
                services={salonServicesCatalog}
                handleClickNextTab={handleClickNextTab}
              />
              <Schedule
                ref4={ref4}
                number={4}
                handleClickNextTab={handleClickNextTab}
              />
              <Administrator
                ref5={ref5}
                number={5}
                handleClickNextTab={handleClickNextTab}
              />
              <Socials ref6={ref6} />
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <MobileHidden>
                <Button
                  variant="red"
                  size="noWidth"
                  type="submit"
                  disabled={pristine || loadingCreate || loading}
                >
                  {loadingCreate || loading
                    ? 'Подождите'
                    : 'Сохранить и продолжить'}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={pristine || loadingCreate || loading}
                >
                  {loadingCreate || loading
                    ? 'Подождите'
                    : 'Сохранить и продолжить'}
                </Button>
              </MobileVisible>
            </form>
          )
        }}
      />
    </Wrapper>
  )
}

export default RegistrationForm

const salonInput = {
  activities: ['1'], // +
  salonContactPersonEmail: 'sprttt@nail.ru', // +
  salonContactPersonName: 'Anatoliy', // +
  salonContactPersonPhone: '43453434', // +
  salonDescription:
    'Стильная парикмахерская, предлагающая профессиональные стрижки, окрашивание, укладку и ух', // +
  salonEmail: 'shpun_06@mail.ru', // +
  locationDirections: 'go to dor', // +
  salonName: 'Salon PASHA', // +
  salonOnlineBookingUrl: 'http://localhost:3000/createLessorSalon', // +
  salonPhones: [
    // +
    {
      haveTelegram: true,
      haveViber: false,
      haveWhatsApp: false,
      phoneNumber: '4345534534',
    },
  ],
  services: [
    // value remove
    // +
    { id: '1', value: 1 },
    { id: '2', value: 1 },
    { id: '3', value: 1 },
    { id: '5', value: 1 },
    { id: '8', value: 1 },
    { id: '11', value: 1 },
  ],
  // socialNetworks: [{title: string, link: string}]
  socialNetworks: {
    odnoklassniki: 'https://music.youtube.com',
    vKontakte: 'https://music.youtube.com',
    youTube: 'https://music.youtube.com',
  },
  salonWebSiteUrl: 'https://music.youtube.com', // +
  workingHours: [
    {
      // dayOfWeek:  "Понедельник - Пятница"
      // endTime:  "21:45:00.000"
      // startTime   "10:00:00.000"
      endDayOfWeek: 'FRIDAY',
      endHour: 23,
      endMinute: 59,
      startDayOfWeek: 'MONDAY',
      startHour: 0,
      startMinute: 0,
    },
    {
      endDayOfWeek: 'SATURDAY',
      endHour: 5,
      endMinute: 59,
      startDayOfWeek: 'THURSDAY',
      startHour: 3,
      startMinute: 0,
    },
  ],
}

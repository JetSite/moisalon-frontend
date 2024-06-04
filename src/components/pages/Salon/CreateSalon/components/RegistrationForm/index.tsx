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
import { ICity, IPhoto } from 'src/types'
import { workingHoursOptions } from 'src/components/blocks/Form/WorkingTimeField/WorkingTime'
import { transformWorkingHours } from 'src/utils/newUtils/transformWorkingHoursInput'
import { UPDATE_SALON } from 'src/api/graphql/salon/mutations/updateSalon'
import { getServicesForCatalog } from 'src/utils/newUtils/getServicesForCatalog'
import { cyrToTranslit } from '../../../../../../utils/translit'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { getPrepareInputSalonForm } from './utils'
import { CREATE_SALON } from 'src/api/graphql/salon/mutations/createSalon'
import useAuthStore from 'src/store/authStore'

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
  salon: ISalonPage
  setNoPhotoError: ISetState<boolean>
  photoSalonId: IID | null
  logo: IPhoto | null
  cities: ICity[]
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
  logo,
  cities,
}) => {
  const router = useRouter()
  const [clickCity, setClickCity] = useState<string | null>(null)
  const [errors, setErrors] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const { services, activities } = useBaseStore(getStoreData)
  const [selectCityId, setSelectCityId] = useState(null)
  const { me } = useAuthStore(getStoreData)
  const salonServicesCatalog: IServiceInForm[] = getServicesForCatalog(services)

  const salonActivitiesCatalog = activities
    ? activities.map(({ activityName, id }) => ({
        id,
        name: id,
        title: activityName,
      }))
    : []

  const salonWithInitialArrays = useMemo(() => {
    const initialInput = salon
      ? {
          salonName: salon.salonName,
          salonEmail: salon.salonEmail,
          salonDescription: salon.salonDescription,
          locationDirections: salon.locationDirections,
          salonContactPersonEmail: salon.salonContactPersonEmail,
          salonContactPersonName: salon.salonContactPersonName,
          salonOnlineBookingUrl: salon.salonOnlineBookingUrl,
          salonWebSiteUrl: salon.salonWebSiteUrl,
          salonPhones: salon.salonPhones.map(e => ({
            phoneNumber: e.phoneNumber,
            haveTelegram: e.haveTelegram,
            haveViber: e.haveViber,
            haveWhatsApp: e.haveWhatsApp,
          })),
          activities: salon.activities.map(e => e.id),
          services: getServicesForCatalog([]),
        }
      : {
          salonName: '',
          salonPhones: [
            {
              haveTelegram: false,
              haveViber: false,
              haveWhatsApp: false,
              phoneNumber: '',
            },
          ],
        }
    return {
      ...initialInput,
      socialNetworks: [],
      services: [],
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
  }, [])

  const [addCity, { loading: addCityLoad }] = useMutation(CREATE_CITY, {
    onCompleted: data => {
      setSelectCityId(data.createCity.data.id)
      console.log(data)
    },
  })

  // const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
  //   skip: true,
  //   onCompleted: res => {
  //     setMe({
  //       info: res?.me?.info,
  //       master: res?.me?.master,
  //       locationByIp: res?.locationByIp,
  //       salons: res?.me?.salons,
  //       rentalRequests: res?.me?.rentalRequests,
  //     })
  //   },
  // })

  const [mutate, { loading }] = useMutation(UPDATE_SALON, {
    // onError: error => {
    //   const errorMessages = error.graphQLErrors.map(e => e.message)
    //   setErrors(errorMessages)
    //   setErrorPopupOpen(true)
    // },
    onCompleted: async data => {
      console.log(data)

      // await refetch()
      // router.push(
      //   {
      //     pathname: lessor ? '/rentSalonSeat' : '/masterCabinet',
      //     query: { id: salon.id },
      //   },
      //   lessor ? '/rentSalonSeat' : '/masterCabinet',
      // )
    },
  })

  // const [mutateNameAndAddress] = useMutation(updateSalonIdentityMutation, {
  //   onError: error => {
  //     const errorMessages = error.graphQLErrors.map(e => e.message)
  //     setErrors(errorMessages)
  //     setErrorPopupOpen(true)
  //   },
  // })

  // const [mutateLogo] = useMutation(updateSalonLogoMutation, {
  //   onError: error => {
  //     const errorMessages = error.graphQLErrors.map(e => e.message)
  //     setErrors(errorMessages)
  //     setErrorPopupOpen(true)
  //   },
  // })

  const [createSalon, { loading: loadingCreate }] = useMutation(CREATE_SALON, {
    // onCompleted: async ({ createSalon }) => {
    //   await refetch()
    //   router.push(
    //     {
    //       pathname: lessor ? '/rentSalonSeat' : '/masterCabinet',
    //       query: { id: createSalon.id },
    //     },
    //     lessor ? '/rentSalonSeat' : '/masterCabinet',
    //   )
  })

  //   onError: error => {
  //     const errorMessages = error.graphQLErrors.map(e => e.message)
  //     setErrors(errorMessages)
  //     setErrorPopupOpen(true)
  //   },
  // })

  const onSubmit = values => {
    console.log(values)
    const findCity =
      cities?.find(e => e.citySlug === cyrToTranslit(clickCity)) || null

    if (!findCity) {
      addCity({
        variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
      })
    }
    const input = getPrepareInputSalonForm({
      values,
      selectCityId,
      logo,
      findCity,
    })
    if (salon?.id) {
      mutate({ variables: { salonId: salon.id, input } })
    } else {
      createSalon({ variables: { input: { user: me?.info.id, ...input } } })
    }

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
                salon={salon}
                photos={salon?.salonPhotos || []}
                ref1={ref1}
                setClickCity={setClickCity}
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

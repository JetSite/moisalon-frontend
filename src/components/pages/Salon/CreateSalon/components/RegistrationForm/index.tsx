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
import { getPrepareInputSalonForm } from './utils/getPrepareInputSalonForm'
import { CREATE_SALON } from 'src/api/graphql/salon/mutations/createSalon'
import useAuthStore from 'src/store/authStore'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { UPDATE_SALON_PHOTO } from 'src/api/graphql/salon/mutations/updateSalonPhoto'
import {
  IInitialValuesSalonForm,
  getInitialValuesSalonForm,
} from './utils/getInitialValuesSalonForm'

interface Props {
  allTabs: RefObject<HTMLFormElement>
  ref1: RefObject<HTMLDivElement>
  ref2: RefObject<HTMLDivElement>
  ref3: RefObject<HTMLDivElement>
  ref4: RefObject<HTMLDivElement>
  ref5: RefObject<HTMLDivElement>
  ref6: RefObject<HTMLDivElement>
  rent: boolean
  handleClickNextTab: IHandleClickNextTabInForm
  salon: ISalonPage | null
  setNoPhotoError: ISetState<boolean>
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
  salon,
  setNoPhotoError,
  rent,
  logo,
  cities,
}) => {
  const router = useRouter()
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [clickCity, setClickCity] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const { services, activities } = useBaseStore(getStoreData)
  const { me } = useAuthStore(getStoreData)
  const salonServicesCatalog: IServiceInForm[] = getServicesForCatalog(services)
  const [photosArray, setPhotosArray] = useState<string[]>(
    salon?.photos?.map(e => e.id) || [],
  )
  const [loading, setLoading] = useState(false)

  const salonActivitiesCatalog = activities
    ? activities.map(({ title, id }) => ({
      id,
      name: id,
      title: title,
    }))
    : []

  const salonWithInitialArrays = useMemo<IInitialValuesSalonForm>(
    () => getInitialValuesSalonForm(salon),
    [],
  )

  const [addCity, { loading: addCityLoad }] = useMutation(CREATE_CITY)

  const [mutate, { loading: loadingUpdate }] = useMutation(UPDATE_SALON, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [createSalon, { loading: loadingCreate }] = useMutation(CREATE_SALON, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = (values: IInitialValuesSalonForm) => {
    if (!clickCity) {
      setErrors(['Нужно добавить адрес'])
      setErrorPopupOpen(true)
      handleClickNextTab(0)
      return
    }
    if (!values.services?.length) {
      setErrors(['Нужно добавить услугу'])
      setErrorPopupOpen(true)
      handleClickNextTab(2)
      return
    }
    if (!logo) {
      setErrors(['Нужно добавить логотип'])
      setErrorPopupOpen(true)
      return
    }
    setLoading(true)
    const findCity =
      citiesArray?.find(e => e.slug === cyrToTranslit(clickCity)) || null
    if (!findCity) {
      addCity({
        variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
      }).then(data => {
        const findCityData = flattenStrapiResponse(data.data.createCity.data)
        setCitiesArray(prev => prev.concat(findCityData))
        const input = getPrepareInputSalonForm({
          values,
          logo,
          findCity,
          photos: photosArray,
          rent,
        })
        if (salon?.id) {
          mutate({ variables: { salonId: salon.id, input } }).then(() => {
            router.push(
              `/${findCityData?.slug}/${rent ? 'rent' : 'salon'}/${salon.id}`,
            )
          })
        } else {
          createSalon({
            variables: { input: { user: me?.info.id, ...input } },
          }).then(data => {
            router.push(
              `/${findCityData?.slug}/${rent ? 'rent' : 'salon'}/${data.data.createSalon.data.id
              }`,
            )
          })
        }
      })
    } else {
      const input = getPrepareInputSalonForm({
        values,
        logo,
        findCity,
        photos: photosArray,
      })
      if (salon?.id) {
        mutate({ variables: { salonId: salon.id, input } }).then(() => {
          router.push(
            `/${findCity?.slug}/${rent ? 'rent' : 'salon'}/${salon.id}`,
          )
        })
      } else {
        createSalon({
          variables: { input: { user: me?.info.id, ...input } },
        }).then(data => {
          router.push(
            `/${findCity?.slug}/${rent ? 'rent' : 'salon'}/${data.data.createSalon.data.id
            }`,
          )
        })
      }
    }
  }

  return (
    <Wrapper>
      <Title>Расскажите о своем салоне</Title>
      <AutoFocusedForm
        initialValues={salonWithInitialArrays}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        onSubmit={e => onSubmit(e as IInitialValuesSalonForm)}
        render={({ handleSubmit, form, pristine, ...rest }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                photos={salon?.photos || []}
                ref1={ref1}
                setClickCity={setClickCity}
                number={1}
                handleClickNextTab={handleClickNextTab}
                setPhotosArray={setPhotosArray}
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
                  disabled={pristine || loadingCreate || loadingUpdate || loading}
                >
                  {loadingCreate || loadingUpdate || loading
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
                  disabled={pristine || loadingCreate || loadingUpdate || loading}
                >
                  {loadingCreate || loadingUpdate || loading
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

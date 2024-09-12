import {
  useState,
  useCallback,
  FC,
  RefObject,
  FormHTMLAttributes,
  useEffect,
  useMemo,
} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Wrapper, Title } from './styled'
import { MobileVisible, MobileHidden } from '../../../../../../styles/common'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import { updateBrandPersonalInformationMutation } from '../../../../../../_graphql-legacy/brand/updateBrandPersonalInformationMutation'
import { updateBrandNameMutation } from '../../../../../../_graphql-legacy/brand/updateBrandName'
import Error from '../../../../../blocks/Form/Error'
import Button from '../../../../../ui/Button'
import { createBrandMutation } from '../../../../../../_graphql-legacy/brand/createBrandMutation'
import { useRouter } from 'next/router'
import About from './components/About'
import Socials from './components/Socials'
import { useShallow } from 'zustand/react/shallow'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useLazyQuery } from '@apollo/client'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { CREATE_BRAND } from 'src/api/graphql/brand/mutations/createBrand'
import { ICity, ICountry, IPhoto } from 'src/types'
import { CreateBrandProps } from '../..'
import { ISetState } from 'src/types/common'
import { cyrToTranslit } from 'src/utils/translit'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { UPDATE_BRAND } from 'src/api/graphql/brand/mutations/updateBrand'
import {
  IInitialValuesBrandForm,
  getInitialValuesBrandForm,
} from '../utils/getInitialValuesBrandForm'
import { getPrepareInputBrandForm } from '../utils/getPrepareInputBrandForm'
import { useBrandMutate } from '../utils/useBrandMutate'

interface Props extends CreateBrandProps {
  allTabs: RefObject<HTMLFormElement>
  ref1: RefObject<HTMLDivElement>
  ref2: RefObject<HTMLDivElement>
  handleClickNextTab: (number: number) => void
  logo: IPhoto | null
  setNoPhotoError: ISetState<boolean>
  setDirtyForm: ISetState<boolean>
  dirtyForm: boolean
}

const RegistrationForm: FC<Props> = ({
  allTabs,
  ref1,
  ref2,
  handleClickNextTab,
  logo,
  brand,
  setNoPhotoError,
  cities,
  setDirtyForm,
  dirtyForm,
  countries,
}) => {
  const { me, user } = useAuthStore(useShallow(getStoreData))
  const { setUser } = useAuthStore(useShallow(getStoreEvent))
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [countriesArray, setCountriesArray] = useState<ICountry[]>(countries)

  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [selectCity, setSelectCity] = useState<string | null>(null)
  const [selectCountry, setSelectCountry] = useState<string | null>(null)

  const router = useRouter()

  const initialValues = useMemo<IInitialValuesBrandForm>(
    () => getInitialValuesBrandForm(brand),
    [],
  )

  // const [getUser] = useLazyQuery(USER, {
  //   onCompleted: data => {
  //     const prepareData = flattenStrapiResponse(data.usersPermissionsUser)

  //     if (user) {
  //       const newData = {
  //         ...user,
  //         owner: {
  //           ...user.owner,
  //           brands: prepareData.brands,
  //         },
  //       }
  //       setUser({ ...newData })
  //     }
  //   },
  //   onError: err => console.log(err),
  //   notifyOnNetworkStatusChange: true,
  // })

  // const [createBrand] = useMutation(CREATE_BRAND, {
  //   onCompleted: () => {
  //     getUser({ variables: { id: me?.info?.id } })
  //     router.push('/masterCabinet')
  //   },
  // })
  // const [addCity] = useMutation(CREATE_CITY)
  // const [updateBrand] = useMutation(UPDATE_BRAND, {
  //   onCompleted: data => {
  //     getUser({ variables: { id: me?.info?.id } })
  //     router.push(`/${brand.city?.slug}/brand/${brand.id}`)
  //   },
  // })

  const { loading: fetchLoading, handleCreateOrUpdateBrand } = useBrandMutate({
    setErrors,
    setErrorPopupOpen,
  })

  // const onSubmit = useCallback(
  //   (values: any) => {
  //     if (!clickAddress || !values.address) {
  //       setErrors(['Выберите адрес места работы из выпадающего списка'])
  //       setErrorPopupOpen(true)
  //       return
  //     }
  //     if (!brand && !logo) {
  //       setNoPhotoError(true)
  //       setErrors(['Необходимо добавить фото бренда'])
  //       setErrorPopupOpen(true)
  //       return
  //     }
  //     const phone = {
  //       phoneNumber: values?.phone?.phoneNumber,
  //       haveTelegram: values?.phone?.haveTelegram || false,
  //       haveViber: values?.phone?.haveViber || false,
  //       haveWhatsApp: values?.phone?.haveWhatsApp || false,
  //     }

  //     const socialNetworks = values.socialNetworkUrls
  //       ? Object?.keys(values.socialNetworkUrls)?.map(e => ({
  //           title: e,
  //           link: values.socialNetworkUrls[e] as string,
  //         }))
  //       : []

  //     const findCity =
  //       citiesArray?.find(e => e.slug === cyrToTranslit(clickCity)) || null

  //     if (!findCity) {
  //       setLoading(true)
  //       addCity({
  //         variables: { name: clickCity, slug: cyrToTranslit(clickCity) },
  //         onCompleted: data => {
  //           const findCityData = flattenStrapiResponse(data.createCity)
  //           setCitiesArray(prev => prev.concat(findCityData))

  //           console.log(findCityData)

  //           const inputToSave = {
  //             name: values.name,
  //             logo: logo?.id,
  //             city: findCityData.id,
  //             // country: values.country,
  //             phones: [phone],
  //             email: values.email,
  //             address: values.address,
  //             description: values.description,
  //             history: values.history,
  //             manufacture: values.manufacture,
  //             webSiteUrl: values.webSiteUrl,
  //             socialNetworks,
  //             user: user?.info.id,
  //             publishedAt: new Date().toISOString(),
  //           }

  //           try {
  //             if (!brand) {
  //               createBrand({
  //                 variables: {
  //                   input: {
  //                     ...inputToSave,
  //                   },
  //                 },
  //               })
  //             } else {
  //               updateBrand({
  //                 variables: {
  //                   brandId: brand.id,
  //                   input: {
  //                     ...inputToSave,
  //                   },
  //                 },
  //               })
  //             }
  //           } catch (error) {
  //             console.error(error)
  //             setLoading(false)
  //           }
  //         },
  //       })
  //     } else {
  //       const inputToSave = {
  //         name: values.name,
  //         logo: logo?.id,
  //         city: findCity.id,
  //         // country: values.country,
  //         phones: [phone],
  //         email: values.email,
  //         address: values.address,
  //         description: values.description,
  //         history: values.history,
  //         manufacture: values.manufacture,
  //         webSiteUrl: values.webSiteUrl,
  //         socialNetworks,
  //         user: user?.info.id,
  //         publishedAt: new Date().toISOString(),
  //       }
  //       try {
  //         if (!brand) {
  //           setLoading(true)
  //           createBrand({
  //             variables: {
  //               input: {
  //                 ...inputToSave,
  //               },
  //             },
  //           })
  //         } else {
  //           updateBrand({
  //             variables: {
  //               brandId: brand.id,
  //               input: {
  //                 ...inputToSave,
  //               },
  //             },
  //           })
  //         }
  //       } catch (error) {
  //         console.error(error)
  //         setLoading(false)
  //       }
  //     }

  //     console.log('values', values)
  //   },
  //   [clickAddress, logo],
  // )

  const onSubmit = (values: IInitialValuesBrandForm) => {
    console.log('values', values)

    if (!selectCity || !values.address) {
      setErrors([
        'Выберите адрес представительства бренда из выпадающего списка',
      ])
      setErrorPopupOpen(true)
      handleClickNextTab(0)
      return
    }
    if (!selectCountry) {
      setErrors(['Выберите страну производства бренда из выпадающего списка'])
      setErrorPopupOpen(true)
      handleClickNextTab(0)

      return
    }
    if (!logo) {
      setNoPhotoError(true)
      setErrors(['Необходимо добавить логотип бренда'])
      setErrorPopupOpen(true)
      return
    }

    const input = getPrepareInputBrandForm({ values, logo })

    console.log('input', input)
    handleCreateOrUpdateBrand({
      setCitiesArray,
      citiesArray,
      countriesArray,
      setCountriesArray,
      selectCity,
      selectCountry,
      input,
      brand,
    })
  }

  // console.log('initialValues', initialValues)
  // console.log('brand', brand)

  console.log(countriesArray)

  return (
    <Wrapper>
      <Title>Информация о бренде</Title>
      <AutoFocusedForm
        onSubmit={e => onSubmit(e as IInitialValuesBrandForm)}
        initialValues={initialValues}
        keepDirtyOnReinitialize
        initialValuesEqual={() => true}
        render={({ handleSubmit, form }) => {
          useEffect(() => {
            const unsubscribe = form.subscribe(
              ({ dirty }) => {
                const isNewLogo = !!logo && logo.id !== brand?.logo?.id
                isNewLogo ? setDirtyForm(true) : setDirtyForm(dirty)
              },
              { dirty: true },
            )
            return unsubscribe
          }, [form, logo])
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                ref1={ref1}
                setSelectCity={setSelectCity}
                setSelectCountry={setSelectCountry}
                handleClickNextTab={handleClickNextTab}
                number={1}
              />
              <Socials ref2={ref2} />
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
                  disabled={!dirtyForm || fetchLoading || loading}
                >
                  {loading || fetchLoading
                    ? 'Подождите'
                    : 'Сохранить и перейти в кабинет'}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={!dirtyForm || fetchLoading || loading}
                >
                  {loading || fetchLoading
                    ? 'Подождите'
                    : 'Сохранить и перейти в кабинет'}
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

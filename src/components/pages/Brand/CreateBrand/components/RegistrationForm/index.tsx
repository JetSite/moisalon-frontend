import { useState, FC, RefObject, useEffect, useMemo } from 'react'
import { Wrapper, Title } from './styled'
import { MobileVisible, MobileHidden } from '../../../../../../styles/common'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import Button from '../../../../../ui/Button'
import About from './components/About'
import Socials from './components/Socials'
import { ICity, ICountry, IPhoto } from 'src/types'
import { CreateBrandProps } from '../..'
import { ISetState } from 'src/types/common'
import {
  IInitialValuesBrandForm,
  getInitialValuesBrandForm,
} from '../utils/getInitialValuesBrandForm'
import { getPrepareInputBrandForm } from '../utils/getPrepareInputBrandForm'
import { useBrandMutate } from '../utils/useBrandMutate'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { useForm } from 'react-final-form'

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
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [countriesArray, setCountriesArray] = useState<ICountry[]>(countries)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [selectCity, setSelectCity] = useState<string | null>(null)
  const [selectCountry, setSelectCountry] = useState<string | null>(null)
  const [coordinate, setCoordinates] = useState<ICoordinate | null>(null)
  const form = useForm()

  const initialValues = useMemo<IInitialValuesBrandForm>(
    () => getInitialValuesBrandForm(brand),
    [],
  )

  const { loading: fetchLoading, handleCreateOrUpdateBrand } = useBrandMutate({
    setErrors,
    setErrorPopupOpen,
  })

  const onSubmit = (values: IInitialValuesBrandForm) => {
    if (!selectCity || !values.address || !coordinate) {
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

    const input = getPrepareInputBrandForm({ values, logo, coordinate })

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
    <Wrapper>
      <Title>Информация о бренде</Title>
      <AutoFocusedForm<IInitialValuesBrandForm>
        onSubmit={onSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <About
                setCoordinates={setCoordinates}
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
                  disabled={!dirtyForm || fetchLoading}
                >
                  {fetchLoading ? 'Подождите' : 'Сохранить и перейти в кабинет'}
                </Button>
              </MobileHidden>
              <MobileVisible>
                <Button
                  variant="red"
                  size="fullWidth"
                  font="popUp"
                  type="submit"
                  disabled={!dirtyForm || fetchLoading}
                >
                  {fetchLoading ? 'Подождите' : 'Сохранить и перейти в кабинет'}
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

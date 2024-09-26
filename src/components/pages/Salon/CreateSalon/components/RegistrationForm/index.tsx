import { useState, useMemo, FC, RefObject, useEffect } from 'react'
import { Wrapper, Title } from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import { ISalonPage } from 'src/types/salon'
import { IHandleClickNextTabInForm } from '../..'
import { ICity, IPhoto, ISNetwork } from 'src/types'
import { getPrepareInputSalonForm } from './utils/getPrepareInputSalonForm'
import {
  IInitialValuesSalonForm,
  getInitialValuesSalonForm,
} from './utils/getInitialValuesSalonForm'
import { ISetState } from 'src/types/common'
import { RenderSalonForm } from './components/RenderSalonForm'
import { useSalonMutate } from './utils/useSalonMutate'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'

export interface ISalonFormProps {
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
  noPhotoError: boolean
  logo: IPhoto | null
  cities: ICity[]
  setDirtyForm: ISetState<boolean>
  dirtyForm: boolean
  sNetworks: ISNetwork[]
}

const RegistrationForm: FC<ISalonFormProps> = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
  handleClickNextTab,
  salon,
  noPhotoError,
  rent,
  logo,
  cities,
  sNetworks,
  setDirtyForm,
  dirtyForm,
}) => {
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [clickCity, setClickCity] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [photosArray, setPhotosArray] = useState<IPhoto[]>(salon?.photos || [])
  const [loading, setLoading] = useState(false)
  const [coordinate, setCoordinates] = useState<ICoordinate | null>(null)

  const { loading: fetchLoading, handleCreateOrUpdateSalon } = useSalonMutate({
    setErrors,
    setErrorPopupOpen,
  })

  const initialValues = useMemo<IInitialValuesSalonForm>(
    () => getInitialValuesSalonForm(salon),
    [],
  )
  useEffect(() => {
    if (noPhotoError) {
      setErrorPopupOpen(true)
      setErrors(['Ошибка загрузки логотипа'])
    }
  }, [noPhotoError])

  const onSubmit = (values: IInitialValuesSalonForm) => {
    if (!clickCity || !coordinate) {
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

    const input = getPrepareInputSalonForm({
      values,
      logo,
      photos: photosArray.map(e => e.id),
      rent,
      coordinate,
      sNetworks,
    })

    handleCreateOrUpdateSalon({
      citiesArray,
      setCitiesArray,
      clickCity,
      salon,
      rent,
      input,
    })
  }

  return (
    <Wrapper>
      <Title>Расскажите о своем салоне</Title>
      {initialValues && (
        <AutoFocusedForm<IInitialValuesSalonForm>
          initialValues={initialValues}
          // keepDirtyOnReinitialize

          onSubmit={onSubmit}
          render={form => (
            <RenderSalonForm
              formProps={form}
              allTabs={allTabs}
              ref1={ref1}
              ref2={ref2}
              ref3={ref3}
              ref4={ref4}
              ref5={ref5}
              ref6={ref6}
              setDirtyForm={setDirtyForm}
              handleClickNextTab={handleClickNextTab}
              dirtyForm={dirtyForm}
              logo={logo}
              salon={salon}
              loading={loading}
              setPhotosArray={setPhotosArray}
              setClickCity={setClickCity}
              errors={errors}
              fetchLoading={fetchLoading}
              setCoordinates={setCoordinates}
              sNetworks={sNetworks}
            />
          )}
        />
      )}
      <Error
        errors={errors}
        isOpen={isErrorPopupOpen}
        setOpen={setErrorPopupOpen}
      />
    </Wrapper>
  )
}

export default RegistrationForm

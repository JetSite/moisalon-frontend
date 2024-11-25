import { useState, useCallback, FC, RefObject, useMemo } from 'react'
import { Wrapper, Title } from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import ErrorPopup from '../../../../../blocks/Form/Error'
// import ym from "react-yandex-metrika";
import { ISetState } from 'src/types/common'
import { IMaster } from 'src/types/masters'
import { ICity, IPhoto, ISNetwork } from 'src/types'
import { IHandleClickNextTabInForm } from 'src/components/pages/Salon/CreateSalon'
import { IServiceCategories } from 'src/types/services'
import { RenderMasterForm } from './components/RenderMasterForm'
import {
  IInitialValuesMasterForm,
  getInitialValuesMasterForm,
} from './utils/getInitialValuesMasterForm'
import { getPrepareInputMasterForm } from './utils/getPrepareInputMasterForm'
import { useMasterMutate } from './utils/useMaterMutate'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { FormRenderProps } from 'react-final-form'

export interface IMasterFormProps {
  master: IMaster | null
  allTabs: RefObject<HTMLFormElement>
  ref1: RefObject<HTMLDivElement>
  ref2: RefObject<HTMLDivElement>
  ref3: RefObject<HTMLDivElement>
  ref4: RefObject<HTMLDivElement>
  handleClickNextTab: IHandleClickNextTabInForm
  photo: IPhoto | null
  setNoPhotoError: ISetState<boolean>
  serviceCategories: IServiceCategories[]
  cities: ICity[]
  dirtyForm: boolean
  setDirtyForm: ISetState<boolean>
  sNetworks: ISNetwork[]
}

const RegistrationForm: FC<IMasterFormProps> = ({
  master,
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  handleClickNextTab,
  photo,
  setNoPhotoError,
  serviceCategories,
  cities,
  dirtyForm,
  setDirtyForm,
  sNetworks,
}) => {
  const [clickCity, setClickCity] = useState<string | null>(null)
  const { user } = useAuthStore(getStoreData)
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [clickCityResume, setClickCityResume] = useState<string | null>(null)
  const [coordinate, setCoordinates] = useState<ICoordinate | null>(null)

  const initialValues = useMemo<IInitialValuesMasterForm>(
    () => getInitialValuesMasterForm(master, user),
    [user],
  )
  const { loading, handleCreateOrUpdateMaster } = useMasterMutate({
    setErrors,
    setErrorPopupOpen,
  })

  const onSubmit = useCallback(
    async (values: IInitialValuesMasterForm) => {
      if (!values.address || !coordinate) {
        setErrors(['Введите адрес места работы из выпадающего списка'])
        setErrorPopupOpen(true)
        return
      } else if (!master && !photo) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото мастера'])
        setErrorPopupOpen(true)
        return
      } else {
        if (photo) {
          const input = getPrepareInputMasterForm({
            values,
            photo,
            coordinate,
          })

          handleCreateOrUpdateMaster({
            citiesArray,
            setCitiesArray,
            clickCity,
            clickCityResume,
            master,
            input,
          })
        }
      }
    },
    [photo, clickCity, citiesArray],
  )

  return (
    <Wrapper>
      <Title>Мои данные</Title>
      <AutoFocusedForm<IInitialValuesMasterForm>
        initialValues={initialValues}
        onSubmit={onSubmit}
        keepDirtyOnReinitialize
        render={formProps => (
          <RenderMasterForm
            formProps={formProps}
            allTabs={allTabs}
            ref1={ref1}
            ref2={ref2}
            ref3={ref3}
            ref4={ref4}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
            photo={photo}
            master={master}
            loading={loading}
            handleClickNextTab={handleClickNextTab}
            setClickCity={setClickCity}
            fetchLoading={loading}
            serviceCategories={serviceCategories}
            errors={errors}
            setClickCityResume={setClickCityResume}
            setCoordinates={setCoordinates}
            sNetworks={sNetworks}
          />
        )}
      />
      <ErrorPopup errors={errors} setErrors={setErrors} />
    </Wrapper>
  )
}

export default RegistrationForm

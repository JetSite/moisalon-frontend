import { useState, useCallback, FC, RefObject, useMemo } from 'react'
import { Wrapper, Title } from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
// import ym from "react-yandex-metrika";
import { ISetState } from 'src/types/common'
import { IMaster } from 'src/types/masters'
import { ICity, IPhoto } from 'src/types'
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
import { cyrToTranslit } from 'src/utils/translit'

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
}) => {
  const [clickCity, setClickCity] = useState<string | null>(null)
  const { user } = useAuthStore(getStoreData)
  const [citiesArray, setCitiesArray] = useState<ICity[]>(cities)
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [clickCityResume, setClickCityResume] = useState<string | null>(null)

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
      console.log('values', values)

      if (!values.address) {
        setErrors(['Введите адрес места работы из выпадающего списка'])
        setErrorPopupOpen(true)
        return
      } else if (!master && !photo) {
        setNoPhotoError(true)
        setErrors(['Необходимо добавить фото мастера'])
        setErrorPopupOpen(true)
        return
      } else {
        console.log('values', values)
        if (photo) {
          const input = getPrepareInputMasterForm({
            values,
            photo,
          })
          handleCreateOrUpdateMaster({
            citiesArray,
            setCitiesArray,
            clickCity,
            clickCityResume,
            master,
            input,
          })

          console.log('values', values)
        }
      }
    },
    [photo, clickCity, citiesArray],
  )

  console.log('initialValues', initialValues)

  console.log('dirtyForm', dirtyForm)

  return (
    <Wrapper>
      <Title>Мои данные</Title>
      <AutoFocusedForm
        initialValues={initialValues}
        onSubmit={e => onSubmit(e as IInitialValuesMasterForm)}
        keepDirtyOnReinitialize
        initialValuesEqual={(initial, values) => {
          return JSON.stringify(initial) === JSON.stringify(values)
        }}
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
          />
        )}
      />
      <Error
        errors={errors}
        isOpen={isErrorPopupOpen}
        setOpen={setErrorPopupOpen}
      />
    </Wrapper>
  )
}

export default RegistrationForm

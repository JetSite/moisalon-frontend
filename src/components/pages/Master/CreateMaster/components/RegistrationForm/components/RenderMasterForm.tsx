import { FC, useEffect } from 'react'
import { FormRenderProps } from 'react-final-form'
import { MobileVisible, MobileHidden } from '../../../../../../../styles/common'
import Button from '../../../../../../ui/Button'
import About from './About'
import Socials from './Socials'
import MasterSpecializationsList from './MasterSpecializationsList'
import Work from './Work'
import { ISetState } from 'src/types/common'
import { IPhoto } from 'src/types'
import { IMasterFormProps } from '..'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { IInitialValuesMasterForm } from '../utils/getInitialValuesMasterForm'

interface Props
  extends Omit<
    IMasterFormProps,
    'setPhotosArray' | 'setNoPhotoError' | 'cities'
  > {
  formProps: FormRenderProps<IInitialValuesMasterForm>
  loading: boolean
  setClickCity: ISetState<string | null>
  errors: string[] | null
  fetchLoading: boolean
  setClickCityResume: ISetState<string | null>
  setCoordinates: ISetState<ICoordinate | null>
}

export const RenderMasterForm: FC<Props> = ({
  formProps,
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  setDirtyForm,
  dirtyForm,
  photo,
  master,
  loading,
  handleClickNextTab,
  setClickCity,
  fetchLoading,
  serviceCategories,
  setClickCityResume,
  setCoordinates,
}) => {
  const { handleSubmit, form } = formProps

  useEffect(() => {
    const unsubscribe = form.subscribe(
      ({ dirty }) => {
        const isNewLogo = !!photo && photo.id !== master?.photo?.id
        isNewLogo ? setDirtyForm(true) : setDirtyForm(dirty)
      },
      { dirty: true },
    )
    return unsubscribe
  }, [form, photo, master])

  return (
    <form onSubmit={handleSubmit} ref={allTabs}>
      <About
        ref1={ref1}
        handleClickNextTab={handleClickNextTab}
        number={1}
        setClickCity={setClickCity}
        setCoordinates={setCoordinates}
      />
      <MasterSpecializationsList
        handleClickNextTab={handleClickNextTab}
        ref2={ref2}
        serviceCategories={serviceCategories}
        number={2}
      />
      <Work
        search={master?.searchWork}
        setClickCity={setClickCityResume}
        ref3={ref3}
        handleClickNextTab={handleClickNextTab}
        number={3}
      />
      <Socials ref4={ref4} />
      <MobileHidden>
        <Button
          variant="red"
          size="noWidth"
          type="submit"
          disabled={!dirtyForm || fetchLoading || loading}
        >
          {loading ? 'Подождите' : 'Сохранить и перейти в кабинет'}
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
          {loading ? 'Подождите' : 'Сохранить и перейти в кабинет'}{' '}
        </Button>
      </MobileVisible>
    </form>
  )
}

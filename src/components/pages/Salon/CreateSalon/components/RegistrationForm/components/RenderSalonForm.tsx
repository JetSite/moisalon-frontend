import { FC, useEffect } from 'react'
import { FormRenderProps } from 'react-final-form'
import { ISalonFormProps } from '..'
import { MobileVisible, MobileHidden } from '../../../../../../../styles/common'
import Button from '../../../../../../ui/Button'
import About from './About'
import Socials from './Socials'
import SalonActivities from './SalonActivities'
import SalonServices from './SalonServices'
import Schedule from './Schedule'
import Administrator from './Administrator'
import { IServiceInForm } from 'src/types/services'
import { getServicesForCatalog } from 'src/utils/newUtils/getServicesForCatalog'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'
import { ISetState } from 'src/types/common'
import { IPhoto } from 'src/types'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { IInitialValuesSalonForm } from '../utils/getInitialValuesSalonForm'

interface Props
  extends Omit<ISalonFormProps, 'cities' | 'noPhotoError' | 'rent'> {
  formProps: FormRenderProps<IInitialValuesSalonForm>
  loading: boolean
  setPhotosArray: ISetState<IPhoto[]>
  setClickCity: ISetState<string | null>
  errors: string[] | null
  fetchLoading: boolean
  setCoordinates: ISetState<ICoordinate | null>
}

export const RenderSalonForm: FC<Props> = ({
  formProps,
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  ref6,
  setDirtyForm,
  dirtyForm,
  logo,
  salon,
  loading,
  setPhotosArray,
  handleClickNextTab,
  setClickCity,
  fetchLoading,
  setCoordinates,
}) => {
  const { handleSubmit, form } = formProps
  const { services, activities, servicesM } = useBaseStore(getStoreData)
  const salonServicesCatalog: IServiceInForm[] = getServicesForCatalog(services)
  const salonServicesMCatalog: IServiceInForm[] =
    getServicesForCatalog(servicesM)
  const salonActivitiesCatalog = activities
    ? activities.map(({ title, id }) => ({
        id,
        name: id,
        title: title,
      }))
    : []

  useEffect(() => {
    const unsubscribe = form.subscribe(
      ({ dirty }) => {
        const isNewLogo = !!logo && logo.id !== salon?.logo?.id
        isNewLogo ? setDirtyForm(true) : setDirtyForm(dirty)
      },
      { dirty: true },
    )
    return unsubscribe
  }, [form, logo])

  return (
    <form onSubmit={handleSubmit} ref={allTabs}>
      <About
        photos={salon?.photos || []}
        ref1={ref1}
        setClickCity={setClickCity}
        number={1}
        handleClickNextTab={handleClickNextTab}
        setPhotosArray={setPhotosArray}
        setCoordinates={setCoordinates}
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
        servicesM={salonServicesMCatalog}
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
      <MobileHidden>
        <Button
          variant="red"
          size="noWidth"
          type="submit"
          disabled={!dirtyForm || fetchLoading || loading}
        >
          {fetchLoading || loading ? 'Подождите' : 'Сохранить и продолжить'}
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
          {fetchLoading || loading ? 'Подождите' : 'Сохранить и продолжить'}
        </Button>
      </MobileVisible>
    </form>
  )
}

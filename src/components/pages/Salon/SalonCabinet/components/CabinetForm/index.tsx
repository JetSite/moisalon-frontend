import { useState } from 'react'
import {
  Wrapper,
  TitleCabinet,
  TextCabinet,
  TitleServicesMobile,
} from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import ServicesList from '../../../../../blocks/Form/ServicesList'
import SalonCabinetReviews from '../SalonCabinetReviews'
import catalogOrDefault from '../../../../../../utils/catalogOrDefault'
import useBaseStore from 'src/store/baseStore'
import { getStoreData } from 'src/store/utils'

const CabinetForm = ({ allTabs, ref1, ref2, ref3, salonData, salonId }) => {
  const { catalogs } = useBaseStore(getStoreData)
  const [errors, setErrors] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)

  const salonActivitiesCatalog = catalogOrDefault(
    catalogs?.salonActivitiesCatalog,
  )
  const { groups: specializations = [] } = salonActivitiesCatalog
  const salonSpecializations = specializations.filter(t =>
    salonData?.activities.find(id => id === t.id),
  )

  const onSubmit = () => {
    console.log('changes submitted')
  }
  // const initialValues = {
  //   specializationsServices: useServiceCatalogValues(
  //     salonActivitiesCatalog,
  //     salonSpecializations
  //   ),
  // };

  return (
    <Wrapper>
      <TitleCabinet>{salonData?.name}</TitleCabinet>
      <TextCabinet>Кабинет салона</TextCabinet>
      <AutoFocusedForm
        // initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <TitleServicesMobile>Услуги</TitleServicesMobile>
              <ServicesList
                ref1={ref1}
                specializations={salonSpecializations}
                serviceCatalog={salonActivitiesCatalog}
              />
              <SalonCabinetReviews salonId={salonId} ref2={ref2} />
              {/* <SalonCabinetProfiles ref3={ref3} me={me} /> */}
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              {/* <Button
                variant="red"
                size="noWidth"
                type="submit"
                disabled={pristine}
              >
                Сохранить и продолжить
              </Button> */}
            </form>
          )
        }}
      />
    </Wrapper>
  )
}

export default CabinetForm

import { FC, RefObject, useState } from 'react'
import {
  Wrapper,
  TitleCabinet,
  TextCabinet,
  TitleServicesMobile,
} from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import ErrorPopup from '../../../../../blocks/Form/Error'
import ServicesList from '../../../../../blocks/Form/ServicesList'
import SalonCabinetReviews from '../SalonCabinetReviews'
import { ISalonPage } from 'src/types/salon'
import { IID } from 'src/types/common'

interface Props {
  allTabs: RefObject<HTMLFormElement>
  ref1: RefObject<HTMLDivElement>
  ref2: RefObject<HTMLDivElement>
  ref3: RefObject<HTMLDivElement>
  salonData: ISalonPage
  salonId: IID
}

const CabinetForm: FC<Props> = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  salonData,
  salonId,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)

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
                specializations={[]}
                serviceCatalog={{ groups: [] }}
              />
              <SalonCabinetReviews salonId={salonId} ref2={ref2} />
              {/* <SalonCabinetProfiles ref3={ref3} me={me} /> */}
              <ErrorPopup errors={errors} setErrors={setErrors} />

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

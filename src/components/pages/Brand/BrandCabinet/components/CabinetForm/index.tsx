import { FC, RefObject, useState } from 'react'
import { Wrapper, TitleCabinet, TextCabinet } from './styled'
import AutoFocusedForm from '../../../../../blocks/Form/AutoFocusedForm'
import Error from '../../../../../blocks/Form/Error'
import Files from '../Files'
import { IBrandCabinetProps } from '../..'
import { IHandleClickNextTabInForm } from 'src/components/pages/Salon/CreateSalon'
import { ISetState } from 'src/types/common'
import BrandCabinetProducts, {
  BrandCabinetProductsProps,
} from '../BrandCabinetProducts'
import BrandCabinetReviews from '../BrandCabinetReviews'
import BrandCabinetPerson from '../BrandCabinetPerson'
import BrandCabinetProfiles from '../BrandCabinetProfiles'
import Button from 'src/components/ui/Button'
import { IPhoto } from 'src/types'

interface Props extends IBrandCabinetProps, BrandCabinetProductsProps {
  allTabs: RefObject<HTMLFormElement>
  ref2: RefObject<HTMLDivElement>
  ref3: RefObject<HTMLDivElement>
  ref4: RefObject<HTMLDivElement>
  setDirtyForm?: ISetState<boolean>
  dirtyForm?: boolean
}

const CabinetForm: FC<Props> = ({
  allTabs,
  ref1,
  ref2,
  ref3,
  ref4,
  brand,
  handleClickNextTab,
}) => {
  const [errors, setErrors] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [photosArray, setPhotosArray] = useState<IPhoto[]>(brand.photos || [])
  const [clickCity, setClickCity] = useState<string | null>(null)

  const onSubmit = () => {}

  return (
    <Wrapper>
      <TitleCabinet>{brand.name}</TitleCabinet>
      <TextCabinet>Кабинет бренда</TextCabinet>
      <Files id={brand.id} />
      {/* <AutoFocusedForm
        // initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine }) => {
          return (
            <form onSubmit={handleSubmit} ref={allTabs}>
              <BrandCabinetProducts
                setPhotosArray={setPhotosArray}
                ref1={ref1}
                handleClickNextTab={handleClickNextTab}
              />
              <BrandCabinetReviews brandId={brand.id} ref2={ref2} />
              <BrandCabinetPerson setClickCity={setClickCity} ref3={ref3} />
              <BrandCabinetProfiles ref4={ref4} />
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <Button
                variant="red"
                size="noWidth"
                type="submit"
                disabled={pristine}
              >
                {true ? 'Подождите' : 'Сохранить и продолжить'}
              </Button>
            </form>
          )
        }}
      /> */}
    </Wrapper>
  )
}

export default CabinetForm

import { FC, useState } from 'react'
import { MobileHidden, MobileVisible } from '../../../../../../../styles/common'
import Error from '../../../../../../blocks/Form/Error'
import ActivitiesList from '../ActivitiesList'
import RentalInfo from '../PhotoGallery/PhotoArrayField/RentalInfo'
import {
  Desc,
  Subdesc,
  Title,
  CustomButton,
  DescPhoto,
  SupportText,
  SupportLink,
  ButtonsBlockText,
  SupportTextBottom,
  FieldWrap,
} from '../styles'
import RentalAdditionalInfo from '../RentalAdditionalInfo'
import { useEffect } from 'react'
import Success from '../Success'
import DefaultPhoto from '../DefaultPhoto'
import PhotoGallery from '../PhotoGallery'
import SupportPopup from '../SupportPopup'
import { ISalonPage } from 'src/types/salon'
import { IApolloRefetch, IID, ISetState } from 'src/types/common'
import { FormApi } from 'final-form'
import { IChangeWorkplaceFormStates, IChangeWorkplaceFormValues } from '../type'
import { IRentalPeriod } from 'src/types'
import { IEquipment } from 'src/types/equipment'
import { getServicesForCatalog } from 'src/utils/newUtils/getServicesForCatalog'
import { getGroupedServices } from 'src/utils/getGrupedServices'
import { cyrToTranslit } from 'src/utils/translit'
import { TextField } from '../../../../../../blocks/Form'
import { Field } from 'react-final-form'

function convertNumber(text) {
  if (text === undefined) {
    return undefined
  }

  if (text === '') {
    return undefined
  }

  const int = parseInt(text, 10)

  if (Number.isNaN(int)) {
    return undefined
  }

  return int
}

const findServices = (type, catalog, roomServices) => {
  const resultArray = []
  catalog
    .filter(subgroup => subgroup.id === type)[0]
    .items.map(item => {
      roomServices?.map(service => {
        if (service.id === item.id) {
          resultArray.push(item.id)
        }
      })
    })
  return resultArray
}

interface Props {
  salon: ISalonPage
  states: IChangeWorkplaceFormStates
  refetchSalon: IApolloRefetch
  form: FormApi<IChangeWorkplaceFormValues>
  retnalPeriods: IRentalPeriod[]
  equipments: IEquipment[]
}

const ChangeWorkplaceForm: FC<Props> = ({
  salon,
  form,
  refetchSalon,
  states,
  retnalPeriods,
  equipments,
}) => {
  const {
    workplace,
    setWorkplace,
    workplaceId,
    setWorkplaceId,
    setCreateWorkplace,
    errors,
    setErrors,
    isErrorPopupOpen,
    setErrorPopupOpen,
    success,
    setSuccess,
    periods,
    setPeriods,
    cover,
    setCover,
  } = states
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [showSupportPopup, setShowSupportPopup] = useState(false)

  const catalogs = {
    salonRoomServicesCatalog: {
      groups: [{ subGroups: [{ id: 'equipment_lighting' }] }],
    },
  }

  const resetRentalRate = () => {
    setPeriods([{ id: 'CustomRate' }])
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [success, showAdditionalInfo])

  const showAdditionalHandler = (form: FormApi<IChangeWorkplaceFormValues>) => {
    if (!form.getFieldState('photos')?.value) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }
    setShowAdditionalInfo(true)
  }

  return success ? (
    <Success
      salon={salon}
      workplace={workplace}
      setShowAdditionalInfo={setShowAdditionalInfo}
      setSuccess={setSuccess}
      setWorkplace={setWorkplace}
      setWorkplaceId={setWorkplaceId}
      resetRentalRate={resetRentalRate}
      workplaceId={workplaceId}
    />
  ) : showAdditionalInfo ? (
    <RentalAdditionalInfo
      services={equipments}
      equipments={equipments}
      setShowAdditionalInfo={setShowAdditionalInfo}
    >
      <MobileHidden>
        <CustomButton
          variant="red"
          size="noWidth"
          font="small"
          type="submit"
          // disabled={pristine || loading}
        >
          Сохранить и разместить на платформе
        </CustomButton>
      </MobileHidden>
      <MobileVisible>
        <CustomButton
          variant="red"
          size="fullWidth"
          font="popUp"
          type="submit"
          style={{ marginBottom: 20 }}
          // disabled={pristine || loading}
        >
          Сохранить и разместить на платформе
        </CustomButton>
      </MobileVisible>
    </RentalAdditionalInfo>
  ) : (
    <>
      <SupportPopup
        showSupportPopup={showSupportPopup}
        setShowSupportPopup={setShowSupportPopup}
      />
      <Title>Фото и назначение сдаваемого рабочего места</Title>
      <DescPhoto>Загрузите главное фото*</DescPhoto>
      <DefaultPhoto defaultPhoto={cover} setDefaultPhoto={setCover} />
      <Desc>Загрузите фотографии в фотогалерею*</Desc>
      <PhotoGallery photos={workplace?.gallery || []} />
      <FieldWrap>
        <Desc>Назовите рабочее место</Desc>
        <Field
          name="title"
          component={TextField}
          multiline={true}
          maxLength={1200}
          label="Название"
        />
      </FieldWrap>
      <Desc>Выберите назначение рабочего места/кабинета*</Desc>
      {/* <Subdesc>
                  Выберите один или несколько видов деятельности, которые
                  осуществляют на этом рабочем месте
                </Subdesc> */}
      <ActivitiesList
        catalog={salon.services.map(e => e.service)}
        mbDesc={30}
      />
      <SupportText>
        Если не нашли свое направление работы, обратитесь в{' '}
        <SupportLink onClick={() => setShowSupportPopup(true)}>
          службу поддержки
        </SupportLink>
        , и мы поможем разобраться
      </SupportText>
      <Desc>Стоимость и период аренды*</Desc>
      <Subdesc>
        Выберите оптимальные для вас периоды аренды рабочего места и укажите
        цену. Заполните только нужные вам поля, а остальные оставьте пустыми
      </Subdesc>
      <RentalInfo
        periods={periods}
        setPeriods={setPeriods}
        retnalPeriods={retnalPeriods}
      />
      <Error
        errors={errors}
        isOpen={isErrorPopupOpen}
        setOpen={setErrorPopupOpen}
      />
      <MobileHidden>
        <CustomButton
          variant="red"
          size="noWidth"
          font="small"
          type="submit"
          // disabled={pristine || loading}
        >
          Разместить на платформе
        </CustomButton>
        <ButtonsBlockText>или</ButtonsBlockText>
        <CustomButton
          variant="darkTransparent"
          size="noWidth"
          font="small"
          onClick={() => showAdditionalHandler(form)}
        >
          Дополнить информацию о кресле/кабинете
        </CustomButton>
      </MobileHidden>
      <MobileVisible>
        <CustomButton
          variant="red"
          size="fullWidth"
          font="popUp"
          type="submit"
          style={{ marginBottom: 20 }}
          // disabled={pristine || loading}
        >
          Разместить на платформе
        </CustomButton>
        <ButtonsBlockText>или</ButtonsBlockText>
        <CustomButton
          variant="darkTransparent"
          size="noWidth"
          onClick={() => showAdditionalHandler(form)}
        >
          Дополнить информацию о кресле/кабинете
        </CustomButton>
      </MobileVisible>
      <SupportTextBottom>
        Возникли сложности с заполнением?
        <br />
        <SupportLink onClick={() => setShowSupportPopup(true)}>
          Обратитесь к нашим специалистам за помощью
        </SupportLink>
      </SupportTextBottom>
    </>
  )
}
export default ChangeWorkplaceForm

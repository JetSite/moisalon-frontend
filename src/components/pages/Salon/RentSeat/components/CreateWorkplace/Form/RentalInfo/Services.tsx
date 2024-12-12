import { FC } from 'react'
import DictionaryField from '../../../../../../../blocks/Form/DictionaryField'
import { IService } from 'src/types/services'
import { Desc, Subdesc, SupportLink, SupportText } from '../../styles'
import { ISetState } from 'src/types/common'

export interface IServicesProps {
  services: IService[]
  onlyOneChoose?: boolean
  setShowSupportPopup: ISetState<boolean>
}

const Services: FC<IServicesProps> = ({
  services,
  onlyOneChoose,
  setShowSupportPopup,
}) => {
  return (
    <>
      <Desc>Выберите услуги оказываемые на рабочем месте/кабинете*</Desc>
      <Subdesc>
        Выберите один или несколько видов услуг, оказываемых на этом рабочем
        месте
      </Subdesc>
      <DictionaryField
        name="services"
        onlyOneChoose={onlyOneChoose}
        groups={services}
        withButton={true}
      />
      <SupportText>
        Если не нашли свое направление работы, обратитесь в{' '}
        <SupportLink onClick={() => setShowSupportPopup(true)}>
          службу поддержки
        </SupportLink>
        , и мы поможем разобраться
      </SupportText>
    </>
  )
}

export default Services

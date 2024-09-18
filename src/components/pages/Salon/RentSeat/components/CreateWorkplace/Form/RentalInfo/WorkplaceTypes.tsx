import { FC } from 'react'
import DictionaryField from '../../../../../../../blocks/Form/DictionaryField'
import { IService } from 'src/types/services'
import { Desc, Subdesc, SupportLink, SupportText } from '../../styles'
import { ISetState } from 'src/types/common'
import { IServicesProps } from './Services'
import { IWorkplacesType } from 'src/types'
interface Props extends Omit<IServicesProps, 'services'> {
  workplaceTypes: IWorkplacesType[]
}

export const WorkplaceTypes: FC<Props> = ({
  workplaceTypes,
  onlyOneChoose = false,
  setShowSupportPopup,
}) => {
  return (
    <>
      <Desc>Выберите назначение рабочего места/кабинета*</Desc>
      <Subdesc>
        Выберите один вид деятельности, который осуществляют на этом рабочем
        месте
      </Subdesc>
      <DictionaryField
        name="workplaceTypes"
        onlyOneChoose={onlyOneChoose}
        groups={workplaceTypes}
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

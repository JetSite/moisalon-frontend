import { FC } from 'react'
import DictionaryField from '../../../../../../blocks/Form/DictionaryField'
import { IService } from 'src/types/services'

interface Props {
  catalog: IService[]
  mbDesc: number
  onlyOneChoose?: boolean
}

const ActivitiesList: FC<Props> = ({ catalog, mbDesc, onlyOneChoose }) => {
  return (
    <DictionaryField
      name="activities"
      groups={catalog}
      withButton={true}
      mbDesc={mbDesc}
      onlyOneChoose={onlyOneChoose}
    />
  )
}

export default ActivitiesList

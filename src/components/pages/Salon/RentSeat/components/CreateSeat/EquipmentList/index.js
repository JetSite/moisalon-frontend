import DictionaryField from '../../../../../../blocks/Form/DictionaryField/index.tsx'

const EquipmentList = ({ catalog, mbDesc }) => {
  return (
    <DictionaryField
      name="equipment"
      groups={catalog}
      withButton={true}
      mbDesc={mbDesc}
    />
  )
}

export default EquipmentList
